import { Socket } from 'socket.io';
export declare class EventosGateway {
    private MAX_USERS_PER_ROOM;
    private rooms;
    unirseSala(message: {
        salaId: string;
        nombre: string;
    }, socket: Socket): {
        error: boolean;
    };
    enviarMensaje(message: {
        salaId: string;
        error?: boolean;
        nombre: string;
        mensaje: string;
        posicion: "D" | "I";
        board: string[][];
        ganador: boolean;
    }, socket: Socket): {
        mensaje: string;
    };
}
