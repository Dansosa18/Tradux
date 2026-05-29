// =============================================
// TRADUX — lexer.js
// Analizador Léxico con clasificación inteligente por patrones
// =============================================

/**
 * CACHE de clasificaciones
 */
const aiClassificationCache = {};

/**
 * Clasifica una palabra desconocida usando patrones lingüísticos
 * No necesita API externa — funciona offline
 */
function classifyUnknownWord(word, lang) {
  const w = word.toLowerCase();

  if (lang === 'EN') {
    // ── Sufijos de VERBOS en inglés ──────────────────
    if (/(?:ify|ize|ise|ate|en|fy)$/.test(w))
      return { type: 'Verbo', subtype: 'acción', translation: null };
    if (/(?:ing)$/.test(w) && w.length > 4)
      return { type: 'Verbo', subtype: 'gerundio', translation: null };
    if (/(?:ed)$/.test(w) && w.length > 4)
      return { type: 'Verbo', subtype: 'pasado', translation: null };

    // ── Sufijos de ADJETIVOS en inglés ──────────────
    if (/(?:ful|less|ous|ious|able|ible|al|ial|ic|ical|ive|ative|ish|like|ly|ent|ant|ary|ory|some|ward|wise)$/.test(w))
      return { type: 'Adjetivo', subtype: 'descriptivo', translation: null };

    // ── Sufijos de ADVERBIOS en inglés ──────────────
    if (/(?:ly)$/.test(w) && w.length > 4)
      return { type: 'Adverbio', subtype: 'modo', translation: null };

    // ── Sufijos de SUSTANTIVOS en inglés ────────────
    if (/(?:tion|sion|ment|ness|ity|ty|ism|ist|er|or|eur|ess|ance|ence|hood|ship|dom|age|ure|ry|ery|ary|ory|ee|eer|ier)$/.test(w))
      return { type: 'Sustantivo', subtype: 'común', translation: null };

    // ── Palabras cortas comunes sin sufijo → Sustantivo por defecto
    return { type: 'Sustantivo', subtype: 'común', translation: null };

  } else {
    // ── Sufijos de VERBOS en español ────────────────
    if (/(?:ar|er|ir)$/.test(w) && w.length > 3)
      return { type: 'Verbo', subtype: 'infinitivo', translation: null };
    if (/(?:ando|iendo)$/.test(w))
      return { type: 'Verbo', subtype: 'gerundio', translation: null };
    if (/(?:ado|ido)$/.test(w) && w.length > 4)
      return { type: 'Verbo', subtype: 'participio', translation: null };

    // ── Sufijos de ADJETIVOS en español ─────────────
    if (/(?:oso|osa|oso|ivo|iva|able|ible|al|ial|ico|ica|ario|aria|orio|oria|nte|ante|iente)$/.test(w))
      return { type: 'Adjetivo', subtype: 'descriptivo', translation: null };

    // ── Sufijos de ADVERBIOS en español ─────────────
    if (/(?:mente)$/.test(w))
      return { type: 'Adverbio', subtype: 'modo', translation: null };

    // ── Sufijos de SUSTANTIVOS en español ───────────
    if (/(?:ción|sión|ción|dad|tad|eza|ura|ismo|ista|ero|era|ería|aje|miento|mento|anza|encia|ancia)$/.test(w))
      return { type: 'Sustantivo', subtype: 'común', translation: null };

    return { type: 'Sustantivo', subtype: 'común', translation: null };
  }
}


/**
 * STEMMER INGLÉS
 */
function stemEnglish(word) {
  const w = word.toLowerCase();
  const irregulars = {
    "am":"be","is":"be","are":"be","was":"be","were":"be","been":"be",
    "has":"have","had":"have","did":"do","does":"do",
    "went":"go","goes":"go","came":"come","ran":"run","ate":"eat",
    "drank":"drink","slept":"sleep","wrote":"write","spoke":"speak",
    "saw":"see","heard":"hear","knew":"know","thought":"think",
    "said":"say","gave":"give","took":"take","made":"make",
    "found":"find","told":"tell","got":"get","began":"begin",
    "felt":"feel","left":"leave","tried":"try","built":"build",
    "broke":"break","caught":"catch","threw":"throw","chose":"choose",
    "flew":"fly","swam":"swim","sang":"sing","drew":"draw",
    "grew":"grow","fell":"fall","rose":"rise","sat":"sit",
    "stood":"stand","won":"win","lost":"lose","paid":"pay",
    "sent":"send","met":"meet","sold":"sell","bought":"buy",
    "taught":"teach","understood":"understand","forgot":"forget",
    "learned":"learn","called":"call","used":"use","loved":"love",
    "worked":"work","played":"play","helped":"help","lived":"live",
    "studied":"study",
  };
  if (irregulars[w]) return irregulars[w];
  if (w.endsWith("ies") && w.length > 4) return w.slice(0,-3) + "y";
  if (w.endsWith("es") && w.length > 3) { const s=w.slice(0,-2); if(lookupWord(s,"EN")) return s; }
  if (w.endsWith("s")  && w.length > 3) { const s=w.slice(0,-1); if(lookupWord(s,"EN")) return s; }
  if (w.endsWith("ing")&& w.length > 5) {
    const s1=w.slice(0,-3), s2=w.slice(0,-3)+"e";
    if(lookupWord(s1,"EN")) return s1; if(lookupWord(s2,"EN")) return s2;
  }
  if (w.endsWith("ed") && w.length > 4) {
    const s1=w.slice(0,-2), s2=w.slice(0,-1);
    if(lookupWord(s1,"EN")) return s1; if(lookupWord(s2,"EN")) return s2;
  }
  if (w.endsWith("ly") && w.length > 4) { const s=w.slice(0,-2); if(lookupWord(s,"EN")) return s; }
  return w;
}

