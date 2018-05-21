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

    const inputTitulo = document.getElementById('titulo');
    const inputExplicacion = document.getElementById('explicacion');
    const inputCodigo = document.getElementById('codigo');
    const inputEnunciado = document.getElementById('enunciado');
    const inputPrueba = document.getElementById('prueba');
    const btnSend = document.getElementById('btnSend');

    const dbRefObject = firebase.database().ref().child('objeto');
    const dbRefList = dbRefObject.child('habilidades');

    btnSend.addEventListener('click', e => {
        const titulo = inputTitulo.value;
        const explicacion = inputExplicacion.value;
        const codigo = editor.getValue();
        const prueba = inputPrueba.value;
        const enunciado = inputEnunciado.value;
        dbRefList.push({
            titulo: titulo,
            explicacion: explicacion,
            codigo: codigo,
            prueba: prueba,
            enunciado: enunciado
        });
    })
    const btnCarga = document.getElementById('file-input');


}());
