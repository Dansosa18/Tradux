// =============================================
// TRADUX — semantic.js
// Analizador Semántico + Tabla de Símbolos
// Autor del commit: Kevin
// =============================================

/**
 * ANÁLISIS SEMÁNTICO
 * Verifica que las palabras tengan sentido en su contexto.
 * Genera la tabla de símbolos completa.
 *
 * @param {Array}  tokens - tokens del analizador léxico
 * @param {string} lang   - idioma de entrada: 'EN' o 'ES'
 * @returns {object}      - { errors: [], symbols: [] }
 */
function semanticAnalysis(tokens, lang) {
  const errors  = [];
  const symbols = [];

  // Filtrar solo tokens válidos (sin puntuación ni errores)
  const valid = tokens.filter(t =>
    t.type !== 'Puntuación' && t.type !== 'Desconocido'
  );

  if (valid.length === 0) {
    return { errors: [], symbols: [] };
  }

  // ── 1. Construir tabla de símbolos ──────────────────
  tokens.forEach(token => {
    if (token.type === 'Puntuación') {
      symbols.push({
        original:    token.lexeme,
        translation: token.lexeme,
        type:        'Puntuación',
        subtype:     token.subtype || '—',
        line:        token.line
      });
      return;
    }

    symbols.push({
      original:    token.lexeme,
      translation: token.translation || '—',
      type:        token.type,
      subtype:     token.subtype || '—',
      line:        token.line
    });
  });

  // ── 2. Errores semánticos ───────────────────────────

  // Error: Palabras desconocidas (ya detectadas en léxico,
  // aquí las marcamos como error semántico también si afectan el sentido)
  tokens.forEach(token => {
    if (token.type === 'Desconocido') {
      errors.push({
        word:        token.lexeme,
        line:        token.line,
        description: `La palabra "${token.lexeme}" no tiene traducción disponible en el diccionario.`
      });
    }
  });

  // Error: Adjetivo calificando a un verbo directamente
  // Ejemplo: "run beautiful" — un adjetivo no puede modificar un verbo
  for (let i = 0; i < valid.length - 1; i++) {
    if (
      valid[i].type === 'Verbo' &&
      valid[i + 1].type === 'Adjetivo' &&
      valid[i].subtype !== 'cópula'
    ) {
      errors.push({
        word:        valid[i + 1].lexeme,
        line:        valid[i + 1].line,
        description: `El adjetivo "${valid[i + 1].lexeme}" no puede modificar directamente al verbo "${valid[i].lexeme}". Considera usar un adverbio.`
      });
    }
  }

  // Error: Preposición al final de la oración
  const lastValid = valid[valid.length - 1];
  if (lastValid && lastValid.type === 'Preposición') {
    errors.push({
      word:        lastValid.lexeme,
      line:        lastValid.line,
      description: `La preposición "${lastValid.lexeme}" no puede finalizar la oración — le falta un complemento.`
    });
  }

  // Error: Conjunción al inicio de la oración
  const firstValid = valid[0];
  if (firstValid && firstValid.type === 'Conjunción') {
    errors.push({
      word:        firstValid.lexeme,
      line:        firstValid.line,
      description: `La conjunción "${firstValid.lexeme}" no debe iniciar la oración.`
    });
  }

  // Error: Conjunción al final de la oración
  if (lastValid && lastValid.type === 'Conjunción') {
    errors.push({
      word:        lastValid.lexeme,
      line:        lastValid.line,
      description: `La conjunción "${lastValid.lexeme}" no puede finalizar la oración — le falta la segunda parte.`
    });
  }

  // Error: Dos adjetivos seguidos sin sustantivo entre ellos (posible error de concordancia)
  for (let i = 0; i < valid.length - 1; i++) {
    if (
      valid[i].type === 'Adjetivo' &&
      valid[i + 1].type === 'Adjetivo'
    ) {
      errors.push({
        word:        valid[i + 1].lexeme,
        line:        valid[i + 1].line,
        description: `Dos adjetivos consecutivos: "${valid[i].lexeme}" y "${valid[i + 1].lexeme}". Verifica si falta un sustantivo entre ellos.`
      });
    }
  }

  // Error: Pronombre seguido de pronombre (redundancia semántica)
  for (let i = 0; i < valid.length - 1; i++) {
    if (
      valid[i].type === 'Pronombre' &&
      valid[i + 1].type === 'Pronombre' &&
      valid[i].subtype === 'personal' &&
      valid[i + 1].subtype === 'personal'
    ) {
      errors.push({
        word:        valid[i + 1].lexeme,
        line:        valid[i + 1].line,
        description: `Pronombres personales consecutivos: "${valid[i].lexeme}" y "${valid[i + 1].lexeme}". Posible redundancia semántica.`
      });
    }
  }

  // ── 3. Verificación de concordancia ─────────────────
  if (lang === 'EN') {
    errors.push(...checkEnglishConcordance(valid));
  } else {
    errors.push(...checkSpanishConcordance(valid));
  }

  return { errors, symbols };
}


