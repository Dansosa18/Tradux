// =============================================
// TRADUX — lexer.js
// Analizador Léxico
// Autor del commit: Daniel
// =============================================

/**
 * STEMMER INGLÉS
 */
function stemEnglish(word) {
  const w = word.toLowerCase();

  const irregulars = {
    "am":"be","is":"be","are":"be","was":"be","were":"be","been":"be",
    "has":"have","had":"have",
    "did":"do","does":"do",
    "went":"go","goes":"go",
    "came":"come",
    "ran":"run",
    "ate":"eat",
    "drank":"drink",
    "slept":"sleep",
    "wrote":"write",
    "spoke":"speak",
    "saw":"see",
    "heard":"hear",
    "knew":"know",
    "thought":"think",
    "said":"say",
    "gave":"give",
    "took":"take",
    "made":"make",
    "found":"find",
    "told":"tell",
    "got":"get",
    "began":"begin",
    "felt":"feel",
    "left":"leave",
    "tried":"try",
    "built":"build",
    "broke":"break",
    "caught":"catch",
    "threw":"throw",
    "chose":"choose",
    "flew":"fly",
    "swam":"swim",
    "sang":"sing",
    "drew":"draw",
    "grew":"grow",
    "fell":"fall",
    "rose":"rise",
    "sat":"sit",
    "stood":"stand",
    "won":"win",
    "lost":"lose",
    "paid":"pay",
    "sent":"send",
    "met":"meet",
    "sold":"sell",
    "bought":"buy",
    "taught":"teach",
    "understood":"understand",
    "forgot":"forget",
    "learned":"learn",
    "called":"call",
    "used":"use",
    "loved":"love",
    "worked":"work",
    "played":"play",
    "helped":"help",
    "lived":"live",
    "studied":"study",
  };

  if (irregulars[w]) return irregulars[w];

  // studies → study
  if (w.endsWith("ies") && w.length > 4) return w.slice(0,-3) + "y";
  // teaches, goes → teach, go
  if (w.endsWith("es") && w.length > 3) {
    const stem = w.slice(0,-2);
    if (lookupWord(stem,"EN")) return stem;
  }
  // runs, eats → run, eat
  if (w.endsWith("s") && w.length > 3) {
    const stem = w.slice(0,-1);
    if (lookupWord(stem,"EN")) return stem;
  }
  // running → run, writing → write
  if (w.endsWith("ing") && w.length > 5) {
    const s1 = w.slice(0,-3);
    const s2 = w.slice(0,-3) + "e";
    if (lookupWord(s1,"EN")) return s1;
    if (lookupWord(s2,"EN")) return s2;
  }
  // walked → walk, loved → love
  if (w.endsWith("ed") && w.length > 4) {
    const s1 = w.slice(0,-2);
    const s2 = w.slice(0,-1);
    if (lookupWord(s1,"EN")) return s1;
    if (lookupWord(s2,"EN")) return s2;
  }
  // quickly → quick
  if (w.endsWith("ly") && w.length > 4) {
    const stem = w.slice(0,-2);
    if (lookupWord(stem,"EN")) return stem;
  }

  return w;
}


/**
 * STEMMER ESPAÑOL — mejorado
 * Cubre: pasado 3ra persona (-ó), nosotros (-amos/-imos/-emos),
 * gerundios (-ando/-iendo), imperfecto (-aba/-ía), y más
 */
