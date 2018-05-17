
let marcas = [];
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "text/x-pascal",
    gutters: ["CodeMirror-linenumbers", "breakpoints"],
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    autofocus:false
  });
  
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    console.log(info);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
    let numerolineas = n +1;
    if (typeof marcas[numerolineas]==='undefined') {
      marcas[numerolineas] =numerolineas;
      console.log(marcas[numerolineas] + " agregando");
    }else {
      delete marcas[numerolineas];
      console.log(marcas[numerolineas]+" elimina")
    }
  });

var d3 = CodeMirror.fromTextArea(document.getElementById("d3"), {
    lineNumbers: true,
    mode: "text/x-pascal",
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    autofocus:false
  });
 

  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    
    marker.innerHTML = "●";
    return marker;
  }
