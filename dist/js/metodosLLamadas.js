var socket = io.connect();
socket.on('connect', function (data) {
    socket.emit('join', 'Hello World from client');
});


socket.on('pedir', function (data) {
   let datos =  prompt(data);
   socket.emit('meter', datos);
});

socket.on('broad', function (data) {
    $('#future').append(data + "<br/>");
});
let a = 0;
socket.on('pila', function (data) {
    if (data == "limpiar") {
        $('#pila').empty()
    } else {
        $('#pila').append(data);
    }
});
socket.on('heap', function (data) {

    if (data == "limpiar") {
        $('#heap').empty()
    } else {
        $('#heap').append(data);
    }

});
socket.on('ambito', function (data) {
    if (data == "limpiar") {
        $('#ambito').empty()
    } else {
        $('#ambito').append(data);

    }
});
socket.on('ptr', function (data) {
    $('#ptr').empty()
    $('#ptr').append("ptr: " + data);
})
socket.on('pth', function (data) {
    $('#pth').empty()
    $('#pth').append("pth: " + data);
})

socket.on('op', function (data) {
    $('#op').empty()
    $('#op').append("op: " + data);
})

socket.on('archivo', function (data) {
    editor.setValue(data);
    marcas = [];

});

socket.on('generar', function (data) {
    d3.setValue(data);

});

socket.on('nuevaPoss', function (data) {
    //alert(JSON.stringify(data));
    if (data[2] != -1) {
        editor.setCursor({ 'line': data[3] - 1, 'ch': 0 });
    }

    d3.setCursor({ 'line': data[0] - 1, 'ch': 0 });
});

socket.on('consola', function (data) {
    //alert(JSON.stringify(data));
    $('#consola').empty()
    let a = 0;
    data.forEach(element => {
        $('#consola').append("<tr>"
            + "<th>" + element + "</th>"
            + "</tr>");
        a++;
    });
});

socket.on('consolaP', function (data) {
    //alert(JSON.stringify(data));
    alert(data);
});

socket.on('salidaerror', function (data) {
    // alert(JSON.stringify(data));
    $('#error').val(data);
    alert("error: " + data);
});

$('#chat_form').submit(function (e) {
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('messages', message);
});

$('#archivo').submit(function (e) {
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('archivo', message);
});

$('#ejecutar').click(function (e) {
    e.preventDefault();
    let valor = editor.getValue();
    socket.emit('generar', valor);
});

$('#debuguear').click(function (e) {
    e.preventDefault();
    let mar = []
    for (let index = 0; index < marcas.length; index++) {
        const element = marcas[index];
        if (element != null) {
            mar.push(marcas[index]);
        }
    }
    socket.emit('debuguear', mar);
});

$('#siguiente').click(function (e) {
    e.preventDefault();
    socket.emit('siguiente', "a siguienteLinea");
});


$('#auto').click(function (e) {
    e.preventDefault();
    socket.emit('auto', "a siguienteLinea");
});

$('#alto').click(function (e) {
    e.preventDefault();
    socket.emit('alto', "a siguienteLinea");
});

$('#probar').click(function (e) {
    //alert("probar")
    e.preventDefault();
    socket.emit('probar', editor.getValue());
});
