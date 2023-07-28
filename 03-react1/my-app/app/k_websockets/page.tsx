'use client'
import io from "socket.io-client"
import {MensajeChatProps, Posicion} from "@/app/k_websockets/types/mensaje-chat-props";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MensajeChat from "@/app/k_websockets/components/mensajeChat";

const servidorWebsocket = 'http://localhost:11202';
const socket = io(servidorWebsocket);

export default function Page(){
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);
    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje: '',
        },
        mode: 'all'
    })

    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Si esta conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No esta conectado');
            });

            socket.on('escucharEventoHola', (data: { mensaje: string }) => {
                console.log('escucharEventoHola', data);
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Sistema',
                    posicion: Posicion.I
                };
                setMensajes((mensajesAnteriores) => [
                    ...mensajesAnteriores,
                    nuevoMensaje]
                );
            });
        },
        []
    )

    const enviarEventoHola = () => {
        const mensaje = {mensaje: 'Adrian'}
        socket.emit(
            'hola', //Nombre evento
            mensaje, //Datos evento
            (datosEventoHola: { mensaje: string; }) => {
                //callback o respuesta del evento
                console.log(datosEventoHola)
                // const [arreglo, setArreglo] = useState([1,2])
                // setArreglo( [1,2,3] )
                // setArreglo( ([1,2]) => [...[1,2],  3])
                const nuevoMensaje: MensajeChatProps = {
                    ...mensaje,
                    nombre: 'Adrian',
                    posicion: Posicion.D
                };
                setMensajes(
                    (mensajesAnteriores) => [
                        ...mensajesAnteriores,
                        nuevoMensaje
                    ]);
            }
        )
    }

    const estaConectado = ()=>{
        if(isConnected){
            return <span>Conectado :)</span>
        }else{
            return <span>Descontectado :(</span>
        }
    }

    return (
        <>
            <h1>Websockets</h1>
            <p><strong>{estaConectado()}</strong></p>
            <button className={'btn btn-success'}
                    onClick={()=> enviarEventoHola()}>
                Enviar evento hola
            </button>

            <div className="row">
                <div className="col-sm-6">
                    <div className="border-2 border-sky-500 p-4 m-2">
                        {mensajes.map((mensaje, indice) =>
                            <MensajeChat key={indice}
                                         mensaje={mensaje.mensaje}
                                         nombre={mensaje.nombre}
                                         posicion={mensaje.posicion}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}