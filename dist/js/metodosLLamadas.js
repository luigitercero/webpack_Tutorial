var socket = io.connect();
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});


socket.on('broad', function(data) {
        $('#future').append(data + "<br/>");
  });


socket.on('archivo', function(data) {
    $('#future').append(data + "<br/>");
});


$('form').submit(function(e){
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('messages', message);
});

$('archivo').submit(function(e){
    e.preventDefault();
    var message = $('#dir').val();
    socket.emit('messages', message);
});