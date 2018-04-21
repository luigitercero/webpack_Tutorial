var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "text/x-pascal",
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
  });
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    console.log(info);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });

var d3 = CodeMirror.fromTextArea(document.getElementById("d3"), {
    lineNumbers: true,
    mode: "text/x-pascal",
  });
 

  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    
    marker.innerHTML = "●";
    return marker;
  }
  editor.setValue("jjj");