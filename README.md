<div align="center">

# ⌥ Tradux
### Compilador Traductor EN ↔ ES

*Compilar. Analizar. Traducir.*

[![Demo](https://img.shields.io/badge/▶_Demo_en_vivo-4f8ef7?style=for-the-badge)](traduxx.netlify.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://dansosa18.github.io/Tradux/)
[![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://dansosa18.github.io/Tradux/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=for-the-badge&logo=github&logoColor=white)](https://dansosa18.github.io/Tradux/)

</div>

---

## ¿Qué es Tradux?

**Tradux** es un compilador traductor que analiza, clasifica y traduce oraciones entre inglés y español, aplicando los principios fundamentales de la construcción de compiladores: análisis léxico, sintáctico y semántico, con una interfaz moderna y soporte para voz.

---

## ✨ Funcionalidades

| # | Funcionalidad | Descripción |
|---|---|---|
| 🔤 | **Análisis Léxico** | Tokenización y clasificación de palabras (sustantivo, verbo, adjetivo, etc.) con stemming EN/ES |
| 🌳 | **Análisis Sintáctico** | Árbol de derivación con reglas BNF formales |
| 🧠 | **Análisis Semántico** | Tabla de símbolos con traducción y clasificación completa |
| 🌐 | **Traducción EN ↔ ES** | Traducción bidireccional vía API MyMemory |
| 🤖 | **Clasificación Inteligente** | Palabras desconocidas clasificadas por patrones lingüísticos |
| 🎤 | **Reconocimiento de Voz** | Dictado de texto en inglés o español vía Web Speech API |
| 🔊 | **Síntesis de Voz** | Lectura en voz alta de la traducción generada |
| 📂 | **Carga de Archivos** | Soporte para archivos `.txt` |
| 📱 | **Diseño Responsive** | Interfaz adaptada para móvil y escritorio con navbar deslizable |

---

## 🏗️ Arquitectura del Compilador

```
┌─────────────────────────────────────────────────────┐
│                  Texto de entrada                    │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  1. ANALIZADOR LÉXICO              [lexer.js]        │
│     → Tokenización                                   │
│     → Stemming EN/ES                                 │
│     → Clasificación por patrones lingüísticos        │
└────────────────────────┬────────────────────────────┘
                         │  tokens[]
                         ▼
┌─────────────────────────────────────────────────────┐
│  2. ANALIZADOR SINTÁCTICO          [parser.js]       │
│     → Árbol de derivación                            │
│     → Reglas BNF                                     │
└────────────────────────┬────────────────────────────┘
                         │  tree, bnf
                         ▼
┌─────────────────────────────────────────────────────┐
│  3. ANALIZADOR SEMÁNTICO           [semantic.js]     │
│     → Tabla de símbolos                              │
│     → Validación de traducciones                     │
└────────────────────────┬────────────────────────────┘
                         │  symbols[]
                         ▼
┌─────────────────────────────────────────────────────┐
│  4. TRADUCCIÓN + VOZ               [app.js]          │
│     → MyMemory API                                   │
│     → Web Speech API (reconocimiento + síntesis)     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
Tradux/
├── 📄 index.html          → Interfaz principal
├── 📁 css/
│   └── 🎨 styles.css      → Estilos dark mode + responsive
├── 📁 js/
│   ├── 📖 dictionary.js   → Diccionario EN ↔ ES
│   ├── 🔤 lexer.js        → Analizador léxico + stemmer
│   ├── 🌳 parser.js       → Analizador sintáctico + BNF
│   ├── 🧠 semantic.js     → Analizador semántico
│   └── ⚙️  app.js         → Controlador principal + APIs
└── 📝 README.md
```

---

## 🚀 Cómo Usar

### En línea
Visita directamente desde cualquier navegador:

**[👉 traduxx.netlify.app](traduxx.netlify.app)**

### Localmente
```bash
# 1. Clonar el repositorio
git clone https://github.com/Dansosa18/Tradux.git

# 2. Entrar a la carpeta
cd Tradux

# 3. Abrir con Live Server en VS Code
# Click derecho en index.html → Open with Live Server
```

> ⚠️ El reconocimiento de voz requiere Chrome o Safari y conexión HTTPS.

---

## 🛠️ Tecnologías

<div align="center">

| Tecnología | Uso |
|---|---|
| HTML5 / CSS3 / JavaScript | Base del compilador e interfaz |
| Web Speech API | Reconocimiento y síntesis de voz |
| MyMemory API | Traducción en línea |
| GitHub Pages | Hosting gratuito con HTTPS |

</div>

---

## 👥 Equipo de Desarrollo

<div align="center">

| 👤 | Integrante | Rol |
|---|---|---|
| 🔵 | **Daniel** | Arquitectura principal · Lexer · Parser · Semántico · UI/UX · APIs de voz |
| 🟣 | **Oliver** | Ampliación de diccionario · Pruebas funcionales |
| 🟢 | **Byron** | Mejoras al analizador léxico · Stemming |
| 🟡 | **Kevin** | Reglas BNF · Correcciones · Árbol sintáctico |

</div>

---

<div align="center">

## 🎓 Universidad Mariano Gálvez de Guatemala

**Curso:** Compiladores &nbsp;|&nbsp; **Campus:** Jutiapa &nbsp;|&nbsp; **Año:** 2026

---

**⌥ Tradux** — *Compilar. Analizar. Traducir.*

</div>