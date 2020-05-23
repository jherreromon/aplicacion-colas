var socket = io();


//recogemos parámetros x el URL
var searchParams = new URLSearchParams(window.location.search);
//preguntamos si como parametro, viene "escritorio" en la URL
//sino viene esritoario, devolvemos "index.html"

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

//buscate todos los small en la pagina html
var label = $('small');

console.log("escritorio", escritorio);

//utiizamos jquery para escribir en el html

$('h1').text('escritorio ' + escritorio);

//una vez q pulsamos el botón, enviamos (emit) respuesta
//a 'atenderTicket'
$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);
    });

});