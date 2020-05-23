const fs = require('fs');


//clase creación de tickets (no se exporta)
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }

}



class TicketControl {

    constructor() {

        //el último ticket del día. Lo reiniciaremos al comienzo de cada día
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //todos los tickets pdtes de atender
        this.tickets = [];
        //los q se van a ver en los escritorios html
        this.ultimos4 = [];

        let data = require('../data/data.json');


        //si la fecha de hoy coincide con la de la bbdd 
        //asignamos el último ticket de la bbdd

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;


            //sino, reiniciamos conteo con la fecha de hoy
        } else {

            this.reiniciarConteo();

        }
    }

    siguiente() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        //para borrar el primer elemento de un arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio)
            //lo agrega al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            //borramos el 'ultimo elemento del arregglo
            this.ultimos4.splice(-1, 1);

        }
        console.log('ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    //si this.hoy <> data.hoy

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        console.log('se a incializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            //grabamos arreglo tickets pdte de atender
            tickets: this.tickets,
            ultimos4: this.ultimos4


        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);



    }


}

module.exports = {

    TicketControl
}