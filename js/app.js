// =============================================
// TRADUX — app.js
// Controlador principal de la interfaz
// Autor del commit: Daniel
// =============================================

let currentInputLang = 'EN';

// --- Navegación entre paneles ---
function showPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  const names = ['translator','tokens','symbols','errors','tree'];
  document.querySelectorAll('.nav-btn')[names.indexOf(name)].classList.add('active');
}

// --- Configurar idioma de entrada ---
function setLang(lang) {
  currentInputLang = lang;
  updateLangLabels();
}

function updateLangLabels() {
  if (currentInputLang === 'EN') {
    document.getElementById('input-lang-label').textContent  = '🇺🇸 Inglés (Entrada)';
    document.getElementById('output-lang-label').textContent = '🇬🇹 Español (Traducción)';
    document.getElementById('btn-en').classList.add('active');
    document.getElementById('btn-es').classList.remove('active');
  } else {
    document.getElementById('input-lang-label').textContent  = '🇬🇹 Español (Entrada)';
    document.getElementById('output-lang-label').textContent = '🇺🇸 Inglés (Traducción)';
    document.getElementById('btn-es').classList.add('active');
    document.getElementById('btn-en').classList.remove('active');
  }
}

// --- Intercambiar idiomas ---
function swapLangs() {
  const inputBox  = document.getElementById('input-text');
  const outputBox = document.getElementById('output-text');
  const outputText = outputBox.innerText.trim();
  if (outputText && outputText !== 'La traducción aparecerá aquí...') {
    inputBox.value = outputText;
    outputBox.innerHTML = '<span class="placeholder-text">La traducción aparecerá aquí...</span>';
  }
  currentInputLang = (currentInputLang === 'EN') ? 'ES' : 'EN';
  updateLangLabels();
  updateCharCount();
}

// --- Contador de caracteres ---
function updateCharCount() {
  const len = document.getElementById('input-text').value.length;
  document.getElementById('char-count').textContent = len + ' caracteres';
}

// --- Cargar archivo .txt ---
function loadFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('input-text').value = e.target.result;
    updateCharCount();
  };
  reader.readAsText(file);
}

// --- Copiar traducción ---
function copyOutput() {
  const text = document.getElementById('output-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = '✓ Copiado';
    setTimeout(() => btn.textContent = '⎘ Copiar', 1500);
  });
}

// --- Limpiar todo ---
function clearAll() {
  document.getElementById('input-text').value = '';
  document.getElementById('output-text').innerHTML =
    '<span class="placeholder-text">La traducción aparecerá aquí...</span>';
  document.getElementById('token-body').innerHTML  =
    '<tr><td colspan="5" class="empty-row">Ejecuta el compilador primero.</td></tr>';
  document.getElementById('symbol-body').innerHTML =
    '<tr><td colspan="6" class="empty-row">Ejecuta el compilador primero.</td></tr>';
  document.getElementById('error-body').innerHTML  =
    '<tr><td colspan="5" class="empty-row">No hay errores registrados.</td></tr>';
  document.getElementById('tree-container').innerHTML =
    '<p class="placeholder-text">Ejecuta el compilador primero para ver el árbol.</p>';
  document.getElementById('bnf-display').textContent =
    'Las reglas BNF aparecerán aquí...';
  updateCharCount();
  resetIndicators();
  setStatus('Listo para compilar.');
}

// --- Indicadores ---
function resetIndicators() {
  ['ind-lex','ind-syn','ind-sem'].forEach(id => {
    document.getElementById(id).classList.remove('ok','err');
  });
}
function setIndicator(id, status) {
  const el = document.getElementById(id);
  el.classList.remove('ok','err');
  el.classList.add(status);
}
function setStatus(msg) {
  document.getElementById('status-msg').textContent = msg;
}

// =============================================
// API DE TRADUCCIÓN — MyMemory
// =============================================
async function translateWithAPI(text, lang) {
  const langpair = lang === 'EN' ? 'en|es' : 'es|en';
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error de red');
    const data = await response.json();
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      throw new Error('API no respondió correctamente');
    }
  } catch (error) {
    console.error('Error con MyMemory API:', error);
    return null;
  }
}

