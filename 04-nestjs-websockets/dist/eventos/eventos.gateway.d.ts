import { Socket } from 'socket.io';
export declare class EventosGateway {
    devolverHola(message: {
        mensaje: string;
    }, socket: Socket): {
        mensaje: string;
    };
    unirseSala(message: {
        salaId: string;
        nombre: string;
    }, socket: Socket): {
        mensaje: string;
    };
    enviarMensaje(message: {
        salaId: string;
        nombre: string;
        mensaje: string;
    }, socket: Socket): {
        mensaje: string;
    };
}
