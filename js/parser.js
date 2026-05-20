// =============================================
// TRADUX — parser.js
// Analizador Sintáctico + Árbol de Derivación BNF
// Autor del commit: Byron
// =============================================

/**
 * ANÁLISIS SINTÁCTICO
 * Verifica que la estructura de la oración sea válida
 * según las reglas BNF definidas.
 * Genera el árbol de derivación.
 *
 * @param {Array}  tokens - tokens del analizador léxico
 * @param {string} lang   - idioma de entrada: 'EN' o 'ES'
 * @returns {object}      - { errors: [], tree: string, bnf: string }
 */
function syntacticAnalysis(tokens, lang) {
  const errors = [];

  // Filtrar puntuación para el análisis estructural
  const filtered = tokens.filter(t =>
    t.type !== 'Puntuación' && t.type !== 'Desconocido'
  );

  // Si no hay tokens válidos
  if (filtered.length === 0) {
    return {
      errors: [{
        word: '—',
        line: 1,
        description: 'No se encontraron palabras válidas para analizar.'
      }],
      tree: 'Sin árbol — no hay tokens válidos.',
      bnf: getBNFRules(lang)
    };
  }

  // Verificar estructura básica de la oración
  const structureErrors = checkSentenceStructure(filtered, lang);
  errors.push(...structureErrors);

  // Generar árbol de derivación
  const tree = buildDerivationTree(tokens, lang);

  return {
    errors,
    tree,
    bnf: getBNFRules(lang)
  };
}


/**
 * VERIFICAR ESTRUCTURA DE LA ORACIÓN
 * Reglas básicas según el idioma
 */
function checkSentenceStructure(tokens, lang) {
  const errors = [];
  const types = tokens.map(t => t.type);

  if (lang === 'EN') {
    errors.push(...checkEnglishStructure(tokens, types));
  } else {
    errors.push(...checkSpanishStructure(tokens, types));
  }

  return errors;
}


/**
 * Reglas sintácticas para INGLÉS
 * Estructura esperada: (Pronombre|Artículo|Sustantivo) + Verbo + ...
 */
function checkEnglishStructure(tokens, types) {
  const errors = [];

  // Regla 1: La oración no debe empezar con Verbo directamente
  // (excepto verbos modales o imperativos)
  const firstMeaningful = tokens[0];
  if (firstMeaningful) {
    const isVerb   = firstMeaningful.type === 'Verbo';
    const isModal  = firstMeaningful.subtype === 'modal';
    const isAuxiliar = firstMeaningful.subtype === 'auxiliar';

    if (isVerb && !isModal && !isAuxiliar) {
      // Puede ser imperativo — no es error grave, solo advertencia
    }
  }

  // Regla 2: Si hay artículo, debe ir seguido de sustantivo o adjetivo
  tokens.forEach((token, i) => {
    if (token.type === 'Artículo') {
      const next = tokens[i + 1];
      if (!next) {
        errors.push({
          word: token.lexeme,
          line: token.line,
          description: `El artículo "${token.lexeme}" no puede estar al final de la oración.`
        });
      } else if (
        next.type !== 'Sustantivo' &&
        next.type !== 'Adjetivo' &&
        next.type !== 'Número'
      ) {
        errors.push({
          word: token.lexeme,
          line: token.line,
          description: `El artículo "${token.lexeme}" debe ir seguido de un sustantivo o adjetivo, se encontró: "${next.lexeme}" (${next.type}).`
        });
      }
    }
  });

  // Regla 3: No debe haber dos verbos principales consecutivos
  for (let i = 0; i < tokens.length - 1; i++) {
    if (
      tokens[i].type === 'Verbo' &&
      tokens[i + 1].type === 'Verbo' &&
      tokens[i].subtype !== 'auxiliar' &&
      tokens[i].subtype !== 'modal' &&
      tokens[i + 1].subtype !== 'auxiliar' &&
      tokens[i + 1].subtype !== 'modal'
    ) {
      errors.push({
        word: tokens[i + 1].lexeme,
        line: tokens[i + 1].line,
        description: `Dos verbos principales consecutivos: "${tokens[i].lexeme}" y "${tokens[i + 1].lexeme}". Revisa la estructura de la oración.`
      });
    }
  }

  // Regla 4: No dos artículos seguidos
  for (let i = 0; i < tokens.length - 1; i++) {
    if (tokens[i].type === 'Artículo' && tokens[i + 1].type === 'Artículo') {
      errors.push({
        word: tokens[i + 1].lexeme,
        line: tokens[i + 1].line,
        description: `Dos artículos consecutivos: "${tokens[i].lexeme}" y "${tokens[i + 1].lexeme}".`
      });
    }
  }

  return errors;
}


/**
 * Reglas sintácticas para ESPAÑOL
 * Estructura más flexible, pero con sus propias reglas
 */
