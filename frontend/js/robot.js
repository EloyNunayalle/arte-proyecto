/* ================================================================
   robot.js — Robot guía, voz, búsqueda y funciones relacionadas
   ================================================================ */
(function() {

    /* ── Estado ── */
    let rVoice = null, rAuto = true, rMusic = true, rScreen = '';
    let rCfg = { rate:0.9, pitch:1.0, volume:1.0 };
    let rPanelOpen = false, rBubbleTimer = null;
    let pendingExpData = null;
    let iaCount = 0;
    let _muted = false;

    // ================================================================
    //   BACKEND — Llama al servidor FastAPI para generar el expediente
    // ================================================================
    async function obtenerExpedienteIA(profesion){

        const response = await fetch(`${API_URL}/expediente`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                profesion
            })
        });

        if(!response.ok)
            throw new Error("Backend no disponible");

        return await response.json();
    }

    /* ── Música post-narración ── */
    let mCtx=null, mGain=null, mOscs=[];

    function startMusic() {
        if (!rMusic) return;
        stopMusic();
        try {
            mCtx  = new (window.AudioContext || window.webkitAudioContext)();
            mGain = mCtx.createGain();
            mGain.gain.setValueAtTime(0, mCtx.currentTime);
            mGain.gain.linearRampToValueAtTime(0.032, mCtx.currentTime + 3.0);
            mGain.connect(mCtx.destination);
            [[110,0.28,'triangle'],[277.18,0.16,'sine'],[329.63,0.14,'sine'],[392,0.12,'sine'],[493.88,0.10,'sine']].forEach(([f,v,t])=>{
                const o=mCtx.createOscillator(), g=mCtx.createGain();
                o.type=t; o.frequency.value=f;
                o.detune.value=(Math.random()-0.5)*12;
                g.gain.value=v; o.connect(g); g.connect(mGain); o.start();
                mOscs.push({o,g});
            });
        } catch(e){ console.warn('rbot music:', e); }
    }

    function stopMusic() {
        if (!mGain || !mCtx) return;
        try {
            mGain.gain.linearRampToValueAtTime(0, mCtx.currentTime + 1.0);
            const snap=[...mOscs];
            setTimeout(()=>{ snap.forEach(n=>{try{n.o.stop();n.o.disconnect();n.g.disconnect();}catch(e){}});
                try{mGain.disconnect();}catch(e){}  mGain=null; mOscs=[]; },1100);
        } catch(e){}
    }

    /* ── Voces ── */
    function loadVoices() {
        const sel=document.getElementById('rs-voz'); if(!sel) return;
        sel.innerHTML='';
        const all=speechSynthesis.getVoices();
        const es=all.filter(v=>v.lang.startsWith('es'));
        const list=es.length?es:all;
        list.forEach((v,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=v.name.slice(0,26)+' ('+v.lang+')'; sel.appendChild(o); });
        if(list.length) rVoice=list[0];
    }
    window.rbotChangeVoice=function(){ const sel=document.getElementById('rs-voz'); const all=speechSynthesis.getVoices(); const es=all.filter(v=>v.lang.startsWith('es')); const list=es.length?es:all; rVoice=list[parseInt(sel.value)]; };
    window.rbotApplyCfg=function(){ rCfg.rate=parseFloat(document.getElementById('rs-vel').value); rCfg.pitch=parseFloat(document.getElementById('rs-tono').value); rCfg.volume=parseFloat(document.getElementById('rs-vol').value); };

    /* ── Hablar ── */
    let _keepAliveTimer = null;
    function speak(text) {
        if(!text || _muted) return;
        stopMusic(); speechSynthesis.cancel();
        if(_keepAliveTimer) { clearInterval(_keepAliveTimer); _keepAliveTimer=null; }
        const u=new SpeechSynthesisUtterance(text);
        u.rate=rCfg.rate; u.pitch=rCfg.pitch; u.volume=rCfg.volume;
        if(rVoice) u.voice=rVoice;
        const fab=document.getElementById('rbot-fab');
        const rsm=document.getElementById('rsm-robot');
        u.onstart=()=>{
            fab&&fab.classList.add('talking'); rsm&&rsm.classList.add('talking');
            _keepAliveTimer = setInterval(()=>{
                if(speechSynthesis.speaking) {
                    speechSynthesis.pause();
                    speechSynthesis.resume();
                } else {
                    clearInterval(_keepAliveTimer); _keepAliveTimer=null;
                }
            }, 10000);
        };
        u.onend=()=>{
            fab&&fab.classList.remove('talking'); rsm&&rsm.classList.remove('talking');
            if(_keepAliveTimer){ clearInterval(_keepAliveTimer); _keepAliveTimer=null; }
            startMusic();
        };
        u.onerror=()=>{
            fab&&fab.classList.remove('talking'); rsm&&rsm.classList.remove('talking');
            if(_keepAliveTimer){ clearInterval(_keepAliveTimer); _keepAliveTimer=null; }
            startMusic();
        };
        speechSynthesis.speak(u);
    }

    /* ── Burbuja ── */
    function showBubble(text) {
        const b=document.getElementById('rbot-bubble'), s=document.getElementById('rbot-bubble-text');
        if(!b||!s) return; s.textContent=text; b.classList.add('visible');
        clearTimeout(rBubbleTimer); rBubbleTimer=setTimeout(()=>b.classList.remove('visible'),11000);
    }

    /* ── API pública ── */
    window.rbotNarrate=function(screenId){
        const force = window._rbotScreenOverride;
        window._rbotScreenOverride = false;
        if(!force && rScreen===screenId) return;
        rScreen=screenId;
        const t=GUIONES_PANTALLA[screenId]; if(!t) return;
        showBubble(t); if(rAuto) setTimeout(()=>speak(t),500);
    };

    window.rbotNarrateExp=function(profId){
        const t=GUIONES_EXP[profId]; if(!t) return;
        showBubble(t);
        if(rAuto) setTimeout(()=>speak(t), 400);
    };

    window.rbotToggleMute=function(){
        _muted=!_muted;
        const el=document.getElementById('rs-mute');
        if(_muted){
            el.classList.add('on');
            speechSynthesis.cancel();
            stopMusic();
        } else {
            el.classList.remove('on');
        }
    };
    window.rbotToggleAuto=function(){ rAuto=!rAuto; const el=document.getElementById('rs-auto'); if(rAuto) el.classList.add('on'); else{el.classList.remove('on'); speechSynthesis.cancel(); stopMusic();} };
    window.rbotToggleMusic=function(){ rMusic=!rMusic; const el=document.getElementById('rs-music'); if(rMusic) el.classList.add('on'); else{el.classList.remove('on'); stopMusic();} };
    window.rbotReplay=function(){ const t=GUIONES_PANTALLA[rScreen]; if(t){showBubble(t);speak(t);} };
    window.rbotFabClick=function(){ if(rPanelOpen){rbotClosePanel();return;} document.getElementById('rbot-panel').classList.add('open'); document.getElementById('rbot-bubble').classList.remove('visible'); rPanelOpen=true; };
    window.rbotClosePanel=function(){ document.getElementById('rbot-panel').classList.remove('open'); rPanelOpen=false; };

    /* ── Búsqueda IA ── */
    window.rbotOpenSearch=function(){
        rbotClosePanel();
        const m=document.getElementById('rbot-search-modal'); m.classList.add('open');
        document.getElementById('rsm-input').value='';
        document.getElementById('rsm-status').textContent='';
        document.getElementById('rsm-result').classList.remove('visible');
        document.getElementById('rsm-go-btn').disabled=false;
        setTimeout(()=>{ document.getElementById('rsm-input').focus();
            speak("Escribe el nombre de cualquier profesión. Yo generaré su expediente histórico del año dos mil ochenta.");
        },300);
    };

    window.rbotCloseSearch=function(){
        document.getElementById('rbot-search-modal').classList.remove('open');
        speechSynthesis.cancel(); stopMusic(); pendingExpData=null;
    };

    window.rbotSearchProf=async function(){
        const input=document.getElementById('rsm-input').value.trim();
        if(!input) return;
        const btn=document.getElementById('rsm-go-btn');
        const status=document.getElementById('rsm-status');
        const result=document.getElementById('rsm-result');
        btn.disabled=true; result.classList.remove('visible');
        status.textContent='▸ Consultando archivo histórico...';
        speechSynthesis.cancel();
        document.getElementById('rsm-robot').classList.add('talking');

        const progBar = document.getElementById('rsm-progress-bar');
        const progWrap = document.getElementById('rsm-progress');
        const logEl = document.getElementById('rsm-log');
        progWrap.classList.add('visible');
        logEl.classList.add('visible');
        const steps = [
            [10, '▸ Buscando en archivo histórico...'],
            [30, '▸ Analizando perfil profesional...'],
            [55, '▸ Calculando índice de redundancia...'],
            [75, '▸ Generando expediente distópico...'],
            [90, '▸ Compilando datos de automatización...'],
            [100,'▸ Expediente listo.']
        ];
        let si = 0;
        const stepInterval = setInterval(()=>{
            if(si < steps.length){
                progBar.style.width = steps[si][0]+'%';
                logEl.textContent = steps[si][1];
                si++;
            } else { clearInterval(stepInterval); }
        }, 280);

        try {
            const prof = input.toLowerCase().trim();
            const titleProf = input.trim().replace(/\b\w/g, c => c.toUpperCase());
            const profKey   = input.trim().toLowerCase().replace(/[^a-záéíóúüñ]/g,'').slice(0,12) || 'prof'+Date.now();

            // ================================================================
            //  BACKEND (IA) — intento principal
            // ================================================================
            try {
                const iaData = await obtenerExpedienteIA(prof);

                const exp = {
                    title:    iaData.title,
                    years:    iaData.start_year + " - " + iaData.end_year,
                    desc:     iaData.description,
                    narration:"Has accedido al expediente de " + titleProf +
                              ". " + (iaData.description || "") +
                              " Esta profesión estuvo activa entre " + iaData.start_year +
                              " y " + iaData.end_year + ". Con un índice de automatización del " +
                              iaData.percentage + " por ciento.",
                    emoji:    iaData.emoji || '🔮',
                    profKey:  profKey,
                    pct:      iaData.percentage,
                    tasks:    iaData.tasks
                };

                pendingExpData=exp;
                document.getElementById('rsm-res-title').textContent=exp.title+' // '+exp.years;
                document.getElementById('rsm-res-text').textContent=exp.desc;
                result.classList.add('visible');
                status.textContent='✓ Expediente generado por IA — Categoría: '+(iaData.category||'general').toUpperCase();
                document.getElementById('rsm-robot').classList.remove('talking');
                progWrap.classList.remove('visible');
                logEl.classList.remove('visible');
                speak(exp.narration);
                return;
            } catch(backendError){
                // Fallo del backend → se usa el generador local como fallback
                console.warn("Backend no disponible, usando generador local.", backendError);
            }

            // ================================================================
            //  FALLBACK LOCAL — generador offline (código original intacto)
            // ================================================================
            function detectCategory(p) {
                if (/méd|doctor|enfermer|partera|cardio|neuro|pediat|trauma|oncol|psiqui|radio|aneste|dermat|ginec|oftalm|urol|endocrin|gastro|nefrol|neumol|intensiv|quirúrg|kines|fisiote|terapeu|fonoaud|logop|quiro|psicól|psicoan|neurops|odont|ortodon|period|endodon|maxilo|higien|bioquím|patól|radióg|hemató|nutri|dietis|farmac|quím|veterin|cirujano vet/.test(p)) return 'salud';
                if (/program|develop|frontend|backend|fullstack|software|ux|ui|videojueg|machine learn|dato|data|analista|big data|base de dato|cibersegur|redes|cloud|soport|inform|tecno|sistem/.test(p)) return 'tech';
                if (/ingen|mecán|eléctric|electrón|químic|industrial|aeroesp|biomédic|mecatron|nuclear|telecom|topógraf|urbanis|calculis|delinean|construc|civil/.test(p)) return 'ingenieria';
                if (/abogad|juez|fiscal|notari|paralegal|mediador|penalist|laboralist|corporativ|justicia|derecho/.test(p)) return 'legal';
                if (/maestr|profes|docent|educad|pedagog|rector|psicopedag|univers|primaria|secundar|infantil|especial/.test(p)) return 'educacion';
                if (/contad|auditor|financ|bolsa|invers|cajero|bancari|riesgo|tesorero/.test(p)) return 'finanzas';
                if (/market|seo|community|copywrite|mercado|ventas|account|publicid|brand/.test(p)) return 'marketing';
                if (/period|reportero|presentad|locutor|relacion|editor|comunicac|prensa|tv|radio/.test(p)) return 'medios';
                if (/diseñ|ilustrad|animad|grafic|moda|interior|industrial|fotógraf|visual/.test(p)) return 'diseno';
                if (/actor|direct|productor|músic|compositor|coreógraf|bailar|cantan|artis|escén|cine/.test(p)) return 'artes';
                if (/escritor|poet|guionist|traductor|intérpret|lingüist|filól|liter/.test(p)) return 'escritura';
                if (/chef|cocinero|pastel|bartend|mesero|recepcion|sommelier|gastronom|hotel|hospitalid/.test(p)) return 'gastronomia';
                if (/piloto|azafat|auxiliar vuelo|capitán|conductor|transport|logístic|supply/.test(p)) return 'transporte';
                if (/estilis|barbero|maquillad|cosmetól|masajist|manicur|estética|belleza/.test(p)) return 'estetica';
                if (/agrónom|agricultor|horticultor|viticultor|ganadero|avicultor|apicultor|pescador|piscicultor|forestal|guardabosq|minas|petróleo|minero/.test(p)) return 'agro';
                if (/policía|detective|perito|militar|bombero|aduanas|guardia|seguridad|forense/.test(p)) return 'seguridad';
                if (/diplo|embajad|funcionario|administrad|político|gestor política|gobierno/.test(p)) return 'gobierno';
                if (/biólog|genétic|microbiol|botánic|zoólog|ecólog|biotecnól|físic|matemát|estadístic|astrónom|geólog|meteoról|oceanógraf|paleontól|quím|antropól|arqueól|sociólog|politól|historiad|geógraf|economis/.test(p)) return 'ciencias';
                if (/electr|plomer|fontaner|carpinter|albañil|cerrajer|pintor|soldad|mecánic|refriger|mantenim|técnic/.test(p)) return 'oficios';
                if (/curador|museógraf|restaurad|escultor|pintor|patrimoni/.test(p)) return 'patrimonio';
                return 'general';
            }

            const hash      = prof.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
            const cat       = detectCategory(prof);
            const catData   = CATS[cat];

            const pctRange  = catData.pct[1] - catData.pct[0];
            const pct       = catData.pct[0] + (hash % (pctRange + 1));

            const desc      = catData.descs[hash % catData.descs.length];

            const yearStart = catData.years[0];
            const yearEnd   = catData.years[1] + (hash % 7);

            const titleUp   = titleProf.toUpperCase();

            const exp = {
                title:    titleUp,
                years:    yearStart + " - " + yearEnd,
                desc:     desc,
                narration:"Has accedido al expediente de " + titleProf +
                          ". " + desc +
                          " Esta profesión estuvo activa entre " + yearStart +
                          " y " + yearEnd + ". Con un índice de automatización del " +
                          pct + " por ciento.",
                emoji:    catData.emoji,
                profKey:  profKey,
                pct:      pct,
                tasks:    catData.tasks
            };

            pendingExpData=exp;
            document.getElementById('rsm-res-title').textContent=exp.title+' // '+exp.years;
            document.getElementById('rsm-res-text').textContent=exp.desc;
            result.classList.add('visible');
            status.textContent='✓ Expediente generado — Categoría: '+cat.toUpperCase();
            document.getElementById('rsm-robot').classList.remove('talking');
            progWrap.classList.remove('visible');
            logEl.classList.remove('visible');
            speak(exp.narration);
        } catch(e){
            status.textContent='⚠ Error al generar expediente. Intenta de nuevo.';
            document.getElementById('rsm-robot').classList.remove('talking');
            btn.disabled=false;
            console.error(e);
        }
    };

    window.rbotAddToMuseo=function(){
        if(!pendingExpData) return;
        const exp=pendingExpData;
        const key=exp.profKey||(exp.title.toLowerCase().replace(/[^a-z]/g,'').slice(0,8)+Date.now());

        if(typeof dbMuseo!=='undefined'){
            dbMuseo[key]={
                title:exp.title, years:exp.years, desc:exp.desc,
                imageUrl:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
            };
        }

        const tareasIA = exp.tasks || [
            { name:"Procesamiento de datos y registros", status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Análisis de información compleja",   status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Generación de informes",             status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Optimización de procesos",           status:"auto",    text:"✓ AUTOMATIZABLE" },
            { name:"Supervisión de calidad",             status:"partial", text:"⚠ PARCIALMENTE AUTOMATIZABLE" },
            { name:"Gestión de relaciones humanas",      status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
            { name:"Criterio ético contextual",          status:"human",   text:"✗ REQUIERE INTERVENCION HUMANA" },
        ];
        const pct = exp.pct || 70;

        if(typeof dbTareas!=='undefined'){
            dbTareas[key]={
                percentage: pct+"%",
                nombre: exp.title,
                tasks: tareasIA
            };
        }

        GUIONES_EXP[key]=exp.narration;

        const grid=document.querySelector('.grid-profesiones');
        if(grid){
            const card=document.createElement('div');
            card.className='card-profesion ia-generated';
            card.id='card-ia-'+key;
            card.setAttribute('onclick','openExpediente("'+key+'")');
            card.dataset.profKey = key;
            card.innerHTML =
                '<button class="card-del-btn" title="Eliminar">✕</button>' +
                '<button class="card-gallery-btn">📷 Galería</button>' +
                '<span class="card-icon">' + (exp.emoji || '🔮') + '</span>' +
                '<span class="card-name">' + exp.title.charAt(0) + exp.title.slice(1).toLowerCase() + '</span>';
            card.querySelector('.card-del-btn').addEventListener('click', function(e){
                e.stopPropagation(); rbotDeleteProf(key);
            });
            card.querySelector('.card-gallery-btn').addEventListener('click', function(e){
                e.stopPropagation(); openGallery(key);
            });
            grid.appendChild(card);
        }

        const selectList = document.querySelector('.select-list');
        if(selectList){
            const btn = document.createElement('button');
            btn.className='select-item-btn';
            btn.id='btn-sel-'+key;
            btn.innerHTML='<span>'+exp.title.charAt(0)+exp.title.slice(1).toLowerCase()+' <span style="font-size:0.65rem;color:var(--neon-pink);margin-left:6px;">IA</span></span><span>➔</span>';
            btn.setAttribute('onclick',"selectProfession('"+key+"')");
            btn.addEventListener('mouseenter', soundHover);
            selectList.appendChild(btn);
        }

        iaCount++;
        const counter = document.getElementById('ia-counter');
        if(counter){
            counter.textContent = '+'+iaCount+' IA';
            counter.style.display='inline-block';
        }

        rbotCloseSearch();
        pendingExpData=null;
        speak("Expediente de "+exp.title.charAt(0)+exp.title.slice(1).toLowerCase()+" añadido al museo y a la evaluación. Puedes analizarla en la pantalla de tareas.");
        showBubble("✓ "+exp.title+" añadido al museo y evaluación");
    };

    window.rbotDeleteProf=function(key){
        const card = document.getElementById('card-ia-'+key);
        if(card) card.remove();
        const btn = document.getElementById('btn-sel-'+key);
        if(btn) btn.remove();
        if(typeof dbMuseo!=='undefined') delete dbMuseo[key];
        if(typeof dbTareas!=='undefined') delete dbTareas[key];
        iaCount = Math.max(0, iaCount-1);
        const counter = document.getElementById('ia-counter');
        if(counter){
            if(iaCount===0) counter.style.display='none';
            else counter.textContent='+'+iaCount+' IA';
        }
        showBubble("Expediente eliminado del archivo.");
    };

    /* ── Init ── */
    if(speechSynthesis.getVoices().length) loadVoices();
    speechSynthesis.onvoiceschanged=loadVoices;
    window.addEventListener('load',()=>{
        setTimeout(()=>{
            showBubble(GUIONES_PANTALLA['screen-inicio']);
            rScreen='screen-inicio';
        },1200);
    });

})();