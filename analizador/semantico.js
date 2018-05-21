


function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
        interpretarArchivo(contenido);
    };
    lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}
function leccion(contenido) {
    // alert(contenido);
    console.log(contenido);


}
function interpretarArchivo(contenido) {
    let a = gramaticaLeccion.parse(contenido);
    //console.log(gramaticaLeccion.parser.treeparser.raiz)
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        let atributos = filtrarAtributos(element);
        agregarLeccion(atributos);
    }
}
function filtrarAtributos(element) {
    let arreglo = [];
    let titulo = false;
    let descripcion = false;
    let ejemplo = false;
    let tipo = false;
    let tarea = false;
    let resultado = false;
    for (let index = 0; index < element.length; index++) {
        const element2 = element[index];
        switch (element2.nombre.toLowerCase()) {
            case "titulo":
                arreglo[0] = element2.cuerpo;
                titulo = true;
                break;
            case "descripcion":
                arreglo[1] = element2.cuerpo;
                descripcion = true;
                break;
            case "ejemplo":
                arreglo[2] = element2.cuerpo;
                ejemplo = true;
                break;
            case "tipo":
                arreglo[3] = element2.cuerpo;
                tipo = true;
                break;
            case "tarea":
                arreglo[4] = element2.cuerpo;
                tarea = true;
                break;
            case "resultado":
                arreglo[5] = element2.cuerpo;
                resultado = true;
                break;
            default:
                alert(element2.nombre.toLowerCase())
        }
    }

    if (!titulo) alert("falta un titulo")
    if (!descripcion) alert("falta una descripcion")
    if (!ejemplo) alert("falta un ejemplo")
    if (!tipo) alert("falta un tipo")
    if (!tarea) alert("falta un tarea")
    if (!resultado) alert("falta un resultado")
    return arreglo;
}

function agregarLeccion(atributos) {

    console.log("hola")
    const dbRefObject = firebase.database().ref().child('objeto');
    const dbRefList = dbRefObject.child('habilidades');

    const titulo = atributos[0];
    const explicacion = atributos[1];
    const codigo = atributos[2];
    const prueba = atributos[5];
    const enunciado = atributos[4];
    const tipo = atributos[3];
    console.log(codigo);
    dbRefList.push({
        titulo: titulo,
        explicacion: explicacion,
        codigo: codigo,
        prueba: prueba,
        enunciado: enunciado,
        tipo: tipo,
    });

}

document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);
