'use client'
import io from "socket.io-client"
import {MensajeChatProps, Posicion} from "@/app/k_websockets/types/mensaje-chat-props";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MensajeChat from "@/app/k_websockets/components/mensajeChat";
import {FormularioModelo} from "@/app/k_websockets/types/formulario-modelo";

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

            socket.on('escucharEventoUnirseSala', (data: {mensaje: string}) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Sistema',
                    posicion: Posicion.I
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            });

            socket.on('escucharEventoMensajeSala', (data: FormularioModelo) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.salaId + ' - ' + data.mensaje,
                    nombre: data.nombre,
                    posicion: Posicion.I
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                console.log('escucharEventoMensajeSala');
            })
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

    const unirseSala0EnviarMensajeASala = (data: FormularioModelo) => {
        if(data.mensaje === ''){
            //Unimos a la sala
            const dataEventoUnirseSala = {
                salaId: data.salaId,
                nombre: data.nombre,
            };
            socket.emit(
                'unirseSala', //Nombre evento
                dataEventoUnirseSala, //datos evento
                () => { //callback o respuesta del evento
                    const nuevoMensaje: MensajeChatProps = {
                        mensaje: 'Bienvenido a la sala' + dataEventoUnirseSala.salaId,
                        nombre: 'Sistema',
                        posicion: Posicion.I
                    };
                    setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                }
            );
        } else {
            //mandamos mensaje
            const dataEventoEnviarMensajeSala = {
                salaId: data.salaId,
                nombre: data.nombre,
                mensaje: data.mensaje
            };
            socket.emit(
                'enviarMensaje', //nombre evento
                dataEventoEnviarMensajeSala, //datos evento
                () => { //callback o respuesta del evento
                    const nuevoMensaje: MensajeChatProps = {
                        mensaje: data.salaId + ' - ' + data.mensaje,
                        nombre: data.nombre,
                        posicion: Posicion.D
                    };
                    setMensajes((mensajesAnteriores) => [...mensajesAnteriores,nuevoMensaje]);
                }
            );
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
                    <form onSubmit={handleSubmit(unirseSala0EnviarMensajeASala)}
                        className="m-2 p-4 border-2 border-pink-500"
                    >
                        <div className="mb-3">
                            <label htmlFor="salaId" className="form-label">Sala ID</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="EJ: 1234"
                                   id="salaId"
                                {...register('salaId',{required: 'Ingresar salaId'})}
                                aria-describedby="salaIdHelp"/>
                            <div id="salaIdHelp" className="form-text">
                                Ingresa tu idSala.
                            </div>
                            {errors.salaId &&
                                <div className="alert alert-warning" role="alert">
                                    Tiene errores {errors.salaId.message}
                                </div>
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="EJ: Adrian"
                                   id="nombre"
                                   {...register('nombre',{required: 'Nombre requerido'})}
                                   aria-describedby="nombreHelp"/>
                            <div id="nombreHelp" className="form-text">
                                Ingresa tu nombre
                            </div>
                            {errors.nombre &&
                                <div className="alert alert-warning" role="alert">
                                    Tiene errores {errors.nombre.message}
                                </div>
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mensaje" className="form-label">Mensaje</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="EJ: Mensaje"
                                   id="mensaje"
                                   {...register('mensaje')}
                                   aria-describedby="mensajeHelp"/>
                            <div id="mensajeHelp" className="form-text">
                                Ingresa tu mensaje
                            </div>
                            {errors.mensaje &&
                                <div className="alert alert-warning" role="alert">
                                    Tiene errores {errors.mensaje.message}
                                </div>
                            }
                        </div>

                        <button type="submit"
                                disabled={!isValid}
                                className="btn btn-warning">
                            Unirse a sala
                        </button>
                        <button type="reset"
                                className="btn btn-danger">
                            Reset
                        </button>
                    </form>
                </div>
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