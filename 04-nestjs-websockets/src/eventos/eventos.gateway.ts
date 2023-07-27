import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
@WebSocketGateway(
    11202, // Puerto donde esta escuchando el servidor de websockets
    {
        cors: {
            origin: '*', // Habilitando la conexion desde cualquier IP
        }
    })
export class EventosGateway{
    @SubscribeMessage('hola') // Nombre del metodo para recibir eventos
    devolverHola(
        @MessageBody()
            message: { mensaje: string },
        @ConnectedSocket()
            socket: Socket // import {Server, Socket} from 'socket.io';
    ) {
        console.log('message', message);
        socket.broadcast // broadcast = > TODOS LOS CLIENTES CONECTADOS Y que esten escuchando el evento "escucharEventoHola" les llegue el mensaje
            .emit(
                'escucharEventoHola', //  Nombre evento que vamos a enviar a los clientes conectados
                { // OBJETO A ENVIAR
                    mensaje: 'Bienvenido ' + message.mensaje
                });
        return {mensaje: 'ok'}; // Callback del metodo "hola"
    }

    @SubscribeMessage('unirseSala') // Nombre metodo "unirseSala"
    unirseSala(
        @MessageBody()
            message: { salaId: string, nombre: string }, // parametros metodo
        @ConnectedSocket()
            socket: Socket
    ) {
        socket.join(message.salaId); // socket.join agrupa a los clientes de websockets
                                     // segun un identificador. Al unirse a una sala
                                     // podemos escuchar los mensajes de esa sala.
        const mensajeDeBienvenidaSala = {
            mensaje: `Bienvenido ${message.nombre} a la sala ${message.salaId}`};
        socket.broadcast
            .to(message.salaId) // Manda el mensaje a un grupo en especifico segun el Idenfiticador
            .emit('escucharEventoUnirseSala',   // los que ESCUCHAN el evento en este grupo
                mensajeDeBienvenidaSala);       // reciben ese mensaje
        return {mensaje: 'ok'}; // Callback del metodo "unirseSala"
    }

    @SubscribeMessage('enviarMensaje') // nombre del metodo "enviarMensaje"
    enviarMensaje(
        @MessageBody()
            message: { salaId: string, nombre: string, mensaje: string },
        @ConnectedSocket()
            socket: Socket
    ) {
        // backend
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        };
        socket.broadcast
            .to(message.salaId) // Sala a la que enviamos el mensaje
            .emit('escucharEventoMensajeSala', mensajeSala); // nombre del evento y datos a enviar
        return {mensaje: 'ok'}; // Callback
    }

}