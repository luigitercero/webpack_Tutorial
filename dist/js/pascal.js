// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("pascal", function() {
  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }
  var keywords = words("variable vacio true false entero decimal lista pila cola " +
"caracter booleano concatenar imprimir convertiracadena convertiraentero " +
"clase publico privado protegido este hereda_de importar @sobrescribir retorno " +
"principal nuevo nada romper continuar estructura crearpuntero obtenerdireccion " +
"reservarmemoria consultartamanio destruirpuntero fin-si si es_verdadero es_falso  " +
"evaluar_si es_igual_a defecto repetir_mientras hacer mientras ciclo_doble_condicion " +
"repetir hasta_que repetir_contando hasta desde enciclar contador leer_teclado funcion puntero");
  var atoms = {"null": true};

  var isOperatorChar = /[+\*&%=<>!?|\/]/;

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == "#" && state.startOfLine) {
      stream.skipToEnd();
      return "meta";
    }
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }
    if (ch == "/" && stream.eat("*")) {
      state.tokenize = tokenComment;
      return tokenComment(stream, state);
    }
    if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return null;
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\w\.]/);
      return "number";
    }
    if (ch == "/") {
      if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
    }
    if (isOperatorChar.test(ch)) {
      stream.eatWhile(isOperatorChar);
      return "operator";
    }
    stream.eatWhile(/[\w\$_]/);
    var cur = stream.current();
    if (keywords.propertyIsEnumerable(cur.toLowerCase())) return "keyword";
    if (atoms.propertyIsEnumerable(cur.toLowerCase())) return "atom";
    return "variable";
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next, end = false;
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) {end = true; break;}
        escaped = !escaped && next == "\\";
      }
      if (end || !escaped) state.tokenize = null;
      return "string";
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return "comment";
  }

  // Interface

  return {
    startState: function() {
      return {tokenize: null};
    },

    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style == "comment" || style == "meta") return style;
      return style;
    },

    electricChars: "{}"
  };
});

CodeMirror.defineMIME("text/x-pascal", "pascal");

});
