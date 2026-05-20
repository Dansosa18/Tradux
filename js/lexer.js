// =============================================
// TRADUX — lexer.js
// Analizador Léxico
// Autor del commit: Daniel
// =============================================

/**
 * ANÁLISIS LÉXICO
 * Recibe el texto de entrada y lo convierte en una lista de tokens.
 * Cada token tiene: lexeme, type, category, line
 *
 * @param {string} text  - texto de entrada
 * @param {string} lang  - idioma de entrada: 'EN' o 'ES'
 * @returns {object}     - { tokens: [], errors: [] }
 */
function lexicalAnalysis(text, lang) {
  const tokens = [];
  const errors = [];

  // Separar por líneas para rastrear número de línea
  const lines = text.split('\n');

  lines.forEach((line, lineIndex) => {
    const lineNumber = lineIndex + 1;

    // Tokenizar la línea usando regex:
    // Captura palabras (con acentos), números, signos de puntuación
    const pattern = /[¿¡]|[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+(?:'[a-zA-Z]+)?|[\d]+|[.,!?;:"'\-]/g;
    const rawTokens = line.match(pattern);

    if (!rawTokens) return; // línea vacía

    rawTokens.forEach(raw => {
      const word = raw.trim();
      if (!word) return;

      // ¿Es puntuación?
      if (DICTIONARY.punctuation[word]) {
        tokens.push({
          lexeme:   word,
          type:     'Puntuación',
          category: DICTIONARY.punctuation[word].name,
          subtype:  DICTIONARY.punctuation[word].subtype,
          line:     lineNumber
        });
        return;
      }

      // ¿Es número?
      if (/^\d+$/.test(word)) {
        tokens.push({
          lexeme:   word,
          type:     'Número',
          category: 'Literal numérico',
          subtype:  'entero',
          line:     lineNumber
        });
        return;
      }

      // Buscar en el diccionario
      const found = lookupWord(word, lang);

      if (found) {
        tokens.push({
          lexeme:      word,
          type:        found.type,
          category:    found.type,
          subtype:     found.subtype,
          translation: found.translation,
          line:        lineNumber
        });
      } else {
        // Palabra desconocida → error léxico
        tokens.push({
          lexeme:   word,
          type:     'Desconocido',
          category: 'Error léxico',
          subtype:  'no identificado',
          line:     lineNumber
        });
        errors.push({
          word:        word,
          line:        lineNumber,
          description: `La palabra "${word}" no se reconoce en el idioma ${lang === 'EN' ? 'inglés' : 'español'}.`
        });
      }
    });
  });

  return { tokens, errors };
}


/**
 * FUNCIÓN DE TRADUCCIÓN
 * Recorre los tokens y construye la oración traducida
 *
 * @param {Array}  tokens - lista de tokens del análisis léxico
 * @param {string} lang   - idioma de entrada: 'EN' o 'ES'
 * @returns {string}      - texto traducido
 */
function translate(tokens, lang) {
  const parts = [];

  tokens.forEach(token => {
    if (token.type === 'Puntuación') {
      // Los signos de puntuación se mantienen igual
      parts.push(token.lexeme);
      return;
    }

    if (token.type === 'Número') {
      parts.push(token.lexeme);
      return;
    }

    if (token.translation) {
      // Capitalizar si es la primera palabra de la oración
      const isFirst = parts.filter(p => /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/.test(p)).length === 0;
      const word = isFirst
        ? capitalize(token.translation)
        : token.translation;
      parts.push(word);
    } else {
      // Palabra desconocida: dejar como está entre corchetes
      parts.push(`[${token.lexeme}]`);
    }
  });

  // Unir con espacios pero evitar espacio antes de puntuación
  let result = '';
  parts.forEach((part, i) => {
    if (i === 0) {
      result += part;
    } else if (DICTIONARY.punctuation[part]) {
      result += part; // sin espacio antes de puntuación
    } else {
      result += ' ' + part;
    }
  });

  return result;
}


/**
 * Capitaliza la primera letra de una palabra
 */
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}