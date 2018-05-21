
(function () {

    const config = {
        apiKey: "AIzaSyD41kp9ZBPJDX7-yfQJeAY_iajN0NiKZC0",
        authDomain: "compiladore2.firebaseapp.com",
        databaseURL: "https://compiladore2.firebaseio.com",
        projectId: "compiladore2",
        storageBucket: "compiladore2.appspot.com",
        messagingSenderId: "743813730441"
    };
    firebase.initializeApp(config);
    const preObject = document.getElementById('objeto')
    const ulList = document.getElementById('lista');

    const labelTitulo = document.getElementById('titulo');
    const labelExplicacion = document.getElementById('explicacion');
    //const inputCodigo1 = document.getElementById('codigo1');
    //const inputCodigo2 = document.getElementById('codigo2');
    const labelTarea = document.getElementById('tarea');

    const dbRefObject = firebase.database().ref().child('objeto');
    const dbRefList = dbRefObject.child('habilidades');
    const dbleccion = dbRefObject.child('leccion');
    const query = dbleccion.orderByChild('leccion');
    var key;
    var prueba = "hola { imprimir (\"hola\")}"
    dbleccion.orderByChild("leccion").on("child_added", function (snapshot) {
        key = (snapshot.val());
        labelTitulo.innerText = key;

    });

    dbRefList.orderByChild('titulo').on("child_added", function (snapshot) {
        let s = snapshot.val()
        if (snapshot.key == key) {
            console.log(snapshot.key)
            labelTitulo.innerText = s.titulo;
            labelExplicacion.innerText = s.explicacion;
            editor.setValue(s.codigo);
            labelTarea.innerText = s.enunciado
            prueba = s.prueba;

        }
    });

    $('#calificar').click(function (e) {
        e.preventDefault();
        var str = prueba;
        var res = str.split("=");
        var tarea = "clase tarea {"
            + "principal () { \n"
            + "si(" + res[0] + "==" + res[1] + ") "
            + "es_verdadero { imprimir (\"aprobado\"); }"
            + "es_falso { imprimir (\"reprobado\"); }"
            + "fin-si"
            + "}"

            + d3.getValue()

            + "}"

        //alert(tarea);
        socket.emit('calificar', tarea);
    });
}());




