export type MensajeChatProps = {
    nombre: string;
    mensaje: string;
    posicion: Posicion
}

export enum Posicion {
    I = 'Izquierda',
    D = 'Derecha'
}