// =============================================
// COMPILAR — función principal (async)
// =============================================
async function compile() {
  const text = document.getElementById('input-text').value.trim();
  if (!text) {
    setStatus('⚠ Ingresa texto para compilar.');
    return;
  }

  const btn = document.querySelector('.compile-btn');
  btn.textContent = '⏳ Compilando...';
  btn.disabled = true;

  resetIndicators();

  // 1. ANÁLISIS LÉXICO 
  const lexResult = lexicalAnalysis(text, currentInputLang);
  setIndicator('ind-lex', lexResult.errors.length === 0 ? 'ok' : 'err');
  renderTokenTable(lexResult.tokens);

  // 2. ANÁLISIS SINTÁCTICO
  setStatus('Ejecutando análisis sintáctico...');
  const synResult = syntacticAnalysis(lexResult.tokens, currentInputLang);
  setIndicator('ind-syn', synResult.errors.length === 0 ? 'ok' : 'err');
  renderTree(synResult.tree, synResult.bnf);

  // 3. ANÁLISIS SEMÁNTICO
  setStatus('Ejecutando análisis semántico...');
  const semResult = semanticAnalysis(lexResult.tokens, currentInputLang);
  setIndicator('ind-sem', semResult.errors.length === 0 ? 'ok' : 'err');
  renderSymbolTable(semResult.symbols);

  // 4. TABLA DE ERRORES
  const allErrors = [
    ...lexResult.errors.map(e => ({...e, type: 'Léxico'})),
    ...synResult.errors.map(e => ({...e, type: 'Sintáctico'})),
    ...semResult.errors.map(e => ({...e, type: 'Semántico'}))
  ];
  renderErrorTable(allErrors);

  // 5. TRADUCCIÓN CON API MyMemory
  setStatus('Traduciendo con MyMemory API...');
  document.getElementById('output-text').innerHTML =
    '<span class="placeholder-text">⏳ Traduciendo...</span>';

  const apiTranslation = await translateWithAPI(text, currentInputLang);

  if (apiTranslation) {
    document.getElementById('output-text').textContent = apiTranslation;
    if (allErrors.length === 0) {
      setStatus('✓ Compilación exitosa — sin errores detectados.');
    } else {
      setStatus(`⚠ Compilación con ${allErrors.length} advertencia(s). Traducción completada.`);
    }
  } else {
    const fallback = translate(lexResult.tokens, currentInputLang);
    document.getElementById('output-text').textContent = fallback;
    setStatus('⚠ API no disponible — usando traducción del diccionario.');
  }

  btn.textContent = '▶ Compilar';
  btn.disabled = false;
}

// =============================================
// RENDER — tablas
// =============================================

function getBadgeClass(type) {
  const map = {
    'Sustantivo':  'sustantivo',
    'Verbo':       'verbo',
    'Adjetivo':    'adjetivo',
    'Adverbio':    'adverbio',
    'Preposición': 'preposicion',
    'Artículo':    'articulo',
    'Pronombre':   'pronombre',
    'Puntuación':  'puntuacion',
    'Conjunción':  'verbo',
    'Interjección':'adverbio',
    'Desconocido': 'error',
  };
  return 'badge badge-' + (map[type] || 'default');
}

function renderTokenTable(tokens) {
  const tbody = document.getElementById('token-body');
  if (!tokens.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-row">No se identificaron tokens.</td></tr>';
    return;
  }
  tbody.innerHTML = tokens.map((t, i) => `
    <tr class="${t.classifiedByAI ? 'ai-classified' : ''}">
      <td>${i + 1}</td>
      <td><span class="${getBadgeClass(t.type)}">${t.type.toUpperCase()}</span></td>
      <td>${t.lexeme}</td>
      <td>${t.subtype || t.type}</td>
      <td>${t.line}</td>
    </tr>
  `).join('');
}

function renderSymbolTable(symbols) {
  const tbody = document.getElementById('symbol-body');
  if (!symbols.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-row">No hay símbolos.</td></tr>';
    return;
  }
  tbody.innerHTML = symbols.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${s.original}</td>
      <td>${s.translation || '—'}</td>
      <td><span class="${getBadgeClass(s.type)}">${s.type}</span></td>
      <td>${s.subtype || '—'}</td>
      <td>${s.line}</td>
    </tr>
  `).join('');
}

function renderErrorTable(errors) {
  const tbody = document.getElementById('error-body');
  if (!errors.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-row">✓ No hay errores.</td></tr>';
    return;
  }
  const classMap = { 'Léxico': 'err-lex', 'Sintáctico': 'err-sin', 'Semántico': 'err-sem' };
  tbody.innerHTML = errors.map((e, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><span class="badge ${classMap[e.type] || ''}">${e.type}</span></td>
      <td>${e.word || '—'}</td>
      <td>${e.line}</td>
      <td>${e.description}</td>
    </tr>
  `).join('');
}

function renderTree(tree, bnf) {
  const pre = document.createElement('pre');
  pre.className = 'tree-node-root';
  pre.textContent = tree;
  const container = document.getElementById('tree-container');
  container.innerHTML = '';
  container.appendChild(pre);
  document.getElementById('bnf-display').textContent = bnf;
}

// =============================================
// RECONOCIMIENTO DE VOZ — Web Speech API
// =============================================
let recognition = null;
let isListening = false;

function toggleVoice() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome u Opera.');
    return;
  }

  if (isListening) {
    recognition.stop();
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  // Usar el idioma seleccionado en Tradux
  recognition.lang = currentInputLang === 'EN' ? 'en-US' : 'es-GT';
  recognition.continuous     = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening = true;
    document.getElementById('mic-btn').textContent = '🔴';
    document.getElementById('mic-btn').title = 'Escuchando... (click para detener)';
    setStatus('🎤 Escuchando...');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('input-text').value = transcript;
    updateCharCount();
    setStatus(`✓ Voz capturada: "${transcript}"`);
  };

  recognition.onerror = (event) => {
    setStatus(`⚠ Error de voz: ${event.error}`);
  };

  recognition.onend = () => {
    isListening = false;
    document.getElementById('mic-btn').textContent = '🎤';
    document.getElementById('mic-btn').title = 'Reconocimiento de voz';
  };

  recognition.start();
}