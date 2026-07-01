/* ================================================================
   DATA HARDCODEADA — Profesiones, expedientes, galerías, tareas
   ================================================================ */

const dbMuseo = {
    civil: {
        title: "INGENIERO CIVIL",
        years: "1750 - 2045",
        desc: "Profesión dedicada al diseño, cálculo estructural, planeamiento y supervisión de infraestructuras críticas. Con el advenimiento de software de diseño generativo automatizado y redes de simulación sismica inteligente, la intervención humana en metrados y cálculos de resistencia fue reemplazada en un 100% por algoritmos analíticos.",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
    },
    arq: {
        title: "ARQUITECTO",
        years: "1800 - 2050",
        desc: "Profesionales dedicados a la planificación de formas habitables y espacios estéticos. Los motores de diseño predictivo 3D del año 2045 comenzaron a generar infinitas configuraciones funcionales adaptadas a regulaciones ecológicas en milisendo, reduciendo el rol del arquitecto técnico a un filtro estético casi obsoleto.",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
    },
    cont: {
        title: "CONTADOR",
        years: "1494 - 2040",
        desc: "Responsable del registro, interpretación y auditoría contable de corporaciones y estados. La automatización de transacciones fiscales en un libro descentralizado unificado y los contratos inteligentes estatales basados en algoritmos Blockchain erradicaron por completo el factor de error humano y las planillas tradicionales.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    dis: {
        title: "DISEÑADOR GRÁFICO",
        years: "1900 - 2048",
        desc: "Creador de identidades de marca y comunicaciones estéticas. Los modelos neuronales de difusión hiperrealista y síntesis interactiva de interfaces del siglo XXI lograron traducir intenciones complejas en campaigns listas para lanzar en segundos, erradicando el trabajo operativo de ilustración.",
        imageUrl: "https://images.unsplash.com/photo-1581291518655-9523c932ebcf?auto=format&fit=crop&w=600&q=80"
    },
    prof: {
        title: "PROFESOR",
        years: "1600 - 2055",
        desc: "Dedicado a la enseñanza y guía del desarrollo cognitivo humano. Fueron reemplazados sistemáticamente por tutores adaptativos sintéticos interactivos que optimizan el ritmo, estímulos visuales and rutas de aprendizaje según el perfil neuronal preciso del estudiante.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
    },
    med: {
        title: "MÉDICO GENERAL",
        years: "1500 - 2058",
        desc: "Profesión médica de primer contacto dedicada al diagnóstico general. Las cápsulas de biosensado y los sistemas avanzados de cribado preventivo erradicaron la necesidad de evaluación clínica presencial y diagnósticos manuales, logrando un 99.8% de efectividad diagnóstica sintética.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
    }
};

