var socket = io.connect();
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});


socket.on('broad', function(data) {
        $('#future').append(data + "<br/>");
  });
  let a = 0;
socket.on('pila', function(data) {
    if (data == "limpiar") {
        $('#pila').empty()
        a=0;
    }else{
        $('#pila').append("<tr>"
        +"<th>"+a + "</th>"
        + "<th>"+data + "</th>"
        +"</tr>"); 
        a++;
    }
});

socket.on('ambito', function(data) {
    if (data == "limpiar") {
        $('#ambito').empty()
        a=0;
    }else{
        $('#ambito').append("<tr>"
        +"<th>"+a + "</th>"
        + "<th>"+data[0] + "</th>"
        + "<th>"+data[1] + "</th>"
        +"<th>"+data[2] + "</th>"
        + "<th>"+data[3] + "</th>"
        + "<th>"+data[4] + "</th>"
        + "<th>"+data[5] + "</th>"
        + "<th>"+data[6] + "</th>"
        + "<th>"+data[7] + "</th>"
        +"</tr>"); 
        a++;
    }
});
socket.on('ptr',function(data){
    $('#ptr').empty()
    $('#ptr').append("ptr: "+data);
})
socket.on('pth',function(data){
    $('#pth').empty()
    $('#pth').append("pth: "+data);
})

socket.on('op',function(data){
    $('#op').empty()
    $('#op').append("op: "+data);
})


socket.on('heap', function(data) {
    
    if (data == "limpiar") {
        $('#heap').empty()
        a=0;
    }else {
        $('#heap').append("<tr>"
        +"<th>"+a + "</th>"
        + "<th>"+data + "</th>"
        +"</tr>"); 
        a++;
    }
   
    
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


$('#auto').click(function(e){
    e.preventDefault();
    socket.emit('auto', "a siguienteLinea");
});

$('#alto').click(function(e){
    e.preventDefault();
    socket.emit('alto', "a siguienteLinea");
});