/**
 * CONCORDANCIA en INGLÉS
 * Verifica que el sujeto y verbo concuerden
 */
function checkEnglishConcordance(tokens) {
  const errors = [];

  // Verificar: pronombre de tercera persona singular + verbo sin "s"
  // Ejemplo: "He go" en vez de "He goes"
  const thirdSingular = ['he', 'she', 'it'];

  for (let i = 0; i < tokens.length - 1; i++) {
    if (
      tokens[i].type === 'Pronombre' &&
      thirdSingular.includes(tokens[i].lexeme.toLowerCase())
    ) {
      const next = tokens[i + 1];
      if (next && next.type === 'Verbo') {
        const verb = next.lexeme.toLowerCase();
        // Verbos que en 3ra persona deben terminar en 's' pero no la tienen
        const needsS = ['go','run','walk','eat','drink','sleep','read','write',
                        'speak','talk','listen','see','look','hear','know',
                        'think','want','need','like','love','work','study',
                        'play','help','live','say','give','take','make'];
        if (needsS.includes(verb)) {
          errors.push({
            word:        verb,
            line:        next.line,
            description: `Posible error de concordancia: con "${tokens[i].lexeme}" el verbo debería ser "${verb}s" en lugar de "${verb}".`
          });
        }
      }
    }
  }

  return errors;
}


/**
 * CONCORDANCIA en ESPAÑOL
 * Verifica concordancia de género entre artículo y sustantivo
 */
function checkSpanishConcordance(tokens) {
  const errors = [];

  const masculino  = ['el', 'un', 'los', 'unos'];
  const femenino   = ['la', 'una', 'las', 'unas'];

  // Sustantivos femeninos conocidos
  const sustFemeninos = [
    'casa','mujer','ciudad','escuela','familia','noche','comida','vida',
    'mano','puerta','ventana','silla','flor','luna','música','verdad',
    'paz','felicidad','hermana','madre'
  ];

  // Sustantivos masculinos conocidos
  const sustMasculinos = [
    'carro','perro','gato','libro','hombre','país','maestro','estudiante',
    'amigo','tiempo','día','agua','trabajo','mundo','ojo','teléfono',
    'árbol','camino','dinero','corazón','hermano','padre','sol'
  ];

  for (let i = 0; i < tokens.length - 1; i++) {
    const current = tokens[i];
    const next    = tokens[i + 1];

    if (current.type !== 'Artículo' || next.type !== 'Sustantivo') continue;

    const art  = current.lexeme.toLowerCase();
    const sust = next.lexeme.toLowerCase();

    const artMasc = masculino.includes(art);
    const artFem  = femenino.includes(art);

    if (artMasc && sustFemeninos.includes(sust)) {
      errors.push({
        word:        current.lexeme,
        line:        current.line,
        description: `Error de concordancia de género: "${current.lexeme}" (masculino) con "${next.lexeme}" (femenino). ¿Quisiste decir "la/una ${next.lexeme}"?`
      });
    }

    if (artFem && sustMasculinos.includes(sust)) {
      errors.push({
        word:        current.lexeme,
        line:        current.line,
        description: `Error de concordancia de género: "${current.lexeme}" (femenino) con "${next.lexeme}" (masculino). ¿Quisiste decir "el/un ${next.lexeme}"?`
      });
    }
  }

  return errors;
}