const dbTareas = {
    civil: {
        percentage: "78%",
        nombre: "INGENIERO CIVIL",
        tasks: [
            { name: "Elaboración de metrados", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Generación de reportes", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Modelado BIM", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Optimización de diseños", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Control documental", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Supervisión de obra", status: "partial", text: "⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name: "Liderazgo de equipos", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" }
        ]
    },
    arq: {
        percentage: "71%",
        nombre: "ARQUITECTO",
        tasks: [
            { name: "Generación de plantas técnicas", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Cálculo bioclimático de asoleamiento", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Renderizado e infografías 3D", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Verificación de normativa y códigos", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Presupuestación e informes", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Conceptualización de diseño", status: "partial", text: "⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name: "Negociación con inversores", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" }
        ]
    },
    cont: {
        percentage: "92%",
        nombre: "CONTADOR PÚBLICO",
        tasks: [
            { name: "Ingreso y registro de transacciones", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Auditoría de balances generales", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Conciliaciones bancarias globales", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Liquidación y cálculo de impuestos", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Elaboración de estados financieros", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Análisis predictivo de flujo de caja", status: "partial", text: "⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name: "Planificación estratégica tributaria", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" }
        ]
    },
    dis: {
        percentage: "85%",
        nombre: "DISEÑADOR GRÁFICO",
        tasks: [
            { name: "Vectorización de elementos", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Adaptaciones de formatos y layouts", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Paletas cromáticas por contraste inteligente", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Tipografías fluidas reactivas", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Redacción de copys del sistema", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Dirección de arte experimental", status: "partial", text: "⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name: "Empatía semántica de marca", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" }
        ]
    },
    prof: {
        percentage: "66%",
        nombre: "PROFESOR / DOCENTE",
        tasks: [
            { name: "Diseño curricular temático", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Calificación de exámenes", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Creación de materiales de apoyo", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Evaluación de informes", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Tutoría adaptativa personalizada", status: "partial", text: "⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name: "Contención de crisis en el aula", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" }
        ]
    },
    med: {
        percentage: "58%",
        nombre: "MÉDICO GENERAL",
        tasks: [
            { name: "Triaje preliminar de síntomas", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Emisión de recetas y dosificación", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Análisis y lectura de laboratorio", status: "auto", text: "✓ AUTOMATIZABLE" },
            { name: "Diagnóstico diferencial primario", status: "partial", text: "⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name: "Intervención de emergencia física", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" },
            { name: "Acompañamiento y apoyo emocional", status: "human", text: "✗ REQUIERE INTERVENCION HUMANA" }
        ]
    }
};

const GALLERY_IMGS = {
    civil: {
        past:[
            {url:"imagenes/civil_pasado_1.jpg", cap:"Construcción de grandes obras, era industrial"},
            {url:"imagenes/civil_pasado_2.jpg", cap:"Ingenieros con planos físicos, s.XX"},
            {url:"imagenes/civil_pasado_3.jpg", cap:"Obreros en estructura metálica, 1930s"}
        ],
        now:[
            {url:"imagenes/civil_hoy_1.jpg", cap:"Ingenieros con tecnología moderna en obra"},
            {url:"imagenes/civil_hoy_2.jpg", cap:"Modelado BIM y software 3D"},
            {url:"imagenes/civil_hoy_3.jpg", cap:"Infraestructura urbana contemporánea"}
        ],
        future:[
            {url:"imagenes/civil_futuro_1.jpg", cap:"IA diseñando estructuras autónomamente, 2045"},
            {url:"imagenes/civil_futuro_2.jpg", cap:"Robots de construcción autónomos"},
            {url:"imagenes/civil_futuro_3.jpg", cap:"Ciudad inteligente sin supervisión humana"}
        ]
    },
    arq: {
        past:[
            {url:"imagenes/arq_pasado_1.jpg", cap:"Arquitecto dibujando a mano, s.XIX"},
            {url:"imagenes/arq_pasado_2.jpg", cap:"Mesa de dibujo técnico, época clásica"},
            {url:"imagenes/arq_pasado_3.jpg", cap:"Gran obra arquitectónica histórica"}
        ],
        now:[
            {url:"imagenes/arq_hoy_1.jpg", cap:"Estudio de arquitectura digital moderno"},
            {url:"imagenes/arq_hoy_2.jpg", cap:"Render 3D de proyecto arquitectónico"},
            {url:"imagenes/arq_hoy_3.jpg", cap:"Arquitecto supervisando obra con tablet"}
        ],
        future:[
            {url:"imagenes/arq_futuro_1.jpg", cap:"IA generando diseños arquitectónicos, 2050"},
            {url:"imagenes/arq_futuro_2.jpg", cap:"Edificio generado por algoritmo"},
            {url:"imagenes/arq_futuro_3.jpg", cap:"Arquitectura sin diseñador humano, 2080"}
        ]
    },
    cont: {
        past:[
            {url:"imagenes/cont_pasado_1.jpg", cap:"Libros contables manuscritos, s.XVIII"},
            {url:"imagenes/cont_pasado_2.jpg", cap:"Contador con registros físicos, 1900s"},
            {url:"imagenes/cont_pasado_3.jpg", cap:"Calculadora mecánica de escritorio, 1940s"}
        ],
        now:[
            {url:"imagenes/cont_hoy_1.jpg", cap:"Software de contabilidad moderna"},
            {url:"imagenes/cont_hoy_2.jpg", cap:"Análisis financiero con dashboards"},
            {url:"imagenes/cont_hoy_3.jpg", cap:"Auditoría digital en tiempo real"}
        ],
        future:[
            {url:"imagenes/cont_futuro_1.jpg", cap:"Blockchain sustituyendo contabilidad, 2040"},
            {url:"imagenes/cont_futuro_2.jpg", cap:"Contratos inteligentes automatizados"},
            {url:"imagenes/cont_futuro_3.jpg", cap:"Finanzas sin contador humano, 2080"}
        ]
    },
    dis: {
        past:[
            {url:"imagenes/dis_pasado_1.jpg", cap:"Imprenta tipográfica de Gutenberg, 1450"},
            {url:"imagenes/dis_pasado_2.jpg", cap:"Diseñador con mesa de luz, 1960s"},
            {url:"imagenes/dis_pasado_3.jpg", cap:"Composición tipográfica manual"}
        ],
        now:[
            {url:"imagenes/dis_hoy_1.jpg", cap:"Diseño digital en pantalla moderna"},
            {url:"imagenes/dis_hoy_2.jpg", cap:"Diseñador UX con prototipo interactivo"},
            {url:"imagenes/dis_hoy_3.jpg", cap:"Estudio creativo digital contemporáneo"}
        ],
        future:[
            {url:"imagenes/dis_futuro_1.jpg", cap:"IA generando identidades visuales, 2048"},
            {url:"imagenes/dis_futuro_2.jpg", cap:"Modelo de difusión creando imágenes"},
            {url:"imagenes/dis_futuro_3.jpg", cap:"Diseño sin intervención humana, 2080"}
        ]
    },
    prof: {
        past:[
            {url:"imagenes/prof_pasado_1.jpg", cap:"Aula escolar con pizarrón, 1930s"},
            {url:"imagenes/prof_pasado_2.jpg", cap:"Escuela rural tradicional, s.XX"},
            {url:"imagenes/prof_pasado_3.jpg", cap:"Maestro dictando clase magistral"}
        ],
        now:[
            {url:"imagenes/prof_hoy_1.jpg", cap:"Clase virtual con tecnología moderna"},
            {url:"imagenes/prof_hoy_2.jpg", cap:"Laboratorio educativo digital"},
            {url:"imagenes/prof_hoy_3.jpg", cap:"Docente con plataforma de aprendizaje"}
        ],
        future:[
            {url:"imagenes/prof_futuro_1.jpg", cap:"Tutor adaptativo sintético, 2055"},
            {url:"imagenes/prof_futuro_2.jpg", cap:"Algoritmo personalizando cada estudiante"},
            {url:"imagenes/prof_futuro_3.jpg", cap:"Aula sin maestro humano, 2080"}
        ]
    },
    med: {
        past:[
            {url:"imagenes/med_pasado_1.jpg", cap:"Sala de hospital histórica, s.XIX"},
            {url:"imagenes/med_pasado_2.jpg", cap:"Primera radiografía, Röntgen 1896"},
            {url:"imagenes/med_pasado_3.jpg", cap:"Médico con instrumentos clásicos, 1900s"}
        ],
        now:[
            {url:"imagenes/med_hoy_1.jpg", cap:"UCI con equipamiento de alta tecnología"},
            {url:"imagenes/med_hoy_2.jpg", cap:"Diagnóstico por imagen digital"},
            {url:"imagenes/med_hoy_3.jpg", cap:"Cirugía laparoscópica moderna"}
        ],
        future:[
            {url:"imagenes/med_futuro_1.jpg", cap:"Robot quirúrgico autónomo, 2058"},
            {url:"imagenes/med_futuro_2.jpg", cap:"IA diagnosticando con biosensores"},
            {url:"imagenes/med_futuro_3.jpg", cap:"Hospital sin médico humano, 2080"}
        ]
    }
};

const GAL_CAT_IMGS = {
    salud:      ["imagenes/cat_salud_1.jpg",      "imagenes/cat_salud_2.jpg",      "imagenes/cat_futuro.jpg"],
    tech:       ["imagenes/cat_tech_1.jpg",       "imagenes/cat_tech_2.jpg",       "imagenes/cat_futuro.jpg"],
    ingenieria: ["imagenes/cat_ingenieria_1.jpg", "imagenes/cat_ingenieria_2.jpg", "imagenes/cat_futuro.jpg"],
    legal:      ["imagenes/cat_legal_1.jpg",      "imagenes/cat_legal_2.jpg",      "imagenes/cat_futuro.jpg"],
    educacion:  ["imagenes/cat_educacion_1.jpg",  "imagenes/cat_educacion_2.jpg",  "imagenes/cat_futuro.jpg"],
    finanzas:   ["imagenes/cat_finanzas_1.jpg",   "imagenes/cat_finanzas_2.jpg",   "imagenes/cat_futuro.jpg"],
    gastronomia:["imagenes/cat_gastro_1.jpg",     "imagenes/cat_gastro_2.jpg",     "imagenes/cat_futuro.jpg"],
    transporte: ["imagenes/cat_transporte_1.jpg", "imagenes/cat_transporte_2.jpg", "imagenes/cat_futuro.jpg"],
    general:    ["imagenes/cat_general_1.jpg",    "imagenes/cat_general_2.jpg",    "imagenes/cat_futuro.jpg"]
};

const GUIONES_PANTALLA = {
    'screen-pasos':     "Antes de comenzar, aquí tienes los tres pasos del recorrido. Uno: explora las Salas de Exhibición y abre los expedientes. Dos: evalúa el nivel de automatización de cada profesión. Tres: propón nuevas profesiones al archivo histórico.",
    'screen-inicio':    "Bienvenido al Museo de Profesiones Extintas, año dos mil ochenta. Esta obra de Net Art reflexiona sobre el trabajo humano y su extinción frente a la automatización. Cuando estés listo, presiona Entrar al Museo.",
    'screen-museo':     "Estás en las Salas de Exhibición. Aquí encontrarás seis profesiones del siglo veintiuno desplazadas por la inteligencia artificial. Haz clic en cualquier tarjeta para abrir su expediente histórico. También puedes pedirme que genere el expediente de cualquier otra profesión.",
    'screen-entrevista':"Ahora estás en la Evaluación de Automatización. Selecciona una profesión de la lista y presiona Iniciar Evaluación. El algoritmo analizará cada tarea y calculará su índice de redundancia.",
    'screen-resultado': "Este es el Informe de Exclusión. El porcentaje indica cuántas funciones son automatizables. Recuerda: usted no fue reemplazado... sus tareas sí."
};

const GUIONES_EXP = {
    civil: "Has abierto el expediente del Ingeniero Civil. Activo entre dos mil veinte y dos mil cuarenta y cinco. El software de diseño generativo y las redes de simulación sísmica inteligente reemplazaron en un cien por ciento la intervención humana en cálculos estructurales.",
    arq:   "Has abierto el expediente del Arquitecto. Activo entre dos mil dieciocho y dos mil cincuenta. Los motores de diseño predictivo en tres dimensiones generaban configuraciones completas en milisegundos, volviendo al arquitecto técnico casi obsoleto.",
    cont:  "Has abierto el expediente del Contador. Activo entre dos mil quince y dos mil cuarenta. Los contratos inteligentes basados en Blockchain y la automatización fiscal eliminaron el error humano y las planillas tradicionales para siempre.",
    dis:   "Has abierto el expediente del Diseñador Gráfico. Activo entre dos mil veinte y dos mil cuarenta y ocho. Los modelos de difusión hiperrealista traducían intenciones complejas en campañas listas en segundos, erradicando el trabajo operativo de ilustración.",
    prof:  "Has abierto el expediente del Profesor. Activo entre dos mil veinte y dos mil cincuenta y cinco. Los tutores adaptativos sintéticos optimizaban el ritmo y las rutas de aprendizaje según el perfil neuronal exacto de cada estudiante.",
    med:   "Has abierto el expediente del Médico General. Activo entre dos mil veintidós y dos mil cincuenta y ocho. Las cápsulas de biosensado lograron un noventa y nueve punto ocho por ciento de efectividad diagnóstica sintética."
};

const CATS = {
    salud: {
        pct:[48,65], emoji:'🩺',
        years:[1500,2058],
        descs:[
            "Los sistemas de diagnóstico por imagen basados en redes neuronales convolucionales superaron la precisión humana en detección temprana, mientras que los asistentes clínicos autónomos gestionaban historiales y protocolos sin intervención. La atención de emergencia física y el vínculo emocional con el paciente permanecieron como últimos reductos humanos.",
            "Los biosensores de monitoreo continuo y los agentes de triaje predictivo eliminaron el diagnóstico presencial de rutina. Los sistemas de prescripción automatizada alcanzaron un 99.2% de efectividad, relegando al profesional humano a validar casos de alta complejidad clínica o carga emocional crítica.",
            "La robótica quirúrgica de precisión nanométrica y los modelos de predicción de riesgo en tiempo real desplazaron las intervenciones manuales estándar. El contacto humano directo subsistió únicamente como protocolo de contención psicológica en situaciones terminales."
        ],
        tasks:[
            { name:"Diagnóstico por síntomas estándar",      status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Emisión de recetas y dosificación",       status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Análisis e interpretación de laboratorio",status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Monitoreo de signos vitales",             status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Diagnóstico diferencial complejo",        status:"partial", text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Intervención de emergencia física",       status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Acompañamiento emocional al paciente",    status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    tech: {
        pct:[72,88], emoji:'💻',
        years:[1950,2046],
        descs:[
            "Los modelos generativos de código superaron la productividad humana individual en un factor de 400x, generando, testeando y desplegando sistemas completos en minutos. El rol del programador humano colapsó hacia la definición semántica de requisitos y la auditoría ética de sistemas autónomos.",
            "Los agentes de IA de propósito específico automatizaron el ciclo completo de desarrollo: desde el análisis de requerimientos hasta el mantenimiento predictivo. La creatividad en la arquitectura de soluciones permaneció como valor humano residual, aunque con demanda decreciente.",
            "Las plataformas de desarrollo sin código y los compiladores de intención natural eliminaron la barrera técnica de la programación. Los especialistas humanos sobrevivieron únicamente en nichos de ciberseguridad ofensiva y diseño de sistemas críticos no replicables."
        ],
        tasks:[
            { name:"Escritura de código rutinario",           status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Testing y detección de bugs",             status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Documentación técnica",                   status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Optimización de rendimiento",             status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Diseño de arquitectura de sistemas",      status:"partial", text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Auditoría ética de algoritmos",           status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Gestión de stakeholders técnicos",        status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    ingenieria: {
        pct:[74,85], emoji:'⚙️',
        years:[1750,2050],
        descs:[
            "El software de diseño generativo paramétrico y las simulaciones físicas en tiempo real eliminaron el ciclo manual de cálculo-verificación. Los sistemas BIM autónomos rediseñaban estructuras optimizadas según restricciones normativas en segundos, volviendo obsoleta la intervención humana en procesos repetitivos.",
            "La fusión de gemelos digitales y algoritmos de optimización topológica desplazó el diseño ingenieril tradicional. Las redes de sensores distribuidos gestionaban el mantenimiento predictivo sin supervisión humana, reduciendo el ingeniero a un rol de validación normativa esporádica.",
            "Los sistemas de automatización industrial de quinta generación integraron planificación, ejecución y ajuste en tiempo real. La ingeniería de campo fue absorbida por flotas de robots adaptativos, reservando al humano únicamente decisiones de impacto social o ambiental no modelable."
        ],
        tasks:[
            { name:"Elaboración de metrados y cálculos",      status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Modelado BIM y simulación estructural",   status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Generación de planos y documentación",    status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Verificación de normativa técnica",       status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Supervisión de ejecución en obra",        status:"partial", text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Gestión de riesgos críticos",             status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Liderazgo de equipos multidisciplinarios",status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    legal: {
        pct:[68,82], emoji:'⚖️',
        years:[1200,2048],
        descs:[
            "Los motores de análisis jurisprudencial y los contratos inteligentes en blockchain absorbieron el 80% del trabajo documental y de revisión legal. Los sistemas de litigación predictiva calculaban probabilidades de éxito con mayor precisión que los abogados senior, erosionando la base económica de la profesión.",
            "Los agentes legales autónomos procesaban miles de casos rutinarios simultáneamente, desde divorcios hasta disputas contractuales menores. La negociación de alto riesgo y la defensa penal con carga emocional permanecieron como nichos humanos decrecientes.",
            "La automatización de due diligence y compliance redujo equipos jurídicos enteros a un solo supervisor humano. Los sistemas de redacción legal superaron el estándar humano en precisión terminológica, dejando solo la estrategia procesal compleja como atribución del abogado humano."
        ],
        tasks:[
            { name:"Revisión y redacción de contratos",       status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Investigación jurisprudencial",            status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Due diligence documental",                status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Predicción de resultados procesales",     status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Negociación estratégica compleja",        status:"partial", text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Defensa penal con carga emocional",       status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Ética y criterio contextual jurídico",    status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    educacion: {
        pct:[60,72], emoji:'📚',
        years:[1600,2055],
        descs:[
            "Los tutores adaptativos sintéticos personalizaban rutas de aprendizaje según el perfil neurológico exacto de cada estudiante, superando la efectividad del docente humano en métricas de retención. La contención emocional y la formación ciudadana permanecieron como funciones humanas irreemplazables.",
            "Las plataformas de aprendizaje aumentado integraban gamificación, biofeedback y refuerzo adaptativo en tiempo real. Los sistemas de evaluación automatizada procesaban miles de trabajos simultáneamente con mayor consistencia que el docente humano, erosionando su ventaja comparativa.",
            "Los avatares pedagógicos hiperrealistas disponibles 24/7 eliminaron las barreras geográficas y económicas del acceso educativo. El docente humano subsistió como figura de mentoría relacional y gestión de crisis emocionales en el aula."
        ],
        tasks:[
            { name:"Diseño y entrega de contenido curricular", status:"auto",   text:"✓ AUTOMATIZABLE" },
            { name:"Calificación y evaluación de trabajos",    status:"auto",   text:"✓ AUTOMATIZABLE" },
            { name:"Seguimiento de progreso individual",       status:"auto",   text:"✓ AUTOMATIZABLE" },
            { name:"Tutoría personalizada de contenidos",      status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Detección de necesidades emocionales",     status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Contención de crisis en el aula",          status:"human",  text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Formación en valores y ciudadanía",        status:"human",  text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    finanzas: {
        pct:[85,94], emoji:'📊',
        years:[1494,2044],
        descs:[
            "Los contratos inteligentes y los sistemas de auditoría continua en blockchain eliminaron el ciclo manual de registro, verificación y reporte financiero. Los algoritmos de trading de alta frecuencia superaron décadas de experiencia humana en milisegundos, convirtiendo al analista en un obsoleto supervisor de procesos autónomos.",
            "La automatización fiscal integral y los motores de predicción de riesgo procesaban millones de transacciones con error tendiente a cero. El asesor financiero humano fue relegado a relaciones de alto patrimonio donde el componente emocional de confianza aún tenía valor de mercado.",
            "Los sistemas de planificación financiera autónoma integraban datos de mercado global en tiempo real con perfiles individuales, generando estrategias óptimas sin intervención humana. La creatividad en estructuración financiera compleja fue el último bastión antes de colapsar ante modelos generativos especializados."
        ],
        tasks:[
            { name:"Registro y conciliación de transacciones", status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Elaboración de estados financieros",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Auditoría y detección de anomalías",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Análisis de riesgo e inversión",           status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Planificación tributaria estratégica",     status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Asesoría en situaciones excepcionales",    status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Gestión de confianza con cliente VIP",     status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    marketing: {
        pct:[78,90], emoji:'📣',
        years:[1900,2047],
        descs:[
            "Los motores de generación de contenido hiperpersonalizado producían miles de variantes de campaña simultáneas, optimizadas en tiempo real por métricas de conversión. El community manager humano fue sustituido por agentes conversacionales indistinguibles de personas reales en el 94% de interacciones.",
            "Los sistemas de predicción de comportamiento del consumidor eliminaron la intuición como ventaja competitiva humana. Las plataformas de automatización de marketing gestionaban el ciclo completo desde la segmentación hasta el cierre de venta sin intervención humana detectable.",
            "La síntesis de identidades de marca y la generación creativa publicitaria fueron absorbidas por modelos multimodales de última generación. Solo la dirección estratégica de posicionamiento ante disrupciones culturales imprevisibles permaneció como atribución humana de valor residual."
        ],
        tasks:[
            { name:"Creación de contenido para redes sociales",status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Segmentación y targeting de audiencias",   status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Optimización SEO y SEM",                   status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Análisis de métricas y reportes",          status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Gestión de crisis de reputación",          status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Dirección creativa de campaña",            status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Negociación con medios y alianzas",        status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    medios: {
        pct:[76,88], emoji:'📰',
        years:[1700,2046],
        descs:[
            "Los sistemas de periodismo automatizado generaban noticias verificadas en segundos a partir de feeds de datos estructurados, cubriendo finanzas, deportes y meteorología sin periodista. Los presentadores virtuales hiperrealistas transmitían 24/7 con voz y gestualidad indistinguibles del humano.",
            "Los motores de síntesis audiovisual eliminaron la necesidad de equipos de producción humanos para contenido estándar. El periodismo de investigación profunda y el reportaje en zonas de conflicto permanecieron como nichos humanos de alto riesgo y escaso retorno económico.",
            "Las plataformas de verificación de hechos automatizada y los generadores de narrativa periodística desplazaron redacciones enteras. El corresponsal humano subsistió únicamente como credencial de confianza institucional en coberturas de alto impacto político."
        ],
        tasks:[
            { name:"Redacción de noticias de datos",           status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Verificación automatizada de hechos",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Edición y corrección de textos",           status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Producción de contenido multimedia",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Entrevistas y reportaje en campo",         status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Investigación periodística profunda",      status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Cobertura en zonas de conflicto",          status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    diseno: {
        pct:[74,86], emoji:'🎨',
        years:[1900,2049],
        descs:[
            "Los modelos de difusión generativa y síntesis visual de alta fidelidad tradujeron descripciones textuales en identidades visuales completas en segundos. El diseñador humano fue desplazado del trabajo operativo hacia la dirección conceptual de alto nivel, una función progresivamente marginalizada.",
            "Los sistemas de diseño adaptativo generaban automáticamente variaciones de marca coherentes para cada plataforma y audiencia. La exploración estética experimental permaneció como nicho humano, aunque con mercado decreciente ante la saturación de contenido sintético de calidad indistinguible.",
            "Los motores de diseño paramétrico e inteligencia visual contextual eliminaron los ciclos manuales de iteración creativa. Solo la dirección de arte en proyectos de identidad cultural compleja resistió la automatización, como último vestigio del valor diferencial humano en diseño."
        ],
        tasks:[
            { name:"Generación de variaciones visuales",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Adaptación a formatos y plataformas",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Selección cromática y tipográfica",        status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Prototipado de interfaces digitales",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Conceptualización de identidad de marca",  status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Dirección de arte en proyectos culturales",status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Empatía semántica con el cliente",         status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    artes: {
        pct:[52,68], emoji:'🎭',
        years:[1600,2055],
        descs:[
            "Los sistemas de síntesis performativa y composición generativa replicaron estilos artísticos establecidos con precisión técnica insuperable. Sin embargo, la autenticidad de la experiencia emocional en vivo y la narrativa autobiográfica irrepetible del artista humano resistieron la sustitución total.",
            "Los modelos generativos de composición musical y dirección cinematográfica automatizada produjeron obras de calidad comercial sin intervención humana. El artista humano sobrevivió en el nicho de la actuación en vivo y la experiencia presencial irreplicable digitalmente.",
            "La producción artística de consumo masivo fue absorbida completamente por sistemas generativos de bajo costo. El arte humano se revalorizó paradójicamente como lujo experiencial auténtico, reservado a audiencias de alto poder adquisitivo que pagaban por la presencia humana real."
        ],
        tasks:[
            { name:"Composición y arreglos musicales estándar",status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Producción y masterización de audio",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Generación de efectos y postproducción",   status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Interpretación en vivo ante audiencia",    status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Creación de obra con narrativa personal",  status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Conexión emocional auténtica en escena",   status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Improvisación creativa irrepetible",       status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    escritura: {
        pct:[70,84], emoji:'✍️',
        years:[1450,2048],
        descs:[
            "Los grandes modelos de lenguaje generaron contenido literario, periodístico y técnico de calidad comercial a escala ilimitada y costo marginal cero. El escritor humano fue desplazado del mercado masivo hacia nichos de voz autobiográfica auténtica y literatura de testimonio irrepetible.",
            "Los sistemas de traducción neuronal superaron el estándar humano en velocidad y consistencia terminológica. Solo la traducción literaria con carga cultural profunda y la interpretación simultánea en contextos de alta tensión diplomática preservaron al profesional humano.",
            "Los generadores de guion automatizados produjeron narrativas de entretenimiento estándar sin intervención humana. La escritura de autor con perspectiva única e irrepetible se convirtió en un producto de lujo cultural, económicamente marginal pero simbólicamente resistente."
        ],
        tasks:[
            { name:"Redacción de contenido informativo",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Corrección gramatical y de estilo",        status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Traducción de textos técnicos",            status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Síntesis y resumen de documentos",         status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Adaptación creativa de narrativas",        status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Escritura autobiográfica con voz propia",  status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Interpretación simultánea bajo tensión",   status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    gastronomia: {
        pct:[55,70], emoji:'🍳',
        years:[1800,2052],
        descs:[
            "Los robots de cocina de alta precisión y los sistemas de planificación de menú basados en preferencias neuronales del comensal eliminaron la cocina de producción estándar. La alta gastronomía como experiencia sensorial humana irrepetible resistió la sustitución, aunque su mercado se concentró en segmentos premium.",
            "Los dispensadores autónomos y las impresoras de alimentos de cuarta generación cubrieron el 85% de la demanda gastronómica cotidiana. El chef humano subsistió como figura ritual en restaurantes de experiencia donde la narrativa del cocinero formaba parte del producto.",
            "La automatización de la cadena de servicio hotelero y la gestión de experiencia del cliente por IA redujo drásticamente las plantillas humanas. Solo el contacto empático en servicios de lujo y la creatividad culinaria experimental preservaron al profesional humano."
        ],
        tasks:[
            { name:"Producción de platos de menú estándar",    status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Control de inventario y costos",           status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Gestión de reservas y pedidos",            status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Atención y servicio al cliente",           status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Creación de nuevos platos y menús",        status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Experiencia gastronómica narrativa",       status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Empatía sensorial con el comensal",        status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    transporte: {
        pct:[80,92], emoji:'✈️',
        years:[1920,2048],
        descs:[
            "Los sistemas de navegación autónoma y la gestión de tráfico aéreo por IA eliminaron la necesidad del piloto humano en rutas comerciales estándar. Los vehículos de conducción autónoma de nivel 5 absorbieron el transporte terrestre, relegando al conductor humano a situaciones de fallo sistémico impredecible.",
            "Los algoritmos de optimización logística en tiempo real gestionaban flotas completas sin supervisión humana, reduciendo costos y accidentes. El piloto humano sobrevivió únicamente en operaciones militares de alta incertidumbre y en vuelos privados de élite donde la presencia humana era parte del servicio.",
            "La automatización del control de tráfico y la gestión de cadena de suministro eliminaron miles de puestos de coordinación logística. Solo las emergencias con variables no modeladas y la responsabilidad legal en accidentes complejos preservaron al operador humano."
        ],
        tasks:[
            { name:"Navegación en rutas estándar",             status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Gestión de itinerarios y logística",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Control de sistemas de a bordo",           status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Comunicación con control de tráfico",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Gestión de emergencias estándar",          status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Decisiones en emergencias impredecibles",  status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Responsabilidad legal ante incidentes",    status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    estetica: {
        pct:[50,65], emoji:'💇',
        years:[1850,2050],
        descs:[
            "Los robots de estética de precisión y los sistemas de análisis facial predictivo automatizaron los servicios de belleza estándar con mayor consistencia que el profesional humano. Sin embargo, la experiencia sensorial personalizada y el vínculo relacional del servicio estético preservaron la demanda de atención humana.",
            "Las plataformas de simulación de imagen y los dispensadores automatizados de tratamientos cosméticos cubrieron la demanda básica. El profesional humano subsistió en el segmento premium donde la conversación, el tacto y la empatía formaban parte integral del servicio.",
            "La automatización de diagnóstico de imagen y recomendación de tratamientos redujo la intervención humana a roles de supervisión y atención emocional. El ritual social del servicio de belleza como espacio de conversación y conexión humana resistió la sustitución total."
        ],
        tasks:[
            { name:"Diagnóstico de tipo de cabello o piel",    status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Aplicación de tratamientos estándar",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Recomendación de productos",               status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Corte y peinado de precisión",             status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Atención conversacional al cliente",       status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Experiencia sensorial y ritual del servicio",status:"human",text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Adaptación creativa al estilo personal",   status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    agro: {
        pct:[70,84], emoji:'🌾',
        years:[1800,2050],
        descs:[
            "Los drones de precisión agrícola, los sistemas de riego autónomo y los robots de cosecha eliminaron la mano de obra estacional en cultivos de escala industrial. Los modelos de predicción climática y fitosanitaria gestionaban ciclos agrícolas completos sin intervención humana cotidiana.",
            "La agricultura vertical automatizada y los invernaderos inteligentes con control ambiental total desplazaron el modelo agrícola tradicional. El agrónomo humano subsistió como gestor de excepciones ante plagas emergentes o fenómenos climáticos no modelados.",
            "La automatización de la cadena extractiva y el monitoreo de recursos naturales por satélite eliminaron miles de puestos de campo. Solo las decisiones de alto impacto ambiental y la gestión de comunidades rurales preservaron la intervención humana experta."
        ],
        tasks:[
            { name:"Monitoreo de cultivos y suelos",           status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Aplicación de fertilizantes y pesticidas", status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Cosecha y procesamiento estándar",         status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Predicción de rendimiento y clima",        status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Diagnóstico de enfermedades en cultivos",  status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Gestión de comunidades rurales",           status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Decisiones ante fenómenos excepcionales",  status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    seguridad: {
        pct:[62,78], emoji:'🛡️',
        years:[1829,2050],
        descs:[
            "Los sistemas de vigilancia con reconocimiento facial, análisis predictivo del comportamiento y drones de patrullaje autónomo redujeron drásticamente la necesidad de personal de seguridad humano en espacios controlados. La respuesta a emergencias físicas complejas preservó el rol humano como necesidad irreductible.",
            "Los algoritmos forenses de análisis de evidencia digital superaron la capacidad humana en velocidad y precisión. El agente humano subsistió en operaciones encubiertas de alta complejidad social donde la empatía, la improvisación y el juicio contextual eran indispensables.",
            "La integración de IA en sistemas judiciales y de inteligencia redujo el ciclo investigativo de meses a horas. Solo la intervención física en situaciones de crisis imprevisible y la responsabilidad legal ante decisiones letales preservaron al operador humano."
        ],
        tasks:[
            { name:"Vigilancia y monitoreo de perímetros",     status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Análisis de evidencia digital",            status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Identificación biométrica",               status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Predicción de incidentes de seguridad",    status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Gestión de crisis en campo",               status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Intervención física en emergencias reales",status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Responsabilidad legal en uso de la fuerza",status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    gobierno: {
        pct:[55,70], emoji:'🏛️',
        years:[1648,2052],
        descs:[
            "Los sistemas de análisis de políticas públicas y simulación de impacto social generaban recomendaciones legislativas más precisas que los equipos humanos de asesores. Sin embargo, la legitimidad democrática y la negociación política con carga simbólica preservaron al representante humano como figura insustituible.",
            "La automatización de servicios gubernamentales eliminó miles de puestos administrativos y de atención ciudadana. Los funcionarios humanos subsistieron en roles de representación diplomática y gestión de conflictos sociales donde la confianza institucional requería presencia humana visible.",
            "Los modelos de simulación geopolítica y los agentes de negociación automatizada asistían a diplomáticos en tiempo real. La soberanía de la decisión política permanecía como prerrogativa humana irrenunciable, aunque progresivamente mediada por recomendaciones algorítmicas."
        ],
        tasks:[
            { name:"Procesamiento de trámites ciudadanos",     status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Análisis de impacto de políticas",         status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Gestión documental administrativa",        status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Comunicación institucional estándar",      status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Negociación diplomática compleja",         status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Representación y legitimidad democrática", status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Decisión soberana en crisis de Estado",    status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    ciencias: {
        pct:[58,74], emoji:'🔭',
        years:[1600,2052],
        descs:[
            "Los sistemas de simulación cuántica y los modelos de predicción científica procesaban hipótesis y generaban evidencia a velocidades inaccesibles para el investigador humano. La formulación de preguntas científicamente relevantes y la interpretación de resultados en contexto social preservaron el rol del científico.",
            "Las plataformas de descubrimiento automatizado identificaban patrones en conjuntos de datos masivos con precisión suprahumana. El científico humano subsistió como diseñador de experimentos con carga epistemológica y como comunicador de hallazgos ante audiencias no técnicas.",
            "Los laboratorios robotizados de última generación ejecutaban protocolos experimentales sin supervisión humana continua. La creatividad en la formulación de hipótesis disruptivas y la síntesis interdisciplinaria de conocimiento permanecieron como ventajas cognitivas humanas de valor decreciente."
        ],
        tasks:[
            { name:"Recolección y procesamiento de datos",     status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Ejecución de protocolos experimentales",   status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Revisión sistemática de literatura",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Modelado y simulación computacional",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Diseño de experimentos complejos",         status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Formulación de hipótesis disruptivas",     status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Interpretación ética de hallazgos",        status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    oficios: {
        pct:[65,80], emoji:'🔧',
        years:[1800,2048],
        descs:[
            "Los robots de mantenimiento adaptativo y los sistemas de diagnóstico predictivo eliminaron la mayor parte del trabajo de inspección y reparación rutinaria. Las intervenciones en entornos no estructurados con variables impredecibles preservaron temporalmente el oficio humano de precisión.",
            "Los exoesqueletos asistidos y los drones de inspección redujeron drásticamente los riesgos laborales y la necesidad de técnicos humanos en entornos peligrosos. Solo la resolución de averías en instalaciones antiguas no digitalizadas mantuvo demanda de oficio humano especializado.",
            "La manufactura aditiva y los sistemas de reparación autónoma eliminaron ciclos completos de trabajo artesanal. El técnico humano subsistió en proyectos de restauración patrimonial y en situaciones de emergencia con infraestructura deteriorada no modelada."
        ],
        tasks:[
            { name:"Diagnóstico de averías estándar",          status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Mantenimiento preventivo programado",      status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Reparaciones en entornos digitalizados",   status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Instalación según especificaciones",       status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Diagnóstico en entornos no estructurados", status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Intervención en infraestructura antigua",  status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Adaptación creativa ante imprevistos",     status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    patrimonio: {
        pct:[42,58], emoji:'🏺',
        years:[1750,2055],
        descs:[
            "Los sistemas de análisis espectroscópico y los modelos de datación por IA superaron la precisión del restaurador humano en identificación de materiales y técnicas históricas. Sin embargo, la decisión curatorial sobre qué preservar y cómo presentarlo culturalmente permaneció como prerrogativa humana insustituible.",
            "Las réplicas digitales de alta fidelidad y los gemelos virtuales de patrimonio cultural eliminaron la necesidad de acceso físico masivo a piezas originales. El conservador humano subsistió como garante de la autenticidad y la narrativa cultural que da sentido a los objetos preservados.",
            "Los algoritmos de restauración visual y sonora recuperaban obras degradadas con precisión histórica superior al experto humano. La interpretación del significado cultural en contexto contemporáneo y la negociación de repatriación de patrimonio preservaron la agencia humana irreductible."
        ],
        tasks:[
            { name:"Análisis y datación de materiales",       status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Documentación digital de colecciones",     status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Restauración digital de imágenes",         status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Restauración física de piezas",            status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Curaduría y diseño de exhibiciones",       status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Interpretación de significado cultural",   status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Negociación y ética patrimonial",          status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    },
    general: {
        pct:[62,80], emoji:'💼',
        years:[1850,2048],
        descs:[
            "Los sistemas de automatización cognitiva y los agentes de propósito general absorbieron el núcleo funcional de esta profesión, convirtiendo al especialista humano en un validador ocasional de procesos autónomos de bajo error.",
            "Las plataformas de inteligencia aumentada y los asistentes de decisión en tiempo real eliminaron la ventaja comparativa del especialista humano, estandarizando en meses funciones que antes requerían años de formación especializada.",
            "Los modelos de aprendizaje continuo y los sistemas de inferencia adaptativa replicaron y superaron el rendimiento humano promedio en esta disciplina, relegando al profesional a roles de supervisión ética y gestión de excepciones impredecibles.",
            "La integración de robótica colaborativa y análisis predictivo eliminó los procesos repetitivos de alto volumen, concentrando el valor humano únicamente en decisiones con carga contextual y emocional no modelable algorítmicamente.",
            "Los generadores de soluciones especializadas y los sistemas de optimización multiobjetivo superaron la capacidad de respuesta individual humana, desplazando al profesional hacia la formulación de preguntas relevantes más que a la entrega de respuestas.",
            "La automatización de la cadena de valor completa en esta disciplina redujo el tiempo de ciclo de semanas a segundos, haciendo económicamente inviable la intervención humana en procesos estándar de cualquier escala.",
        ],
        tasks:[
            { name:"Procesamiento y análisis de información",  status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Generación de informes y documentación",   status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Optimización de procesos repetitivos",     status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Toma de decisiones estructuradas",         status:"auto",  text:"✓ AUTOMATIZABLE" },
            { name:"Supervisión y control de calidad",         status:"partial",text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Gestión de relaciones y negociación",      status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Criterio ético y contextual complejo",     status:"human", text:"✗ REQUIERE INTERVENCION HUMANA" },
        ]
    }
};

/* ── Función preparada para futuro backend ──
   Actualmente devuelve datos desde dbMuseo. Más adelante se reemplazará
   por una petición POST a un backend en Python que genere el expediente usando IA. */
function obtenerExpediente(id) {
    if (dbMuseo[id]) {
        return JSON.parse(JSON.stringify(dbMuseo[id]));
    }
    return null;
}