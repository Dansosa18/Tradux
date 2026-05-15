// =============================================
// TRADUX — dictionary.js
// Diccionario bilingüe Inglés ↔ Español
// Autor del commit: Oliver
// =============================================

const DICTIONARY = {

  // ==========================================
  // SUSTANTIVOS
  // ==========================================
  nouns: {
    EN_ES: {
      "house":     { es: "casa",          subtype: "común" },
      "car":       { es: "carro",         subtype: "común" },
      "dog":       { es: "perro",         subtype: "común" },
      "cat":       { es: "gato",          subtype: "común" },
      "book":      { es: "libro",         subtype: "común" },
      "man":       { es: "hombre",        subtype: "común" },
      "woman":     { es: "mujer",         subtype: "común" },
      "child":     { es: "niño",          subtype: "común" },
      "city":      { es: "ciudad",        subtype: "común" },
      "country":   { es: "país",          subtype: "común" },
      "school":    { es: "escuela",       subtype: "común" },
      "teacher":   { es: "maestro",       subtype: "común" },
      "student":   { es: "estudiante",    subtype: "común" },
      "friend":    { es: "amigo",         subtype: "común" },
      "family":    { es: "familia",       subtype: "común" },
      "time":      { es: "tiempo",        subtype: "común" },
      "day":       { es: "día",           subtype: "común" },
      "night":     { es: "noche",         subtype: "común" },
      "water":     { es: "agua",          subtype: "común" },
      "food":      { es: "comida",        subtype: "común" },
      "work":      { es: "trabajo",       subtype: "común" },
      "life":      { es: "vida",          subtype: "común" },
      "world":     { es: "mundo",         subtype: "común" },
      "hand":      { es: "mano",          subtype: "común" },
      "eye":       { es: "ojo",           subtype: "común" },
      "door":      { es: "puerta",        subtype: "común" },
      "window":    { es: "ventana",       subtype: "común" },
      "table":     { es: "mesa",          subtype: "común" },
      "chair":     { es: "silla",         subtype: "común" },
      "phone":     { es: "teléfono",      subtype: "común" },
      "computer":  { es: "computadora",   subtype: "común" },
      "language":  { es: "idioma",        subtype: "común" },
      "word":      { es: "palabra",       subtype: "común" },
      "sentence":  { es: "oración",       subtype: "común" },
      "love":      { es: "amor",          subtype: "abstracto" },
      "peace":     { es: "paz",           subtype: "abstracto" },
      "happiness": { es: "felicidad",     subtype: "abstracto" },
      "truth":     { es: "verdad",        subtype: "abstracto" },
      "knowledge": { es: "conocimiento",  subtype: "abstracto" },
      "mother":    { es: "madre",         subtype: "común" },
      "father":    { es: "padre",         subtype: "común" },
      "brother":   { es: "hermano",       subtype: "común" },
      "sister":    { es: "hermana",       subtype: "común" },
      "sun":       { es: "sol",           subtype: "común" },
      "moon":      { es: "luna",          subtype: "común" },
      "tree":      { es: "árbol",         subtype: "común" },
      "flower":    { es: "flor",          subtype: "común" },
      "road":      { es: "camino",        subtype: "común" },
      "money":     { es: "dinero",        subtype: "común" },
      "heart":     { es: "corazón",       subtype: "común" },
      "music":     { es: "música",        subtype: "común" },
    },
    ES_EN: {
      "casa":         { en: "house",       subtype: "común" },
      "carro":        { en: "car",         subtype: "común" },
      "perro":        { en: "dog",         subtype: "común" },
      "gato":         { en: "cat",         subtype: "común" },
      "libro":        { en: "book",        subtype: "común" },
      "hombre":       { en: "man",         subtype: "común" },
      "mujer":        { en: "woman",       subtype: "común" },
      "niño":         { en: "child",       subtype: "común" },
      "ciudad":       { en: "city",        subtype: "común" },
      "país":         { en: "country",     subtype: "común" },
      "escuela":      { en: "school",      subtype: "común" },
      "maestro":      { en: "teacher",     subtype: "común" },
      "estudiante":   { en: "student",     subtype: "común" },
      "amigo":        { en: "friend",      subtype: "común" },
      "familia":      { en: "family",      subtype: "común" },
      "tiempo":       { en: "time",        subtype: "común" },
      "día":          { en: "day",         subtype: "común" },
      "noche":        { en: "night",       subtype: "común" },
      "agua":         { en: "water",       subtype: "común" },
      "comida":       { en: "food",        subtype: "común" },
      "trabajo":      { en: "work",        subtype: "común" },
      "vida":         { en: "life",        subtype: "común" },
      "mundo":        { en: "world",       subtype: "común" },
      "mano":         { en: "hand",        subtype: "común" },
      "ojo":          { en: "eye",         subtype: "común" },
      "puerta":       { en: "door",        subtype: "común" },
      "ventana":      { en: "window",      subtype: "común" },
      "mesa":         { en: "table",       subtype: "común" },
      "silla":        { en: "chair",       subtype: "común" },
      "teléfono":     { en: "phone",       subtype: "común" },
      "computadora":  { en: "computer",    subtype: "común" },
      "idioma":       { en: "language",    subtype: "común" },
      "palabra":      { en: "word",        subtype: "común" },
      "oración":      { en: "sentence",    subtype: "común" },
      "amor":         { en: "love",        subtype: "abstracto" },
      "paz":          { en: "peace",       subtype: "abstracto" },
      "felicidad":    { en: "happiness",   subtype: "abstracto" },
      "verdad":       { en: "truth",       subtype: "abstracto" },
      "conocimiento": { en: "knowledge",   subtype: "abstracto" },
      "madre":        { en: "mother",      subtype: "común" },
      "padre":        { en: "father",      subtype: "común" },
      "hermano":      { en: "brother",     subtype: "común" },
      "hermana":      { en: "sister",      subtype: "común" },
      "sol":          { en: "sun",         subtype: "común" },
      "luna":         { en: "moon",        subtype: "común" },
      "árbol":        { en: "tree",        subtype: "común" },
      "flor":         { en: "flower",      subtype: "común" },
      "camino":       { en: "road",        subtype: "común" },
      "dinero":       { en: "money",       subtype: "común" },
      "corazón":      { en: "heart",       subtype: "común" },
      "música":       { en: "music",       subtype: "común" },
    }
  },

  // ==========================================
  // VERBOS
  // ==========================================
  verbs: {
    EN_ES: {
      "is":      { es: "es/está",       subtype: "cópula" },
      "are":     { es: "son/están",     subtype: "cópula" },
      "was":     { es: "era/estaba",    subtype: "cópula" },
      "be":      { es: "ser/estar",     subtype: "cópula" },
      "have":    { es: "tener",         subtype: "auxiliar" },
      "has":     { es: "tiene",         subtype: "auxiliar" },
      "do":      { es: "hacer",         subtype: "auxiliar" },
      "does":    { es: "hace",          subtype: "auxiliar" },
      "go":      { es: "ir",            subtype: "movimiento" },
      "goes":    { es: "va",            subtype: "movimiento" },
      "come":    { es: "venir",         subtype: "movimiento" },
      "run":     { es: "correr",        subtype: "movimiento" },
      "walk":    { es: "caminar",       subtype: "movimiento" },
      "eat":     { es: "comer",         subtype: "acción" },
      "drink":   { es: "beber",         subtype: "acción" },
      "sleep":   { es: "dormir",        subtype: "acción" },
      "read":    { es: "leer",          subtype: "acción" },
      "write":   { es: "escribir",      subtype: "acción" },
      "speak":   { es: "hablar",        subtype: "acción" },
      "talk":    { es: "hablar",        subtype: "acción" },
      "listen":  { es: "escuchar",      subtype: "acción" },
      "see":     { es: "ver",           subtype: "percepción" },
      "look":    { es: "mirar",         subtype: "percepción" },
      "hear":    { es: "oír",           subtype: "percepción" },
      "know":    { es: "saber/conocer", subtype: "mental" },
      "think":   { es: "pensar",        subtype: "mental" },
      "want":    { es: "querer",        subtype: "mental" },
      "need":    { es: "necesitar",     subtype: "mental" },
      "like":    { es: "gustar",        subtype: "mental" },
      "love":    { es: "amar",          subtype: "mental" },
      "work":    { es: "trabajar",      subtype: "acción" },
      "study":   { es: "estudiar",      subtype: "acción" },
      "play":    { es: "jugar",         subtype: "acción" },
      "help":    { es: "ayudar",        subtype: "acción" },
      "live":    { es: "vivir",         subtype: "estado" },
      "can":     { es: "puede/poder",   subtype: "modal" },
      "will":    { es: "va a/futuro",   subtype: "modal" },
      "would":   { es: "podría",        subtype: "modal" },
      "should":  { es: "debería",       subtype: "modal" },
      "must":    { es: "debe",          subtype: "modal" },
      "say":     { es: "decir",         subtype: "acción" },
      "said":    { es: "dijo",          subtype: "acción" },
      "give":    { es: "dar",           subtype: "acción" },
      "take":    { es: "tomar",         subtype: "acción" },
      "make":    { es: "hacer",         subtype: "acción" },
    },
    ES_EN: {
      "es":        { en: "is",           subtype: "cópula" },
      "está":      { en: "is",           subtype: "cópula" },
      "son":       { en: "are",          subtype: "cópula" },
      "están":     { en: "are",          subtype: "cópula" },
      "era":       { en: "was",          subtype: "cópula" },
      "ser":       { en: "to be",        subtype: "cópula" },
      "estar":     { en: "to be",        subtype: "cópula" },
      "tener":     { en: "to have",      subtype: "auxiliar" },
      "tiene":     { en: "has",          subtype: "auxiliar" },
      "hacer":     { en: "to do/make",   subtype: "acción" },
      "ir":        { en: "to go",        subtype: "movimiento" },
      "va":        { en: "goes",         subtype: "movimiento" },
      "venir":     { en: "to come",      subtype: "movimiento" },
      "correr":    { en: "to run",       subtype: "movimiento" },
      "caminar":   { en: "to walk",      subtype: "movimiento" },
      "comer":     { en: "to eat",       subtype: "acción" },
      "beber":     { en: "to drink",     subtype: "acción" },
      "dormir":    { en: "to sleep",     subtype: "acción" },
      "leer":      { en: "to read",      subtype: "acción" },
      "escribir":  { en: "to write",     subtype: "acción" },
      "hablar":    { en: "to speak",     subtype: "acción" },
      "escuchar":  { en: "to listen",    subtype: "acción" },
      "ver":       { en: "to see",       subtype: "percepción" },
      "mirar":     { en: "to look",      subtype: "percepción" },
      "oír":       { en: "to hear",      subtype: "percepción" },
      "saber":     { en: "to know",      subtype: "mental" },
      "conocer":   { en: "to know",      subtype: "mental" },
      "pensar":    { en: "to think",     subtype: "mental" },
      "querer":    { en: "to want",      subtype: "mental" },
      "necesitar": { en: "to need",      subtype: "mental" },
      "gustar":    { en: "to like",      subtype: "mental" },
      "amar":      { en: "to love",      subtype: "mental" },
      "trabajar":  { en: "to work",      subtype: "acción" },
      "estudiar":  { en: "to study",     subtype: "acción" },
      "jugar":     { en: "to play",      subtype: "acción" },
      "ayudar":    { en: "to help",      subtype: "acción" },
      "vivir":     { en: "to live",      subtype: "estado" },
      "puede":     { en: "can",          subtype: "modal" },
      "poder":     { en: "can",          subtype: "modal" },
      "decir":     { en: "to say",       subtype: "acción" },
      "dijo":      { en: "said",         subtype: "acción" },
      "dar":       { en: "to give",      subtype: "acción" },
      "tomar":     { en: "to take",      subtype: "acción" },
    }
  },

  // ==========================================
  // ADJETIVOS
  // ==========================================
  adjectives: {
    EN_ES: {
      "big":       { es: "grande",       subtype: "calificativo" },
      "small":     { es: "pequeño",      subtype: "calificativo" },
      "good":      { es: "bueno",        subtype: "calificativo" },
      "bad":       { es: "malo",         subtype: "calificativo" },
      "new":       { es: "nuevo",        subtype: "calificativo" },
      "old":       { es: "viejo",        subtype: "calificativo" },
      "happy":     { es: "feliz",        subtype: "calificativo" },
      "sad":       { es: "triste",       subtype: "calificativo" },
      "beautiful": { es: "hermoso",      subtype: "calificativo" },
      "ugly":      { es: "feo",          subtype: "calificativo" },
      "fast":      { es: "rápido",       subtype: "calificativo" },
      "slow":      { es: "lento",        subtype: "calificativo" },
      "hot":       { es: "caliente",     subtype: "calificativo" },
      "cold":      { es: "frío",         subtype: "calificativo" },
      "tall":      { es: "alto",         subtype: "calificativo" },
      "short":     { es: "bajo/corto",   subtype: "calificativo" },
      "long":      { es: "largo",        subtype: "calificativo" },
      "hard":      { es: "duro/difícil", subtype: "calificativo" },
      "easy":      { es: "fácil",        subtype: "calificativo" },
      "important": { es: "importante",   subtype: "calificativo" },
      "true":      { es: "verdadero",    subtype: "calificativo" },
      "false":     { es: "falso",        subtype: "calificativo" },
      "strong":    { es: "fuerte",       subtype: "calificativo" },
      "weak":      { es: "débil",        subtype: "calificativo" },
      "young":     { es: "joven",        subtype: "calificativo" },
      "rich":      { es: "rico",         subtype: "calificativo" },
      "poor":      { es: "pobre",        subtype: "calificativo" },
      "free":      { es: "libre",        subtype: "calificativo" },
      "open":      { es: "abierto",      subtype: "calificativo" },
      "closed":    { es: "cerrado",      subtype: "calificativo" },
    },
    ES_EN: {
      "grande":    { en: "big",          subtype: "calificativo" },
      "pequeño":   { en: "small",        subtype: "calificativo" },
      "bueno":     { en: "good",         subtype: "calificativo" },
      "malo":      { en: "bad",          subtype: "calificativo" },
      "nuevo":     { en: "new",          subtype: "calificativo" },
      "viejo":     { en: "old",          subtype: "calificativo" },
      "feliz":     { en: "happy",        subtype: "calificativo" },
      "triste":    { en: "sad",          subtype: "calificativo" },
      "hermoso":   { en: "beautiful",    subtype: "calificativo" },
      "feo":       { en: "ugly",         subtype: "calificativo" },
      "rápido":    { en: "fast",         subtype: "calificativo" },
      "lento":     { en: "slow",         subtype: "calificativo" },
      "caliente":  { en: "hot",          subtype: "calificativo" },
      "frío":      { en: "cold",         subtype: "calificativo" },
      "alto":      { en: "tall",         subtype: "calificativo" },
      "bajo":      { en: "short",        subtype: "calificativo" },
      "largo":     { en: "long",         subtype: "calificativo" },
      "duro":      { en: "hard",         subtype: "calificativo" },
      "fácil":     { en: "easy",         subtype: "calificativo" },
      "importante":{ en: "important",    subtype: "calificativo" },
      "verdadero": { en: "true",         subtype: "calificativo" },
      "falso":     { en: "false",        subtype: "calificativo" },
      "fuerte":    { en: "strong",       subtype: "calificativo" },
      "débil":     { en: "weak",         subtype: "calificativo" },
      "joven":     { en: "young",        subtype: "calificativo" },
      "rico":      { en: "rich",         subtype: "calificativo" },
      "pobre":     { en: "poor",         subtype: "calificativo" },
      "libre":     { en: "free",         subtype: "calificativo" },
      "abierto":   { en: "open",         subtype: "calificativo" },
      "cerrado":   { en: "closed",       subtype: "calificativo" },
    }
  },

  // ==========================================
  // ARTÍCULOS
  // ==========================================
  articles: {
    EN_ES: {
      "the": { es: "el/la/los/las", subtype: "definido" },
      "a":   { es: "un/una",        subtype: "indefinido" },
      "an":  { es: "un/una",        subtype: "indefinido" },
    },
    ES_EN: {
      "el":  { en: "the",  subtype: "definido" },
      "la":  { en: "the",  subtype: "definido" },
      "los": { en: "the",  subtype: "definido" },
      "las": { en: "the",  subtype: "definido" },
      "un":  { en: "a",    subtype: "indefinido" },
      "una": { en: "a",    subtype: "indefinido" },
      "unos":{ en: "some", subtype: "indefinido" },
      "unas":{ en: "some", subtype: "indefinido" },
    }
  },

  // ==========================================
  // PRONOMBRES
  // ==========================================
  pronouns: {
    EN_ES: {
      "i":     { es: "yo",        subtype: "personal" },
      "you":   { es: "tú/usted",  subtype: "personal" },
      "he":    { es: "él",        subtype: "personal" },
      "she":   { es: "ella",      subtype: "personal" },
      "it":    { es: "ello",      subtype: "personal" },
      "we":    { es: "nosotros",  subtype: "personal" },
      "they":  { es: "ellos",     subtype: "personal" },
      "me":    { es: "me/mí",     subtype: "personal" },
      "him":   { es: "él/le",     subtype: "personal" },
      "her":   { es: "ella/le",   subtype: "personal" },
      "us":    { es: "nosotros",  subtype: "personal" },
      "them":  { es: "ellos",     subtype: "personal" },
      "this":  { es: "esto/este", subtype: "demostrativo" },
      "that":  { es: "eso/ese",   subtype: "demostrativo" },
      "these": { es: "estos",     subtype: "demostrativo" },
      "those": { es: "esos",      subtype: "demostrativo" },
      "who":   { es: "quién",     subtype: "interrogativo" },
      "what":  { es: "qué",       subtype: "interrogativo" },
      "which": { es: "cuál",      subtype: "interrogativo" },
      "my":    { es: "mi",        subtype: "posesivo" },
      "your":  { es: "tu/su",     subtype: "posesivo" },
      "his":   { es: "su",        subtype: "posesivo" },
      "its":   { es: "su",        subtype: "posesivo" },
      "our":   { es: "nuestro",   subtype: "posesivo" },
      "their": { es: "su",        subtype: "posesivo" },
    },
    ES_EN: {
      "yo":       { en: "I",             subtype: "personal" },
      "tú":       { en: "you",           subtype: "personal" },
      "usted":    { en: "you",           subtype: "personal" },
      "él":       { en: "he",            subtype: "personal" },
      "ella":     { en: "she",           subtype: "personal" },
      "nosotros": { en: "we",            subtype: "personal" },
      "ellos":    { en: "they",          subtype: "personal" },
      "ellas":    { en: "they",          subtype: "personal" },
      "este":     { en: "this",          subtype: "demostrativo" },
      "esta":     { en: "this",          subtype: "demostrativo" },
      "esto":     { en: "this",          subtype: "demostrativo" },
      "ese":      { en: "that",          subtype: "demostrativo" },
      "esa":      { en: "that",          subtype: "demostrativo" },
      "quién":    { en: "who",           subtype: "interrogativo" },
      "qué":      { en: "what",          subtype: "interrogativo" },
      "cuál":     { en: "which",         subtype: "interrogativo" },
      "mi":       { en: "my",            subtype: "posesivo" },
      "tu":       { en: "your",          subtype: "posesivo" },
      "su":       { en: "his/her/its",   subtype: "posesivo" },
      "nuestro":  { en: "our",           subtype: "posesivo" },
    }
  },

  // ==========================================
  // ADVERBIOS
  // ==========================================
  adverbs: {
    EN_ES: {
      "always":    { es: "siempre",       subtype: "tiempo" },
      "never":     { es: "nunca",         subtype: "tiempo" },
      "sometimes": { es: "a veces",       subtype: "tiempo" },
      "now":       { es: "ahora",         subtype: "tiempo" },
      "today":     { es: "hoy",           subtype: "tiempo" },
      "yesterday": { es: "ayer",          subtype: "tiempo" },
      "tomorrow":  { es: "mañana",        subtype: "tiempo" },
      "soon":      { es: "pronto",        subtype: "tiempo" },
      "here":      { es: "aquí",          subtype: "lugar" },
      "there":     { es: "allí",          subtype: "lugar" },
      "where":     { es: "dónde",         subtype: "lugar" },
      "very":      { es: "muy",           subtype: "cantidad" },
      "much":      { es: "mucho",         subtype: "cantidad" },
      "more":      { es: "más",           subtype: "cantidad" },
      "less":      { es: "menos",         subtype: "cantidad" },
      "well":      { es: "bien",          subtype: "modo" },
      "badly":     { es: "mal",           subtype: "modo" },
      "quickly":   { es: "rápidamente",   subtype: "modo" },
      "slowly":    { es: "lentamente",    subtype: "modo" },
      "yes":       { es: "sí",            subtype: "afirmación" },
      "no":        { es: "no",            subtype: "negación" },
      "not":       { es: "no",            subtype: "negación" },
      "maybe":     { es: "quizás",        subtype: "duda" },
      "perhaps":   { es: "tal vez",       subtype: "duda" },
    },
    ES_EN: {
      "siempre":     { en: "always",      subtype: "tiempo" },
      "nunca":       { en: "never",       subtype: "tiempo" },
      "aveces":      { en: "sometimes",   subtype: "tiempo" },
      "ahora":       { en: "now",         subtype: "tiempo" },
      "hoy":         { en: "today",       subtype: "tiempo" },
      "ayer":        { en: "yesterday",   subtype: "tiempo" },
      "mañana":      { en: "tomorrow",    subtype: "tiempo" },
      "pronto":      { en: "soon",        subtype: "tiempo" },
      "aquí":        { en: "here",        subtype: "lugar" },
      "allí":        { en: "there",       subtype: "lugar" },
      "dónde":       { en: "where",       subtype: "lugar" },
      "muy":         { en: "very",        subtype: "cantidad" },
      "mucho":       { en: "much",        subtype: "cantidad" },
      "más":         { en: "more",        subtype: "cantidad" },
      "menos":       { en: "less",        subtype: "cantidad" },
      "bien":        { en: "well",        subtype: "modo" },
      "mal":         { en: "badly",       subtype: "modo" },
      "rápidamente": { en: "quickly",     subtype: "modo" },
      "lentamente":  { en: "slowly",      subtype: "modo" },
      "sí":          { en: "yes",         subtype: "afirmación" },
      "no":          { en: "no",          subtype: "negación" },
      "quizás":      { en: "maybe",       subtype: "duda" },
      "talvez":      { en: "perhaps",     subtype: "duda" },
    }
  },

  // ==========================================
  // PREPOSICIONES
  // ==========================================
  prepositions: {
    EN_ES: {
      "in":      { es: "en",               subtype: "lugar" },
      "on":      { es: "sobre",            subtype: "lugar" },
      "at":      { es: "en/a",             subtype: "lugar" },
      "to":      { es: "a/hacia",          subtype: "dirección" },
      "from":    { es: "de/desde",         subtype: "origen" },
      "with":    { es: "con",              subtype: "compañía" },
      "without": { es: "sin",              subtype: "compañía" },
      "of":      { es: "de",               subtype: "posesión" },
      "for":     { es: "para/por",         subtype: "finalidad" },
      "by":      { es: "por",              subtype: "agente" },
      "about":   { es: "sobre/acerca de",  subtype: "tema" },
      "between": { es: "entre",            subtype: "posición" },
      "under":   { es: "bajo/debajo de",   subtype: "posición" },
      "over":    { es: "sobre/encima de",  subtype: "posición" },
      "after":   { es: "después de",       subtype: "tiempo" },
      "before":  { es: "antes de",         subtype: "tiempo" },
      "during":  { es: "durante",          subtype: "tiempo" },
    },
    ES_EN: {
      "en":       { en: "in/on/at",  subtype: "lugar" },
      "sobre":    { en: "on/about",  subtype: "lugar" },
      "a":        { en: "to/at",     subtype: "dirección" },
      "de":       { en: "of/from",   subtype: "posesión" },
      "con":      { en: "with",      subtype: "compañía" },
      "sin":      { en: "without",   subtype: "compañía" },
      "para":     { en: "for",       subtype: "finalidad" },
      "por":      { en: "by/for",    subtype: "agente" },
      "entre":    { en: "between",   subtype: "posición" },
      "bajo":     { en: "under",     subtype: "posición" },
      "después":  { en: "after",     subtype: "tiempo" },
      "antes":    { en: "before",    subtype: "tiempo" },
      "durante":  { en: "during",    subtype: "tiempo" },
      "desde":    { en: "from/since",subtype: "origen" },
      "hasta":    { en: "until/to",  subtype: "límite" },
    }
  },

  // ==========================================
  // CONJUNCIONES
  // ==========================================
  conjunctions: {
    EN_ES: {
      "and":      { es: "y",               subtype: "coordinante-copulativa" },
      "or":       { es: "o",               subtype: "coordinante-disyuntiva" },
      "but":      { es: "pero",            subtype: "coordinante-adversativa" },
      "because":  { es: "porque",          subtype: "subordinante-causal" },
      "if":       { es: "si",              subtype: "subordinante-condicional" },
      "although": { es: "aunque",          subtype: "subordinante-concesiva" },
      "so":       { es: "entonces/así que",subtype: "coordinante-consecutiva" },
      "that":     { es: "que",             subtype: "subordinante" },
      "when":     { es: "cuando",          subtype: "subordinante-temporal" },
      "while":    { es: "mientras",        subtype: "subordinante-temporal" },
      "since":    { es: "desde que/ya que",subtype: "subordinante-causal" },
      "however":  { es: "sin embargo",     subtype: "coordinante-adversativa" },
      "therefore":{ es: "por lo tanto",    subtype: "coordinante-consecutiva" },
    },
    ES_EN: {
      "y":          { en: "and",       subtype: "coordinante-copulativa" },
      "e":          { en: "and",       subtype: "coordinante-copulativa" },
      "o":          { en: "or",        subtype: "coordinante-disyuntiva" },
      "u":          { en: "or",        subtype: "coordinante-disyuntiva" },
      "pero":       { en: "but",       subtype: "coordinante-adversativa" },
      "porque":     { en: "because",   subtype: "subordinante-causal" },
      "si":         { en: "if",        subtype: "subordinante-condicional" },
      "aunque":     { en: "although",  subtype: "subordinante-concesiva" },
      "que":        { en: "that",      subtype: "subordinante" },
      "cuando":     { en: "when",      subtype: "subordinante-temporal" },
      "mientras":   { en: "while",     subtype: "subordinante-temporal" },
      "sinembargo": { en: "however",   subtype: "coordinante-adversativa" },
      "entonces":   { en: "so/then",   subtype: "coordinante-consecutiva" },
      "portanto":   { en: "therefore", subtype: "coordinante-consecutiva" },
    }
  },

  // ==========================================
  // CONTRACCIONES (español)
  // ==========================================
  contractions: {
    ES_EN: {
      "al":  { en: "to the", subtype: "contracción" },
      "del": { en: "of the", subtype: "contracción" },
    },
    EN_ES: {}
  },

  // ==========================================
  // INTERJECCIONES
  // ==========================================
  interjections: {
    EN_ES: {
      "oh":    { es: "oh",    subtype: "exclamación" },
      "wow":   { es: "guau",  subtype: "sorpresa" },
      "hey":   { es: "oye",   subtype: "llamado" },
      "oops":  { es: "ups",   subtype: "error" },
      "yes":   { es: "sí",    subtype: "afirmación" },
      "hello": { es: "hola",  subtype: "saludo" },
      "hi":    { es: "hola",  subtype: "saludo" },
      "bye":   { es: "adiós", subtype: "despedida" },
    },
    ES_EN: {
      "oh":    { en: "oh",    subtype: "exclamación" },
      "guau":  { en: "wow",   subtype: "sorpresa" },
      "oye":   { en: "hey",   subtype: "llamado" },
      "ups":   { en: "oops",  subtype: "error" },
      "hola":  { en: "hello", subtype: "saludo" },
      "adiós": { en: "bye",   subtype: "despedida" },
    }
  },

  // ==========================================
  // SIGNOS DE PUNTUACIÓN
  // ==========================================
  punctuation: {
    ".":  { name: "Punto",                  subtype: "fin de oración" },
    ",":  { name: "Coma",                   subtype: "pausa" },
    "?":  { name: "Signo de interrogación", subtype: "pregunta" },
    "!":  { name: "Signo de exclamación",   subtype: "exclamación" },
    ";":  { name: "Punto y coma",           subtype: "pausa mayor" },
    ":":  { name: "Dos puntos",             subtype: "enumeración" },
    "-":  { name: "Guion",                  subtype: "separación" },
    "\"": { name: "Comillas",               subtype: "cita" },
    "'":  { name: "Apóstrofe",              subtype: "contracción" },
    "¿":  { name: "Apertura interrogación", subtype: "pregunta" },
    "¡":  { name: "Apertura exclamación",   subtype: "exclamación" },
  }
};

