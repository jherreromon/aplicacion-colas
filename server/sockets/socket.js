const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    //estar pendiente del cliente para siguienteTicket cuando
    //el cliente apriente el boton. devolvemos un callback con la respuesta al clienet
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    //emitimos respuesta a un socket.on
    //client.emit('nombre socket', lo q envias, callback(parametro de vuelta))
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //esperar a q nos solicite el cliente atender data
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'escritorio es necesario'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //mandamos un broadcast para actualizar los escritorios
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });


    })


});