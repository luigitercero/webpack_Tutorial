

let marcas = [];
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "text/x-pascal",
  gutters: ["CodeMirror-linenumbers", "breakpoints"],

  lineNumbers: true,
  lineWrapping: false,

});


var d3 = CodeMirror.fromTextArea(document.getElementById("d3"), {
  lineNumbers: true,
  mode: "text/x-pascal",

  lineNumbers: true,
  lineWrapping: true,

});