function checkSpanishStructure(tokens, types) {
  const errors = [];

  // Regla 1: Artículo debe ir seguido de sustantivo o adjetivo
  tokens.forEach((token, i) => {
    if (token.type === 'Artículo') {
      const next = tokens[i + 1];
      if (!next) {
        errors.push({
          word: token.lexeme,
          line: token.line,
          description: `El artículo "${token.lexeme}" no puede finalizar la oración.`
        });
      } else if (
        next.type !== 'Sustantivo' &&
        next.type !== 'Adjetivo' &&
        next.type !== 'Número'
      ) {
        errors.push({
          word: token.lexeme,
          line: token.line,
          description: `El artículo "${token.lexeme}" debe ir seguido de un sustantivo o adjetivo, se encontró: "${next.lexeme}" (${next.type}).`
        });
      }
    }
  });

  // Regla 2: No dos verbos principales seguidos
  for (let i = 0; i < tokens.length - 1; i++) {
    if (
      tokens[i].type === 'Verbo' &&
      tokens[i + 1].type === 'Verbo' &&
      tokens[i].subtype !== 'auxiliar' &&
      tokens[i].subtype !== 'modal' &&
      tokens[i].subtype !== 'cópula' &&
      tokens[i + 1].subtype !== 'auxiliar' &&
      tokens[i + 1].subtype !== 'modal'
    ) {
      errors.push({
        word: tokens[i + 1].lexeme,
        line: tokens[i + 1].line,
        description: `Verbos consecutivos sin nexo: "${tokens[i].lexeme}" y "${tokens[i + 1].lexeme}".`
      });
    }
  }

  // Regla 3: No dos artículos seguidos
  for (let i = 0; i < tokens.length - 1; i++) {
    if (tokens[i].type === 'Artículo' && tokens[i + 1].type === 'Artículo') {
      errors.push({
        word: tokens[i + 1].lexeme,
        line: tokens[i + 1].line,
        description: `Artículos consecutivos: "${tokens[i].lexeme}" y "${tokens[i + 1].lexeme}".`
      });
    }
  }

  return errors;
}


// =============================================
// ÁRBOL DE DERIVACIÓN BNF
// =============================================

/**
 * Construye el árbol de derivación en formato texto
 */
function buildDerivationTree(tokens, lang) {
  const lines = [];
  const langLabel = lang === 'EN' ? 'Oración en Inglés' : 'Oración en Español';

  lines.push(`<ORACIÓN> ::= ${langLabel}`);
  lines.push('│');

  // Agrupar tokens en constituyentes
  const constituents = groupConstituents(tokens);

  constituents.forEach((group, gi) => {
    const isLast = gi === constituents.length - 1;
    const prefix = isLast ? '└── ' : '├── ';
    lines.push(`${prefix}<${group.label}>`);

    group.tokens.forEach((token, ti) => {
      const isLastToken = ti === group.tokens.length - 1;
      const tokenPrefix = (isLast ? '    ' : '│   ') + (isLastToken ? '└── ' : '├── ');
      const typeLabel   = `<${token.type}>`;
      lines.push(`${tokenPrefix}${typeLabel}`);

      const wordPrefix = (isLast ? '    ' : '│   ') + (isLastToken ? '    ' : '│   ') + '└── ';
      lines.push(`${wordPrefix}"${token.lexeme}"`);
    });
  });

  return lines.join('\n');
}


/**
 * Agrupa los tokens en constituyentes sintácticos
 * (Frase Nominal, Frase Verbal, etc.)
 */
function groupConstituents(tokens) {
  const groups = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    // Frase Nominal: Artículo? + (Adjetivo)* + Sustantivo + (Adjetivo)*
    if (
      token.type === 'Artículo' ||
      token.type === 'Pronombre' ||
      (token.type === 'Sustantivo' && (i === 0 || tokens[i-1]?.type !== 'Verbo'))
    ) {
      const group = { label: 'Frase Nominal', tokens: [token] };
      i++;
      // Absorber adjetivos y sustantivos siguientes
      while (
        i < tokens.length &&
        (tokens[i].type === 'Adjetivo' || tokens[i].type === 'Sustantivo')
      ) {
        group.tokens.push(tokens[i]);
        i++;
      }
      groups.push(group);
      continue;
    }

    // Frase Verbal: Verbo + Adverbio?
    if (token.type === 'Verbo') {
      const group = { label: 'Frase Verbal', tokens: [token] };
      i++;
      while (
        i < tokens.length &&
        (tokens[i].type === 'Adverbio')
      ) {
        group.tokens.push(tokens[i]);
        i++;
      }
      groups.push(group);
      continue;
    }

    // Frase Adjetival
    if (token.type === 'Adjetivo') {
      const group = { label: 'Frase Adjetival', tokens: [token] };
      i++;
      groups.push(group);
      continue;
    }

    // Frase Adverbial
    if (token.type === 'Adverbio') {
      const group = { label: 'Frase Adverbial', tokens: [token] };
      i++;
      groups.push(group);
      continue;
    }

    // Frase Preposicional
    if (token.type === 'Preposición') {
      const group = { label: 'Frase Preposicional', tokens: [token] };
      i++;
      while (
        i < tokens.length &&
        (tokens[i].type === 'Artículo' ||
         tokens[i].type === 'Sustantivo' ||
         tokens[i].type === 'Pronombre' ||
         tokens[i].type === 'Adjetivo')
      ) {
        group.tokens.push(tokens[i]);
        i++;
      }
      groups.push(group);
      continue;
    }

    // Conjunción
    if (token.type === 'Conjunción') {
      groups.push({ label: 'Nexo', tokens: [token] });
      i++;
      continue;
    }

    // Puntuación
    if (token.type === 'Puntuación') {
      groups.push({ label: 'Puntuación', tokens: [token] });
      i++;
      continue;
    }

    // Número
    if (token.type === 'Número') {
      groups.push({ label: 'Literal', tokens: [token] });
      i++;
      continue;
    }

    // Token desconocido
    groups.push({ label: 'Error', tokens: [token] });
    i++;
  }

  return groups;
}


