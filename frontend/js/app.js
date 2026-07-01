/* ================================================================
   app.js — Inicialización, navegación, audio, canvas, funciones generales
   ================================================================ */

// ESTADO GLOBAL
let currentScreen = 'screen-inicio';
let selectedProfession = '';
let audioEnabled = true;
let activeAmbient = '';

// SINTETIZADOR NATIVO DE AUDIO (WEB AUDIO API)
let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;

// Nuevos osciladores para acordes nostálgicos complejos en Pantalla 2
let chordOscillators = [];
let chordGain = null;
let warmFilter = null;

// MANEJADOR DE CONTROL DE ERRORES DE IMÁGENES (FALLBACK DE SEGURIDAD GLOBAL)
function handleImageError(img) {
    img.onerror = null;
    img.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80";
}

async function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    }
}

// CONTROL DINÁMICO DE AUDIO AMBIENTAL SEGÚN PANTALLA
function updateAmbientSound() {
    if (!audioEnabled || !audioCtx) return;
    if (activeAmbient === currentScreen) return;

    stopAmbientHum();
    stopNostalgicAmbient();

    activeAmbient = currentScreen;

    if (currentScreen === 'screen-museo') {
        startNostalgicAmbient();
    } else if (currentScreen === 'screen-entrevista') {
        startColdAmbientHum();
    }
}

// 1. Sonido ambiental nostálgico (Pantalla 2)
function startNostalgicAmbient() {
    if (!audioEnabled || !audioCtx) return;
    try {
        warmFilter = audioCtx.createBiquadFilter();
        warmFilter.type = 'lowpass';
        warmFilter.frequency.setValueAtTime(650, audioCtx.currentTime);

        chordGain = audioCtx.createGain();
        chordGain.gain.setValueAtTime(0, audioCtx.currentTime);
        chordGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 1.0);
        
        warmFilter.connect(chordGain);
        chordGain.connect(audioCtx.destination);

        const freqs = [110.00, 164.81, 220.00, 261.63, 329.63, 392.00];
        
        freqs.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            osc.type = index % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.detune.setValueAtTime((Math.random() - 0.5) * 12, audioCtx.currentTime);

            osc.connect(warmFilter);
            osc.start();
            chordOscillators.push(osc);
        });
    } catch (e) {
        console.log("Error al iniciar audio ambiental.");
    }
}

function stopNostalgicAmbient() {
    activeAmbient = '';
    if (chordGain) {
        try {
            chordGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
            setTimeout(() => {
                chordOscillators.forEach(osc => {
                    try { osc.stop(); osc.disconnect(); } catch(e) {}
                });
                chordOscillators = [];
                if (chordGain) { chordGain.disconnect(); chordGain = null; }
                if (warmFilter) { warmFilter.disconnect(); warmFilter = null; }
            }, 600);
        } catch(e) {}
    }
}

// 2. Hum frío y calculador de Inteligencia Artificial (Pantalla 3)
let coldIntervalId = null;

function startColdAmbientHum() {
    if (!audioEnabled || !audioCtx) return;
    try {
        ambientOsc = audioCtx.createOscillator();
        ambientGain = ambientGain || audioCtx.createGain();
        
        ambientOsc.type = 'triangle';
        ambientOsc.frequency.setValueAtTime(55, audioCtx.currentTime);
        
        ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
        ambientGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 1.0);
        
        ambientOsc.connect(ambientGain);
        ambientGain.connect(audioCtx.destination);
        
        ambientOsc.start();

        playColdRadarBeat();
    } catch (e) {
        console.log("Error al iniciar audio clínico.");
    }
}

function playColdRadarBeat() {
    if (currentScreen !== 'screen-entrevista') return;
    playSynthSound(1200, 1200, 0.08, 'sine', 0.02);

    coldIntervalId = setTimeout(() => {
        if (currentScreen === 'screen-entrevista') {
            playColdRadarBeat();
        }
    }, 1500);
}

function stopAmbientHum() {
    activeAmbient = '';
    if (coldIntervalId) {
        clearTimeout(coldIntervalId);
        coldIntervalId = null;
    }

    if (ambientOsc) {
        try {
            if (ambientGain) {
                ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
            }
            setTimeout(() => {
                if (ambientOsc) {
                    try { ambientOsc.stop(); ambientOsc.disconnect(); } catch(e) {}
                    ambientOsc = null;
                }
            }, 500);
        } catch(e) {}
    }
}

function playSynthSound(freqStart, freqEnd, duration, type = 'sine', volume = 0.1) {
    if (!audioEnabled) return;
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
        if (freqEnd !== freqStart) {
            osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + duration);
        }

        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Audio no iniciado aún.");
    }
}

