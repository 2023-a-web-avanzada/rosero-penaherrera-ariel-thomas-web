// @ts-ignore
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
let usuario : string = "";
@WebSocketGateway(
    11202, // Puerto donde esta escuchando el servidor de websockets
    {
        cors: {
            origin: '*', // Habilitando la conexion desde cualquier IP
        }
    })
export class EventosGateway {
    private MAX_USERS_PER_ROOM = 2;
    private rooms: Record<string, { users: Socket[] }> = {};


    @SubscribeMessage('unirseSala') // Nombre metodo "unirseSala"
    unirseSala(
        @MessageBody()
            message: { salaId: string, nombre: string }, // parametros metodo
        @ConnectedSocket()
            socket: Socket
    ) {
        if (!this.rooms[message.salaId]) {
            this.rooms[message.salaId] = {users: []};
        }

        if (this.rooms[message.salaId].users.length < this.MAX_USERS_PER_ROOM) {
            socket.join(message.salaId);
            if (!this.rooms[message.salaId].users.includes(socket)) {

                this.rooms[message.salaId].users.push(socket);

                const mensajeDeBienvenidaSala = {
                    mensaje: `Bienvenido ${message.nombre} a la sala  ${message.salaId}`,
                    error: false
                };
                console.log("Se mando");
                socket.broadcast
                    .to(message.salaId)
                    .emit('escucharEventoUnirseSala', mensajeDeBienvenidaSala);
                usuario = message.nombre;
                return {error: false};
            }

        } else {
            const mensajeError = {
                mensaje: `La sala ${message.salaId} ya está llena`,
                error: true
            };
            return {error: mensajeError.error};
        }

    }

    @SubscribeMessage('enviarMensaje') // nombre del metodo "enviarMensaje"
    enviarMensaje(
        @MessageBody()
            message: {
            salaId: string
            error?: boolean,
            nombre: string,
            mensaje: string,
            posicion: "D" | "I",
            board: string[][],
            ganador: boolean
        },
        @ConnectedSocket()
            socket: Socket
    ) {
        // backend
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId,
            board: message.board,
            posicion: message.posicion,
            ganador: message.ganador
        };
        if (usuario === message.nombre) {

        } else {
            socket.broadcast
                .to(message.salaId) // Sala a la que enviamos el mensaje
                .emit('escucharEventoMensajeSala', mensajeSala); // nombre del evento y datos a enviar
            usuario = message.nombre;
            return {mensaje: 'ok'}; // Callback
        }
    }
}