function stemSpanish(word) {
  const w = word.toLowerCase();

  // ─── Irregulares ────────────────────────────────────────
  const irregulars = {
    // ser/estar
    "soy":"ser","eres":"ser","somos":"ser","son":"ser",
    "estoy":"estar","estás":"estar","estamos":"estar","están":"estar",
    "fui":"ir","fue":"ir","fuimos":"ir","fueron":"ir",
    // ir
    "voy":"ir","vas":"ir","vamos":"ir","van":"ir",
    // tener
    "tengo":"tener","tienes":"tener","tenemos":"tener","tienen":"tener",
    "tuvo":"tener","tuve":"tener","tuvimos":"tener","tuvieron":"tener",
    // poder
    "puedo":"poder","puedes":"poder","podemos":"poder","pueden":"poder",
    "pudo":"poder","pude":"poder","pudimos":"poder","pudieron":"poder",
    // hacer
    "hago":"hacer","haces":"hacer","hacemos":"hacer","hacen":"hacer",
    "hizo":"hacer","hice":"hacer","hicimos":"hacer","hicieron":"hacer",
    // decir
    "digo":"decir","dices":"decir","decimos":"decir","dicen":"decir",
    "dijo":"decir","dije":"decir","dijimos":"decir","dijeron":"decir",
    // venir
    "vengo":"venir","vienes":"venir","venimos":"venir","vienen":"venir",
    "vino":"venir","vine":"venir","vinimos":"venir","vinieron":"venir",
    // querer
    "quiero":"querer","quieres":"querer","queremos":"querer","quieren":"querer",
    "quiso":"querer","quise":"querer","quisimos":"querer","quisieron":"querer",
    // saber
    "sé":"saber","sabes":"saber","sabemos":"saber","saben":"saber",
    "supo":"saber","supe":"saber","supimos":"saber","supieron":"saber",
    // ver
    "veo":"ver","ves":"ver","vemos":"ver","ven":"ver",
    "vio":"ver","vi":"ver","vimos":"ver","vieron":"ver",
    // dar
    "doy":"dar","das":"dar","damos":"dar","dan":"dar",
    "dio":"dar","di":"dar","dimos":"dar","dieron":"dar",
    // leer
    "leo":"leer","lees":"leer","leemos":"leer","leen":"leer",
    "leyó":"leer","leí":"leer","leímos":"leer","leyeron":"leer",
    // traer
    "traigo":"traer","traes":"traer","traemos":"traer","traen":"traer",
    "trajo":"traer","traje":"traer","trajimos":"traer","trajeron":"traer",
    // poner
    "pongo":"poner","pones":"poner","ponemos":"poner","ponen":"poner",
    "puso":"poner","puse":"poner","pusimos":"poner","pusieron":"poner",
    // salir
    "salgo":"salir","sales":"salir","salimos":"salir","salen":"salir",
    "salió":"salir","salí":"salir","salimos":"salir","salieron":"salir",
    // sentir
    "siento":"sentir","sientes":"sentir","sentimos":"sentir","sienten":"sentir",
    "sintió":"sentir","sentí":"sentir","sentimos":"sentir","sintieron":"sentir",
    // pensar
    "pienso":"pensar","piensas":"pensar","pensamos":"pensar","piensan":"pensar",
    // jugar
    "juego":"jugar","juegas":"jugar","jugamos":"jugar","juegan":"jugar",
    "jugó":"jugar","jugué":"jugar","jugamos":"jugar","jugaron":"jugar",
    // dormir
    "duermo":"dormir","duermes":"dormir","dormimos":"dormir","duermen":"dormir",
    "durmió":"dormir","dormí":"dormir","dormimos":"dormir","durmieron":"dormir",
    // pedir
    "pido":"pedir","pides":"pedir","pedimos":"pedir","piden":"pedir",
    "pidió":"pedir","pedí":"pedir","pedimos":"pedir","pidieron":"pedir",
    // escribir
    "escribo":"escribir","escribes":"escribir","escribimos":"escribir","escriben":"escribir",
    "escribió":"escribir","escribí":"escribir","escribimos":"escribir","escribieron":"escribir",
    // ir conjugaciones extra
    "fui":"ir","fuiste":"ir","fue":"ir","fuimos":"ir","fueron":"ir",
    // estar conjugaciones extra
    "estuvo":"estar","estuve":"estar","estuvimos":"estar","estuvieron":"estar",
    // poder extra
    "podría":"poder","podrías":"poder","podríamos":"poder","podrían":"poder",
    // deber
    "debo":"deber","debes":"deber","debemos":"deber","deben":"deber",
    "debió":"deber","debí":"deber","debimos":"deber","debieron":"deber",
  };

  if (irregulars[w]) return irregulars[w];

  // ─── Pasado 3ra persona singular (-ó) ───────────────────
  // compró → comprar, corrió → correr, vivió → vivir
  if (w.endsWith("ó") && w.length > 3) {
    const base = w.slice(0,-1);          // compr
    // Intentar con terminaciones de infinitivo
    const candidates = [
      base + "ar",   // comprar
      base + "er",   // correr → corr+er ✓ ... pero base sería "corri"
      base + "ir",   // subir
      // Para verbos con cambio de raíz: corrió → base=corri → correr
      base.slice(0,-1) + "er",  // corri → corr → correr
      base.slice(0,-1) + "ar",  // habli → habl → hablar (no aplica)
      base.slice(0,-1) + "ir",  // subí → sub → subir
    ];
    for (const c of candidates) {
      if (lookupWord(c,"ES")) return c;
    }
  }

  // ─── Pasado 1ra persona singular (-é/-í) ────────────────
  // compré → comprar, aprendí → aprender
  if ((w.endsWith("é") || w.endsWith("í")) && w.length > 3) {
    const base = w.slice(0,-1);
    const candidates = [base+"ar", base+"er", base+"ir",
                        base.slice(0,-1)+"er", base.slice(0,-1)+"ar",base.slice(0,-1)+"ir"];
    for (const c of candidates) {
      if (lookupWord(c,"ES")) return c;
    }
  }

  // ─── Pasado nosotros (-amos/-imos/-emos) ────────────────
  // aprendimos → aprender, corrimos → correr, compramos → comprar
  if (w.endsWith("amos") && w.length > 5) {
    const base = w.slice(0,-4);
    if (lookupWord(base+"ar","ES")) return base+"ar";
    if (lookupWord(base+"er","ES")) return base+"er";
  }
  if (w.endsWith("imos") && w.length > 5) {
    const base = w.slice(0,-4);
    if (lookupWord(base+"ir","ES")) return base+"ir";
    if (lookupWord(base+"er","ES")) return base+"er";
    // corrimos → corr → correr
    if (lookupWord(base.slice(0,-1)+"er","ES")) return base.slice(0,-1)+"er";
  }
  if (w.endsWith("emos") && w.length > 5) {
    const base = w.slice(0,-4);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ar","ES")) return base+"ar";
  }

  // ─── Pasado ellos (-aron/-ieron/-eron) ──────────────────
  if (w.endsWith("aron") && w.length > 5) {
    const base = w.slice(0,-4);
    if (lookupWord(base+"ar","ES")) return base+"ar";
  }
  if (w.endsWith("ieron") && w.length > 6) {
    const base = w.slice(0,-5);
    if (lookupWord(base+"ir","ES")) return base+"ir";
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base.slice(0,-1)+"er","ES")) return base.slice(0,-1)+"er";
  }
  if (w.endsWith("eron") && w.length > 5) {
    const base = w.slice(0,-4);
    if (lookupWord(base+"er","ES")) return base+"er";
  }

  // ─── Gerundio (-ando/-iendo) ────────────────────────────
  // comprando → comprar, corriendo → correr, viviendo → vivir
  if (w.endsWith("ando") && w.length > 5) {
    const base = w.slice(0,-4);
    if (lookupWord(base+"ar","ES")) return base+"ar";
  }
  if (w.endsWith("iendo") && w.length > 6) {
    const base = w.slice(0,-5);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
    if (lookupWord(base.slice(0,-1)+"er","ES")) return base.slice(0,-1)+"er";
    if (lookupWord(base.slice(0,-1)+"ir","ES")) return base.slice(0,-1)+"ir";
  }

  // ─── Imperfecto (-aba/-abas/-aban) ──────────────────────
  if (w.endsWith("aba") && w.length > 4) return w.slice(0,-3)+"ar";
  if (w.endsWith("abas") && w.length > 5) return w.slice(0,-4)+"ar";
  if (w.endsWith("aban") && w.length > 5) return w.slice(0,-4)+"ar";

  // ─── Imperfecto -ía (-ía/-ías/-ían) ─────────────────────
  if (w.endsWith("ía") && w.length > 3) {
    const base = w.slice(0,-2);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
  }
  if (w.endsWith("ías") && w.length > 4) {
    const base = w.slice(0,-3);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
  }
  if (w.endsWith("ían") && w.length > 4) {
    const base = w.slice(0,-3);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
  }

  // ─── Presente 3ra persona singular (-a/-e) ──────────────
  // compra → comprar, corre → correr
  if (w.endsWith("a") && w.length > 3) {
    const base = w.slice(0,-1);
    if (lookupWord(base+"ar","ES")) return base+"ar";
  }
  if (w.endsWith("e") && w.length > 3) {
    const base = w.slice(0,-1);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
  }

  // ─── Presente ellos (-an/-en) ───────────────────────────
  if (w.endsWith("an") && w.length > 3) {
    const base = w.slice(0,-2);
    if (lookupWord(base+"ar","ES")) return base+"ar";
  }
  if (w.endsWith("en") && w.length > 3) {
    const base = w.slice(0,-2);
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
  }

  // ─── Subjuntivo/imperativo (-es para -ar) ───────────────
  if (w.endsWith("es") && w.length > 3) {
    const base = w.slice(0,-2);
    if (lookupWord(base+"ar","ES")) return base+"ar";
    if (lookupWord(base+"er","ES")) return base+"er";
    if (lookupWord(base+"ir","ES")) return base+"ir";
  }

  return w;
}


