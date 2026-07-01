from fastapi import FastAPI
from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from openai import AzureOpenAI
from dotenv import load_dotenv

import os
import json
import hashlib
from collections import OrderedDict

load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION")
)

DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")

# ================================================================
#  Caché LRU en memoria para expedientes generados por GPT
#  Evita llamadas repetidas a Azure OpenAI para una misma profesión
# ================================================================
MAX_CACHE = 50
cache = OrderedDict()

def normalize_profession(name: str) -> str:
    """Normaliza el nombre: minúsculas, sin espacios extra, sin tildes."""
    nombre = name.strip().lower()
    replacements = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'ü': 'u', 'ñ': 'n'
    }
    for acento, sin_acento in replacements.items():
        nombre = nombre.replace(acento, sin_acento)
    return nombre

def get_cached_profession(name: str):
    """Retorna el expediente cacheado o None si no existe.
       Si existe, lo mueve al final (más recientemente usado)."""
    key = normalize_profession(name)
    if key in cache:
        cache.move_to_end(key)
        return cache[key]
    return None

def put_cached_profession(name: str, expediente: dict):
    """Guarda el expediente en caché.
       Si se supera MAX_CACHE, elimina el menos recientemente usado."""
    key = normalize_profession(name)
    cache[key] = expediente
    cache.move_to_end(key)
    if len(cache) > MAX_CACHE:
        cache.popitem(last=False)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProfessionRequest(BaseModel):
    profesion: str


@app.post("/expediente")
def generar_expediente(data: ProfessionRequest):

    # ── Verificar caché primero ──
    cached = get_cached_profession(data.profesion)
    if cached is not None:
        return cached

    # Semilla determinista basada en el nombre de la profesión
    seed = int(
        hashlib.md5(
            data.profesion.strip().lower().encode("utf-8")
        ).hexdigest()[:8],
        16
    )

    prompt = f"""
Eres el archivista principal del Museo de Profesiones Extintas del año 2080.

La profesión es:

{data.profesion}

Responde ÚNICAMENTE un JSON válido con el siguiente formato:

{{
  "title":"",
  "start_year":1850,
  "end_year":2055,
  "description":"",
  "category":"",
  "emoji":"",
  "percentage":65,
  "tasks":[]
}}

REGLAS

1. title
- En MAYÚSCULAS.

2. start_year
- Año aproximado del surgimiento de la profesión moderna.
- Usa un año históricamente razonable.

3. end_year
- Entre 2040 y 2075.

4. description

Debe tener entre 60 y 90 palabras.

Debe seguir este estilo:

• Primera oración:
Describe cuál era la función principal de la profesión.

• Segunda y tercera oración:
Explica mediante qué tecnologías específicas fue reemplazada.

No escribas simplemente "IA".

Usa ejemplos como:

- robots colaborativos
- agentes autónomos
- visión artificial
- modelos fundacionales especializados
- plataformas inteligentes
- gemelos digitales
- drones autónomos
- bioingeniería
- inteligencia artificial clínica
- sistemas predictivos
- asistentes cognitivos
- impresión 4D
- interfaces cerebro-computadora

Debe sonar como un expediente histórico del año 2080.

No escribas frases como:

"Fue importante..."
"Desde la antigüedad..."
"A lo largo de los siglos..."
"Esta profesión fue crucial..."

5. category

Debe ser una de:

general
salud
tech
ingenieria
legal
educacion
finanzas
marketing
medios
diseno
artes
escritura
gastronomia
transporte
estetica
agro
seguridad
gobierno
ciencias
oficios
patrimonio

6. emoji

Un emoji representativo.

7. percentage

Número entre 40 y 95.

8. tasks

Entre 5 y 7 tareas reales.

Cada tarea debe contener:

"name"
"status"

Los valores válidos para "status" son:

- "auto"
- "partial"
- "human"

Debe existir al menos:

- una tarea auto
- una partial
- una human

No escribas nada fuera del JSON.
"""

    response = client.chat.completions.create(
        model=DEPLOYMENT,
        messages=[
            {
                "role": "system",
                "content": "Siempre respondes únicamente con JSON válido."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        seed=seed
    )

    contenido = response.choices[0].message.content.strip()

    try:
        expediente = json.loads(contenido)
        put_cached_profession(data.profesion, expediente)
        return expediente

    except Exception:
        fallback = {
            "title": data.profesion.upper(),
            "start_year": 1900,
            "end_year": 2050,
            "description": contenido,
            "category": "general",
            "emoji": "🔮",
            "percentage": 50,
            "tasks": [
                {
                    "name": "Procesamiento estándar",
                    "status": "auto"
                },
                {
                    "name": "Toma de decisiones complejas",
                    "status": "human"
                }
            ]
        }
        put_cached_profession(data.profesion, fallback)
        return fallback


@app.head("/health")
def health_check():
    return Response(status_code=200)