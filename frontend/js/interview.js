/* ================================================================
   interview.js — Evaluación de automatización y pantalla de resultados
   ================================================================ */

// SELECCIÓN DE PROFESIÓN (PANTALLA 3)
let _analysisRunning = false;

function getTaskText(status) {
    return ({ auto: '\u2713 AUTOMATIZABLE', partial: '\u26A0 PARCIALMENTE AUTOMATIZABLE', human: '\u2717 REQUIERE INTERVENCI\u00D3N HUMANA' })[status] || status;
}

function selectProfession(profId) {
    soundHover();
    selectedProfession = profId;

    document.querySelectorAll('.select-item-btn').forEach(b => b.classList.remove('selected'));
    const target = document.getElementById('btn-sel-' + profId);
    if (target) target.classList.add('selected');

    document.getElementById('btn-start-evaluation').style.display = 'block';
    document.getElementById('btn-console-verdict').style.display = 'none';

    const logsDiv = document.getElementById('analysis-logs');
    logsDiv.innerHTML = '<div style="color: var(--neon-blue); font-style: italic;">Perfil de red cargado. Listo para auditoría heurística de procesos. Presione "Iniciar Evaluación".</div>';
    document.getElementById('console-status').style.display = 'none';
}

// SIMULACIÓN DE ESCANEO DE ENTREVISTA IA
function startAiAnalysis() {
    if (!selectedProfession || _analysisRunning) return;

    const dataProfesion = dbTareas[selectedProfession];
    if (!dataProfesion) return;

    _analysisRunning = true;
    soundBlip();
    document.querySelectorAll('.select-item-btn').forEach(b => b.disabled = true);
    document.getElementById('btn-start-evaluation').style.display = 'none';
    document.getElementById('btn-console-verdict').style.display = 'none';

    const logsDiv = document.getElementById('analysis-logs');
    const statusDiv = document.getElementById('console-status');
    const scanner = document.getElementById('console-scanner');

    logsDiv.innerHTML = '';
    statusDiv.style.display = 'block';
    statusDiv.innerText = 'ANALIZANDO FUNCIONES...';
    scanner.style.display = 'block';

    const tareas = dataProfesion.tasks;
    let i = 0;

    function printNextTask() {
        if (!_analysisRunning) return;
        if (i < tareas.length) {
            const task = tareas[i];
            const badgeClass = 'badge-' + task.status;

            soundScanRow();

            const logRow = document.createElement('div');
            logRow.className = 'log-row';
            logRow.style.animationDelay = `${i * 0.05}s`;
            logRow.innerHTML = `
                <span class="task-name">${task.name}</span>
                <span class="status-badge ${badgeClass}">${getTaskText(task.status)}</span>
            `;
            logsDiv.appendChild(logRow);
            logsDiv.scrollTop = logsDiv.scrollHeight;

            i++;
            setTimeout(printNextTask, 1100);
        } else {
            setTimeout(() => {
                if (!_analysisRunning) return;
                statusDiv.innerText = 'COMPILANDO VECTORES DE RENDIMIENTO...';
                playSynthSound(300, 600, 0.4, 'triangle', 0.1);

                setTimeout(() => {
                    if (!_analysisRunning) return;
                    const calcRow1 = document.createElement('div');
                    calcRow1.className = 'log-row';
                    calcRow1.style.marginTop = '15px';
                    calcRow1.style.borderTop = '1px dashed rgba(0, 240, 255, 0.2)';
                    calcRow1.style.paddingTop = '10px';
                    calcRow1.innerHTML = `
                        <span style="color: var(--neon-blue); font-weight: bold;">[CÁLCULO TERMINADO] Índice de redundancia:</span>
                        <span style="color: var(--neon-pink); font-weight: bold; font-size: 16px;">${dataProfesion.percentage}</span>
                    `;
                    logsDiv.appendChild(calcRow1);

                    setTimeout(() => {
                        if (!_analysisRunning) return;
                        const calcRow2 = document.createElement('div');
                        calcRow2.className = 'log-row';
                        calcRow2.innerHTML = `
                            <span style="color: var(--neon-red); font-weight: bold;">[DECISIÓN DE IA]:</span>
                            <span style="color: var(--neon-red); font-weight: bold; text-transform: uppercase;">RECHAZO DE SOLICITUD</span>
                        `;
                        logsDiv.appendChild(calcRow2);
                        logsDiv.scrollTop = logsDiv.scrollHeight;

                        soundAlarm();
                        scanner.style.display = 'none';
                        statusDiv.innerText = 'PROCESO COMPLETADO';

                        if(typeof rbotNarrate==='function' && typeof speak==='function'){
                            const pct = dataProfesion.percentage;
                            const nom = dataProfesion.nombre.charAt(0)+dataProfesion.nombre.slice(1).toLowerCase();
                            setTimeout(()=>{
                                const msg = "Análisis completado para "+nom+". El índice de redundancia calculado es del "+pct.replace('%',' por ciento')+". Accede al informe de exclusión para ver el veredicto completo.";
                                if(typeof showBubble==='function') showBubble(msg);
                                speak(msg);
                            }, 600);
                        }

                        document.getElementById('btn-console-verdict').style.display = 'block';
                        _analysisRunning = false;
                    }, 1000);

                }, 1200);
            }, 800);
        }
    }

    setTimeout(printNextTask, 1200);
}

