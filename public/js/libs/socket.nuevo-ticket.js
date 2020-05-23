//comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

//recibimos conexion del servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//recibimos mensaje de desconexion desde el servidor
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
});

//con socket.on, somos receptores de lo q manda el servidor
//en resp, recibimos un objeto del servidor
//actual: ticketControl.getUltimoTicket()
socket.on('estadoActual', function(resp) {
    console.log(resp)
    label.text(resp.actual);
})

//con la pulsación, habilitamos en jquery, el evento click
// para cualquier elemento. hacemos socket.emit (conexion de solicitud) para que servidro nos devuelva
//en callback la tecla siguiente

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});