// ==========================================
// FUNCIÓN DE BÚSQUEDA EN EL DICCIONARIO
// ==========================================

/**
 * Busca una palabra en el diccionario
 * @param {string} word - palabra a buscar
 * @param {string} lang - idioma de entrada: 'EN' o 'ES'
 * @returns {object|null} - { type, subtype, translation } o null
 */
function lookupWord(word, lang) {
  const w = word.toLowerCase().trim();
  const dir = lang + '_' + (lang === 'EN' ? 'ES' : 'EN');

  // Puntuación
  if (DICTIONARY.punctuation[w]) {
    return {
      type: 'Puntuación',
      subtype: DICTIONARY.punctuation[w].subtype,
      name: DICTIONARY.punctuation[w].name,
      translation: w
    };
  }

  // Artículos
  if (DICTIONARY.articles[dir] && DICTIONARY.articles[dir][w]) {
    const d = DICTIONARY.articles[dir][w];
    return { type: 'Artículo', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Pronombres
  if (DICTIONARY.pronouns[dir] && DICTIONARY.pronouns[dir][w]) {
    const d = DICTIONARY.pronouns[dir][w];
    return { type: 'Pronombre', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Contracciones
  if (DICTIONARY.contractions[dir] && DICTIONARY.contractions[dir][w]) {
    const d = DICTIONARY.contractions[dir][w];
    return { type: 'Contracción', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Conjunciones
  if (DICTIONARY.conjunctions[dir] && DICTIONARY.conjunctions[dir][w]) {
    const d = DICTIONARY.conjunctions[dir][w];
    return { type: 'Conjunción', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Preposiciones
  if (DICTIONARY.prepositions[dir] && DICTIONARY.prepositions[dir][w]) {
    const d = DICTIONARY.prepositions[dir][w];
    return { type: 'Preposición', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Adverbios
  if (DICTIONARY.adverbs[dir] && DICTIONARY.adverbs[dir][w]) {
    const d = DICTIONARY.adverbs[dir][w];
    return { type: 'Adverbio', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Interjecciones
  if (DICTIONARY.interjections[dir] && DICTIONARY.interjections[dir][w]) {
    const d = DICTIONARY.interjections[dir][w];
    return { type: 'Interjección', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Adjetivos
  if (DICTIONARY.adjectives[dir] && DICTIONARY.adjectives[dir][w]) {
    const d = DICTIONARY.adjectives[dir][w];
    return { type: 'Adjetivo', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Verbos
  if (DICTIONARY.verbs[dir] && DICTIONARY.verbs[dir][w]) {
    const d = DICTIONARY.verbs[dir][w];
    return { type: 'Verbo', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  // Sustantivos
  if (DICTIONARY.nouns[dir] && DICTIONARY.nouns[dir][w]) {
    const d = DICTIONARY.nouns[dir][w];
    return { type: 'Sustantivo', subtype: d.subtype, translation: lang === 'EN' ? d.es : d.en };
  }

  return null; // No encontrado
}