// TRANSICIÓN FINAL AL INFORME
function transicionAFinal() {
    _analysisRunning = false;
    soundBlip();
    document.querySelectorAll('.select-item-btn').forEach(b => b.disabled = false);
    document.getElementById('btn-start-evaluation').disabled = false;
    cargarResultadosDinamicos();
    goToScreen('screen-resultado');
}

// FUNCIÓN PARA CARGAR LOS RESULTADOS ESPECÍFICOS Y COMPORTAMIENTO DINÁMICO EN PANTALLA 4
function cargarResultadosDinamicos() {
    const dataProfesion = dbTareas[selectedProfession];
    if (!dataProfesion) return;

    document.getElementById('res-percentage-val').innerText = dataProfesion.percentage;
    document.getElementById('reporte-nombre-profesion').innerText = `REPORTE DE AUDITORÍA: ${dataProfesion.nombre}`;

    const breakdownContainer = document.getElementById('result-breakdown-logs');
    breakdownContainer.innerHTML = '';

    dataProfesion.tasks.forEach((task, idx) => {
        const badgeClass = 'badge-' + task.status;

        const logRow = document.createElement('div');
        logRow.className = 'log-row';
        logRow.style.animationDelay = `${idx * 0.05}s`;
        logRow.innerHTML = `
            <span class="task-name">${task.name}</span>
            <span class="status-badge ${badgeClass}">${getTaskText(task.status)}</span>
        `;
        breakdownContainer.appendChild(logRow);
    });
}

// REINICIAR Y VOLVER DIRECTAMENTE A LA PANTALLA DE EVALUACIÓN (PANTALLA 3)
function resetProject() {
    _analysisRunning = false;
    selectedProfession = '';
    document.querySelectorAll('.select-item-btn').forEach(b => {
        b.classList.remove('selected');
        b.disabled = false;
    });
    document.getElementById('btn-start-evaluation').style.display = 'none';
    document.getElementById('btn-start-evaluation').disabled = false;
    document.getElementById('btn-console-verdict').style.display = 'none';
    document.getElementById('analysis-logs').innerHTML = '<div style="color: #64748b; font-style: italic;">Esperando selección de perfil laboral para iniciar descomposición y escaneo...</div>';
    document.getElementById('console-status').style.display = 'none';
    document.getElementById('console-scanner').style.display = 'none';

    goToScreen('screen-entrevista');
}