/**
 * ANÁLISIS LÉXICO
 */
function lexicalAnalysis(text, lang) {
  const tokens = [];
  const errors = [];
  const lines  = text.split('\n');

  lines.forEach((line, lineIndex) => {
    const lineNumber = lineIndex + 1;
    const pattern = /[¿¡]|[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+(?:'[a-zA-Z]+)?|[\d]+|[.,!?;:"'\-]/g;
    const rawTokens = line.match(pattern);
    if (!rawTokens) return;

    rawTokens.forEach(raw => {
      const word = raw.trim();
      if (!word) return;

      // Puntuación
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

      // Número
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

      // Buscar exacto primero
      let found    = lookupWord(word, lang);
      let stemWord = word;

      // Si no encontró, usar stemmer
      if (!found) {
        stemWord = lang === 'EN' ? stemEnglish(word) : stemSpanish(word);
        if (stemWord !== word.toLowerCase()) {
          found = lookupWord(stemWord, lang);
        }
      }

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
          description: `La palabra "${word}" no se reconoce en el diccionario de ${lang === 'EN' ? 'inglés' : 'español'}.`
        });
      }
    });
  });

  return { tokens, errors };
}


/**
 * TRADUCCIÓN con diccionario (fallback si API falla)
 */
function translate(tokens, lang) {
  const parts = [];
  tokens.forEach(token => {
    if (token.type === 'Puntuación') { parts.push(token.lexeme); return; }
    if (token.type === 'Número')     { parts.push(token.lexeme); return; }
    if (token.translation) {
      const isFirst = parts.filter(p => /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/.test(p)).length === 0;
      parts.push(isFirst ? capitalize(token.translation) : token.translation);
    } else {
      parts.push(`[${token.lexeme}]`);
    }
  });

  let result = '';
  parts.forEach((part, i) => {
    if (i === 0) result += part;
    else if (DICTIONARY.punctuation[part]) result += part;
    else result += ' ' + part;
  });
  return result;
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}