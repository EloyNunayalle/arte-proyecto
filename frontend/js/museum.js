/* ================================================================
   museum.js — Tarjetas, expedientes, galería
   ================================================================ */

// CONTROL DE EXPEDIENTES (PANTALLA 2)
function openExpediente(profId) {
    triggerGlitchEffect(() => {
        const exp = dbMuseo[profId];
        if (exp) {
            document.getElementById('exp-title').innerText = exp.title;
            document.getElementById('exp-years').innerText = exp.years;
            document.getElementById('exp-text').innerText = exp.desc;
            
            const imgElement = document.getElementById('exp-image');
            imgElement.onerror = function() {
                this.onerror = null;
                this.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80";
            };
            imgElement.src = exp.imageUrl;
            imgElement.alt = `Registro histórico de la profesión: ${exp.title}`;
            
            document.getElementById('expediente-panel').classList.add('active');
            if(typeof rbotNarrateExp==='function') rbotNarrateExp(profId);
        }
    });
}

function closeExpediente() {
    soundBlip();
    if(typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    document.getElementById('expediente-panel').classList.remove('active');
}

// GALERÍA DE IMÁGENES POR PROFESIÓN
window.openGallery = function(profId) {
    const modal = document.getElementById('gallery-modal');
    const body  = document.getElementById('gal-body');
    const titleEl = document.getElementById('gal-title');
    modal.classList.add('open');
    if(typeof speechSynthesis!=='undefined') speechSynthesis.cancel();
    body.innerHTML = '<div class="gal-loading">▸ Accediendo al archivo visual...</div>';

    let profName = profId;
    let imgs = null;

    if (GALLERY_IMGS[profId]) {
        imgs = GALLERY_IMGS[profId];
        const names = {civil:'Ingeniero Civil',arq:'Arquitecto',cont:'Contador',
                       dis:'Diseñador Gráfico',prof:'Profesor',med:'Médico General'};
        profName = names[profId] || profId;
    } else if (typeof dbMuseo !== 'undefined' && dbMuseo[profId]) {
        profName = dbMuseo[profId].title;
        const catKeys = Object.keys(GAL_CAT_IMGS);
        let cat = 'general';
        for(const k of catKeys){ if(profId.startsWith(k.slice(0,4))){ cat=k; break; } }
        const ci = GAL_CAT_IMGS[cat] || GAL_CAT_IMGS.general;
        const futureImgs = [
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=75",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=75",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=75"
        ];
        imgs = {
            past:[  {url:ci[0],cap:"Orígenes históricos de la profesión"},
                    {url:ci[1],cap:"Práctica en su auge histórico"},
                    {url:ci[2],cap:"Herramientas y métodos de la época"} ],
            now:[   {url:ci[1],cap:"Ejercicio contemporáneo del rol"},
                    {url:ci[0],cap:"Tecnología actual del sector"},
                    {url:ci[2],cap:"El profesional humano en su etapa final"} ],
            future:[{url:futureImgs[0],cap:"Sistema autónomo sustituto, 2080"},
                    {url:futureImgs[1],cap:"Infraestructura sin operador humano"},
                    {url:futureImgs[2],cap:"Función declarada extinta"} ]
        };
    }

    if (!imgs) { body.innerHTML = '<div class="gal-loading">Archivo visual no disponible.</div>'; return; }
    titleEl.textContent = 'ARCHIVO VISUAL // ' + profName.toUpperCase();

    const eras = [
        {key:'past',   cls:'gal-era-past',   label:'PASADO — Origen y ejercicio histórico de la profesión'},
        {key:'now',    cls:'gal-era-now',    label:'PRESENTE — Siglo XXI, últimas décadas de actividad humana'},
        {key:'future', cls:'gal-era-future', label:'FUTURO — Año 2080, tras la automatización total'},
    ];

    setTimeout(() => {
        body.innerHTML = eras.map(era => `
            <div class="gal-era ${era.cls}">
                <div class="gal-era-title">${era.label}</div>
                <div class="gal-images">
                    ${imgs[era.key].map(img => `
                        <div class="gal-img-wrap">
                            <img src="${img.url}" alt="${img.cap}"
                                 onerror="this.src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=75'">
                            <div class="gal-img-caption">${img.cap}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }, 350);
};

window.closeGallery = function() {
    document.getElementById('gallery-modal').classList.remove('open');
};