/**
 * STEMMER ESPAÑOL
 */
function stemSpanish(word) {
  const w = word.toLowerCase();
  const irregulars = {
    "soy":"ser","eres":"ser","somos":"ser","son":"ser",
    "estoy":"estar","estás":"estar","estamos":"estar","están":"estar",
    "fui":"ir","fue":"ir","fuimos":"ir","fueron":"ir",
    "voy":"ir","vas":"ir","vamos":"ir","van":"ir",
    "tengo":"tener","tienes":"tener","tenemos":"tener","tienen":"tener",
    "tuvo":"tener","tuve":"tener","tuvimos":"tener","tuvieron":"tener",
    "puedo":"poder","puedes":"poder","podemos":"poder","pueden":"poder",
    "pudo":"poder","pude":"poder","pudimos":"poder","pudieron":"poder",
    "hago":"hacer","haces":"hacer","hacemos":"hacer","hacen":"hacer",
    "hizo":"hacer","hice":"hacer","hicimos":"hacer","hicieron":"hacer",
    "digo":"decir","dices":"decir","decimos":"decir","dicen":"decir",
    "dijo":"decir","dije":"decir","dijimos":"decir","dijeron":"decir",
    "vengo":"venir","vienes":"venir","venimos":"venir","vienen":"venir",
    "vino":"venir","vine":"venir","vinimos":"venir","vinieron":"venir",
    "quiero":"querer","quieres":"querer","queremos":"querer","quieren":"querer",
    "quiso":"querer","quise":"querer","quisimos":"querer","quisieron":"querer",
    "sé":"saber","sabes":"saber","sabemos":"saber","saben":"saber",
    "supo":"saber","supe":"saber","supimos":"saber","supieron":"saber",
    "veo":"ver","ves":"ver","vemos":"ver","ven":"ver",
    "vio":"ver","vi":"ver","vimos":"ver","vieron":"ver",
    "doy":"dar","das":"dar","damos":"dar","dan":"dar",
    "dio":"dar","di":"dar","dimos":"dar","dieron":"dar",
    "leo":"leer","lees":"leer","leemos":"leer","leen":"leer",
    "leyó":"leer","leí":"leer","leímos":"leer","leyeron":"leer",
    "traigo":"traer","traes":"traer","traemos":"traer","traen":"traer",
    "trajo":"traer","traje":"traer","trajimos":"traer","trajeron":"traer",
    "pongo":"poner","pones":"poner","ponemos":"poner","ponen":"poner",
    "puso":"poner","puse":"poner","pusimos":"poner","pusieron":"poner",
    "salgo":"salir","sales":"salir","salimos":"salir","salen":"salir",
    "salió":"salir","salí":"salir","salieron":"salir",
    "siento":"sentir","sientes":"sentir","sentimos":"sentir","sienten":"sentir",
    "sintió":"sentir","sentí":"sentir","sintieron":"sentir",
    "pienso":"pensar","piensas":"pensar","pensamos":"pensar","piensan":"pensar",
    "juego":"jugar","juegas":"jugar","jugamos":"jugar","juegan":"jugar",
    "jugó":"jugar","jugué":"jugar","jugaron":"jugar",
    "duermo":"dormir","duermes":"dormir","dormimos":"dormir","duermen":"dormir",
    "durmió":"dormir","dormí":"dormir","durmieron":"dormir",
    "pido":"pedir","pides":"pedir","pedimos":"pedir","piden":"pedir",
    "pidió":"pedir","pedí":"pedir","pidieron":"pedir",
    "escribo":"escribir","escribes":"escribir","escribimos":"escribir","escriben":"escribir",
    "escribió":"escribir","escribí":"escribir","escribieron":"escribir",
    "estuvo":"estar","estuve":"estar","estuvimos":"estar","estuvieron":"estar",
    "podría":"poder","podrías":"poder","podríamos":"poder","podrían":"poder",
    "debo":"deber","debes":"deber","debemos":"deber","deben":"deber",
    "debió":"deber","debí":"deber","debimos":"deber","debieron":"deber",
  };
  if (irregulars[w]) return irregulars[w];

  if (w.endsWith("ó") && w.length > 3) {
    const base = w.slice(0,-1);
    const candidates = [base+"ar",base+"er",base+"ir",base.slice(0,-1)+"er",base.slice(0,-1)+"ar",base.slice(0,-1)+"ir"];
    for (const c of candidates) { if (lookupWord(c,"ES")) return c; }
  }
  if ((w.endsWith("é")||w.endsWith("í")) && w.length > 3) {
    const base = w.slice(0,-1);
    const candidates = [base+"ar",base+"er",base+"ir",base.slice(0,-1)+"er",base.slice(0,-1)+"ar",base.slice(0,-1)+"ir"];
    for (const c of candidates) { if (lookupWord(c,"ES")) return c; }
  }
  if (w.endsWith("amos") && w.length > 5) { const b=w.slice(0,-4); if(lookupWord(b+"ar","ES")) return b+"ar"; if(lookupWord(b+"er","ES")) return b+"er"; }
  if (w.endsWith("imos") && w.length > 5) { const b=w.slice(0,-4); if(lookupWord(b+"ir","ES")) return b+"ir"; if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b.slice(0,-1)+"er","ES")) return b.slice(0,-1)+"er"; }
  if (w.endsWith("emos") && w.length > 5) { const b=w.slice(0,-4); if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b+"ar","ES")) return b+"ar"; }
  if (w.endsWith("aron") && w.length > 5) { const b=w.slice(0,-4); if(lookupWord(b+"ar","ES")) return b+"ar"; }
  if (w.endsWith("ieron")&& w.length > 6) { const b=w.slice(0,-5); if(lookupWord(b+"ir","ES")) return b+"ir"; if(lookupWord(b+"er","ES")) return b+"er"; }
  if (w.endsWith("ando") && w.length > 5) { const b=w.slice(0,-4); if(lookupWord(b+"ar","ES")) return b+"ar"; }
  if (w.endsWith("iendo")&& w.length > 6) { const b=w.slice(0,-5); if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b+"ir","ES")) return b+"ir"; }
  if (w.endsWith("aba")  && w.length > 4) return w.slice(0,-3)+"ar";
  if (w.endsWith("abas") && w.length > 5) return w.slice(0,-4)+"ar";
  if (w.endsWith("aban") && w.length > 5) return w.slice(0,-4)+"ar";
  if (w.endsWith("ía")   && w.length > 3) { const b=w.slice(0,-2); if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b+"ir","ES")) return b+"ir"; }
  if (w.endsWith("a")    && w.length > 3) { const b=w.slice(0,-1); if(lookupWord(b+"ar","ES")) return b+"ar"; }
  if (w.endsWith("e")    && w.length > 3) { const b=w.slice(0,-1); if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b+"ir","ES")) return b+"ir"; }
  if (w.endsWith("an")   && w.length > 3) { const b=w.slice(0,-2); if(lookupWord(b+"ar","ES")) return b+"ar"; }
  if (w.endsWith("en")   && w.length > 3) { const b=w.slice(0,-2); if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b+"ir","ES")) return b+"ir"; }
  if (w.endsWith("es")   && w.length > 3) { const b=w.slice(0,-2); if(lookupWord(b+"ar","ES")) return b+"ar"; if(lookupWord(b+"er","ES")) return b+"er"; if(lookupWord(b+"ir","ES")) return b+"ir"; }
  return w;
}


/**
 * ANÁLISIS LÉXICO — síncrono, sin necesitar API externa
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

      // Buscar en diccionario (exacto primero, luego con stemmer)
      let found    = lookupWord(word, lang);
      let stemWord = word;
      if (!found) {
        stemWord = lang === 'EN' ? stemEnglish(word) : stemSpanish(word);
        if (stemWord !== word.toLowerCase()) found = lookupWord(stemWord, lang);
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
        // ✅ Clasificación inteligente por patrones — sin API
        const inferred = classifyUnknownWord(word, lang);
        tokens.push({
          lexeme:         word,
          type:           inferred.type,
          category:       inferred.type,
          subtype:        inferred.subtype,
          translation:    inferred.translation,
          line:           lineNumber,
          classifiedByAI: true   // marca visual de inferido
        });
        // No se agrega a errors — fue clasificado correctamente
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