// =============================================
// REGLAS BNF
// =============================================

/**
 * Retorna las reglas BNF del idioma
 */
function getBNFRules(lang) {
  if (lang === 'EN') {
    return `BNF — Gramática del Inglés (Tradux)
═══════════════════════════════════════════

<ORACIÓN>       ::= <FRASE_NOMINAL> <FRASE_VERBAL>
                  | <FRASE_NOMINAL> <FRASE_VERBAL> <FRASE_NOMINAL>
                  | <FRASE_NOMINAL> <FRASE_VERBAL> <FRASE_PREPOSICIONAL>
                  | <FRASE_VERBAL>

<FRASE_NOMINAL> ::= <ARTÍCULO> <SUSTANTIVO>
                  | <ARTÍCULO> <ADJETIVO> <SUSTANTIVO>
                  | <PRONOMBRE>
                  | <SUSTANTIVO>
                  | <ADJETIVO> <SUSTANTIVO>

<FRASE_VERBAL>  ::= <VERBO>
                  | <VERBO> <ADVERBIO>
                  | <VERBO_AUXILIAR> <VERBO>
                  | <VERBO_MODAL> <VERBO>

<FRASE_PREPOSICIONAL> ::= <PREPOSICIÓN> <FRASE_NOMINAL>
                        | <PREPOSICIÓN> <ADVERBIO>

<ARTÍCULO>      ::= "the" | "a" | "an"
<SUSTANTIVO>    ::= house | car | dog | ... (ver diccionario)
<VERBO>         ::= is | are | go | eat | ... (ver diccionario)
<ADJETIVO>      ::= big | small | happy | ... (ver diccionario)
<ADVERBIO>      ::= always | never | very | ... (ver diccionario)
<PRONOMBRE>     ::= I | you | he | she | ... (ver diccionario)
<PREPOSICIÓN>   ::= in | on | at | to | ... (ver diccionario)
<CONJUNCIÓN>    ::= and | or | but | ... (ver diccionario)`;
  } else {
    return `BNF — Gramática del Español (Tradux)
═══════════════════════════════════════════

<ORACIÓN>       ::= <SUJETO> <PREDICADO>
                  | <PREDICADO> <SUJETO>
                  | <SUJETO> <PREDICADO> <COMPLEMENTO>

<SUJETO>        ::= <FRASE_NOMINAL>
                  | <PRONOMBRE>

<PREDICADO>     ::= <FRASE_VERBAL>
                  | <FRASE_VERBAL> <COMPLEMENTO>

<FRASE_NOMINAL> ::= <ARTÍCULO> <SUSTANTIVO>
                  | <ARTÍCULO> <ADJETIVO> <SUSTANTIVO>
                  | <ARTÍCULO> <SUSTANTIVO> <ADJETIVO>
                  | <SUSTANTIVO>

<FRASE_VERBAL>  ::= <VERBO>
                  | <VERBO> <ADVERBIO>
                  | <VERBO_AUXILIAR> <VERBO>

<COMPLEMENTO>   ::= <FRASE_NOMINAL>
                  | <FRASE_PREPOSICIONAL>
                  | <ADJETIVO>

<FRASE_PREPOSICIONAL> ::= <PREPOSICIÓN> <FRASE_NOMINAL>
                        | <PREPOSICIÓN> <ADVERBIO>

<ARTÍCULO>      ::= el | la | los | las | un | una | unos | unas
<SUSTANTIVO>    ::= casa | perro | libro | ... (ver diccionario)
<VERBO>         ::= es | está | ir | comer | ... (ver diccionario)
<ADJETIVO>      ::= grande | feliz | bueno | ... (ver diccionario)
<ADVERBIO>      ::= siempre | nunca | muy | ... (ver diccionario)
<PRONOMBRE>     ::= yo | tú | él | ella | ... (ver diccionario)
<PREPOSICIÓN>   ::= en | de | a | con | ... (ver diccionario)
<CONJUNCIÓN>    ::= y | o | pero | porque | ... (ver diccionario)`;
  }
}