// SONIDOS PREDISEÑADOS
const soundBlip = () => playSynthSound(880, 1200, 0.1, 'sine', 0.12);
const soundHover = () => playSynthSound(600, 600, 0.04, 'triangle', 0.05);
const soundScanRow = () => playSynthSound(440, 880, 0.12, 'triangle', 0.08);
const soundGlitch = () => playSynthSound(100, 800, 0.2, 'sawtooth', 0.05);
const soundAlarm = () => {
    playSynthSound(140, 50, 0.7, 'sawtooth', 0.18);
    setTimeout(() => playSynthSound(140, 50, 0.7, 'sawtooth', 0.18), 300);
};

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('audio-btn');
    const eq = document.getElementById('eq-container');
    if (audioEnabled) {
        btn.innerText = "SONIDO: ACTIVADO";
        eq.classList.remove('muted');
        initAudio().then(() => {
            updateAmbientSound();
            soundBlip();
        });
    } else {
        btn.innerText = "SONIDO: DESACTIVADO";
        eq.classList.add('muted');
        stopAmbientHum();
        stopNostalgicAmbient();
    }
}

// EFECTO DE NÚCLEO PARTICULAS (CANVAS BACKGROUND NEURAL NETWORK)
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = null;
let mouseY = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouseX = null;
    mouseY = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
    }
    update() {
        if (mouseX !== null && mouseY !== null) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x += (dx / dist) * force * 2;
                this.y += (dy / dist) * force * 2;
                this.radius = this.baseRadius * 1.5;
            } else {
                this.radius = this.baseRadius;
            }
        } else {
            this.radius = this.baseRadius;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
        ctx.fill();
    }
}

for (let i = 0; i < 70; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ACCIÓN CLAVE DE INTERACCIÓN INICIAL
function startExperience() {
    initAudio().then(() => {
        if(typeof speechSynthesis !== 'undefined') window._rbotUnlocked = true;
        if(typeof rbotNarrate === 'function') window._rbotScreenOverride = true;
        goToScreen('screen-pasos');
    });
}

// TRANSICIÓN CON INTERFERENCIAS GLITCH EN LA PANTALLA
function triggerGlitchEffect(callback) {
    const viewport = document.getElementById('main-viewport');
    viewport.classList.add('glitch-active');
    playSynthSound(100, 300, 0.2, 'sawtooth', 0.05);
    
    setTimeout(() => {
        viewport.classList.remove('glitch-active');
        if (callback) callback();
    }, 200);
}

// NAVEGACIÓN
function goToScreen(screenId) {
    triggerGlitchEffect(() => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
        
        updateAmbientSound();
        if(typeof rbotNarrate==='function') setTimeout(()=>rbotNarrate(screenId),500);

        const viewport = document.getElementById('main-viewport');
        if (screenId === 'screen-resultado') {
            viewport.classList.add('alert-mode');
        } else {
            viewport.classList.remove('alert-mode');
        }
        
        updateFooter();
    });
}

function updateFooter() {
    const btnLeft = document.getElementById('footer-btn-left');
    const btnRight = document.getElementById('footer-btn-right');

    if (currentScreen === 'screen-inicio') {
        btnLeft.style.display = 'none';
        btnRight.innerText = 'Entrar al Museo ➔';
        btnRight.setAttribute('onclick', "startExperience()");
    } else if (currentScreen === 'screen-pasos') {
        btnLeft.style.display = 'inline-block';
        btnLeft.innerText = '⇤ Inicio';
        btnLeft.setAttribute('onclick', "goToScreen('screen-inicio')");
        btnRight.style.display = 'inline-block';
        btnRight.innerText = 'Ir al Museo ➔';
        btnRight.setAttribute('onclick', "goToScreen('screen-museo')");
    } else if (currentScreen === 'screen-museo') {
        btnLeft.style.display = 'inline-block';
        btnLeft.innerText = '⇤ Inicio';
        btnLeft.setAttribute('onclick', "goToScreen('screen-inicio')");
        
        btnRight.style.display = 'inline-block';
        btnRight.innerText = 'Ir a Entrevista IA ➔';
        btnRight.setAttribute('onclick', "goToScreen('screen-entrevista')");
    } else if (currentScreen === 'screen-entrevista') {
        btnLeft.style.display = 'inline-block';
        btnLeft.innerText = '⇤ Volver al Museo';
        btnLeft.setAttribute('onclick', "goToScreen('screen-museo')");
        
        btnRight.style.display = 'none';
    } else if (currentScreen === 'screen-resultado') {
        btnLeft.style.display = 'none';
        btnRight.style.display = 'inline-block';
        btnRight.innerText = 'Reiniciar Recorrido';
        btnRight.setAttribute('onclick', 'resetProject()');
    }
}

function handleFooterLeft() {}
function handleFooterRight() {}

// AGREGAR HOVER AUDIO A BOTONES Y TARJETAS
document.querySelectorAll('.card-profesion, .cyber-btn, .select-item-btn, .btn-close-expediente, .btn-console-verdict').forEach(elem => {
    elem.addEventListener('mouseenter', soundHover);
});

// Inicializar volumen y contexto al primer click del cuerpo en caso extremo
window.addEventListener('click', () => {
    initAudio();
    if(!window._rbotMusicCtxUnlocked) {
        window._rbotMusicCtxUnlocked = true;
        try {
            const tmpCtx = new (window.AudioContext || window.webkitAudioContext)();
            tmpCtx.resume().then(()=>{ tmpCtx.close(); });
        } catch(e){}
    }
}, { once: true });