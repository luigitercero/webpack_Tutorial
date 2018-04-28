var socket = io.connect();
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});


socket.on('broad', function(data) {
        $('#future').append(data + "<br/>");
  });

socket.on('pila', function(data) {
    $('#pila').empty()
    let a =0;
    data.forEach(element => {
        $('#pila').append("<tr>"
        +"<th>"+a + "</th>"
        + "<th>"+element + "</th>"
        +"</tr>"); 
        a++;
    }); 
});

socket.on('heap', function(data) {
    
    $('#heap').empty()
    let a = 0;
    data.forEach(element => {
        $('#heap').append("<tr>"
            +"<th>"+a + "</th>"
            + "<th>"+element + "</th>"
            +"</tr>"); 
            a++;
    });   
});

socket.on('archivo', function(data) {
    editor.setValue(data);
});

socket.on('generar', function(data) {
    d3.setValue(data);
    
});

socket.on('nuevaPoss', function(data) {
    //alert(JSON.stringify(data));
    editor.setCursor({'line':data[3]-1,'ch':0});
    d3.setCursor({'line':data[0]-1,'ch':0});
});

socket.on('consola', function(data) {
    //alert(JSON.stringify(data));
    $('#consola').empty()
    let a = 0;
    data.forEach(element => {
        $('#consola').append("<tr>"
            + "<th>"+element + "</th>"
            +"</tr>"); 
            a++;
    });
});

socket.on('salidaerror', function(data) {
   // alert(JSON.stringify(data));
    $('#error').val(data);
});

$('#chat_form').submit(function(e){
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('messages', message);    
});

$('#archivo').submit(function(e){
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('archivo', message);
});

$('#ejecutar').click(function(e){
    e.preventDefault();
    let valor = editor.getValue();
    socket.emit('generar', valor);
});

$('#debuguear').click(function(e){
    e.preventDefault();
    socket.emit('debuguear',  marcas);
});

$('#siguiente').click(function(e){
    e.preventDefault();
    socket.emit('siguiente', "a siguienteLinea");
});


