'use client'
// i_websockets.tsx
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Board from "./components/Board"
import io from "socket.io-client";

const servidorWebsocket = 'http://localhost:11202';
const socket = io(servidorWebsocket);

export interface  Tablero{
    salaId: string
    error?: boolean,
    nombre: string,
    mensaje: string,
    posicion: "D"|"I",
    board: string[][],
    ganador: boolean
}
export interface FormularioModelo{
    salaId: string;
    nombre: string;
    mensaje: string;
    error?: boolean;
}

export default function Page(){
    const boardInicial : Tablero = {
        mensaje: "Bienvenido" ,
        nombre: "Sistema",
        salaId: "",
        posicion: "D",
        board : [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
        ],
        ganador: false
    }
    const [isConnected, setIsConnected] = useState(socket.connected)
    const[tableroInicial, setTableroInicial] = useState(boardInicial);
    const[mensaje,setMensaje]   = useState("");
    const[habilitado, setHabilitado]   = useState(false);
    const[ganador,setGanador] = useState(false);
    const [boards, setBoards] = useState<Tablero[]>([tableroInicial]);

    const [ships, setShips] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje: '',
        },
        mode: 'all'
    })

    const obtenerDatos = (datos: FormularioModelo)=>{
        const filaRandom = Math.floor(Math.random() * 4);
        const columnaRandom = Math.floor(Math.random() * 4);

        setShips(ships.map((fila,index) => {
            if(index ==filaRandom){
                return fila.map((columna, index) => {
                    if (index == columnaRandom) {
                        return 1
                    } else {
                        return 0
                    }
                })
            }else{
                return  fila
            }
        }))
        const tableroActualizado: Tablero = {
            mensaje: "Bienvenido "+ datos.nombre + "\n"+ mensaje,
            nombre: datos.nombre,
            salaId: datos.salaId,
            posicion: "D",
            board : [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
            ],
            ganador : false
        }

        const mensajeUnirseSala = {
            salaId : tableroActualizado.salaId,
            nombre: tableroActualizado.nombre
        }

        socket.emit(
            "unirseSala", //Nombre Evento
            mensajeUnirseSala, // Datos evento
            ()=>{

            }
        )
        setBoards([tableroInicial]);
        setTableroInicial(tableroActualizado);

    }

    useEffect(
        ()=>{
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Si esta conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No esta conectado');
            });

            socket.on('escucharEventoMensajeSala', (data: Tablero) => {
                console.log('escucharEventoMensajeSala');
                console.log(data.ganador);
                const nuevoMensaje: Tablero = {
                    salaId: data.salaId,
                    mensaje: "Sala "+data.salaId + ": " + data.mensaje,
                    nombre: data.nombre,
                    posicion: 'I',
                    board: data.board,
                    ganador : data.ganador

                };

                if(nuevoMensaje.ganador){
                    setHabilitado(true);
                    tableroInicial.mensaje = "PERDISTE :(";
                    setBoards([tableroInicial, nuevoMensaje]);
                }else{
                    setHabilitado(false);}

                setBoards([tableroInicial, nuevoMensaje]);
            });

        },
        []
    )
    const  emitirTablero = (tablero: Tablero)=>{
        console.log("Emitiendo", tablero);
        socket.emit(
            "enviarMensaje", //Nombre Evento
            tablero, // Datos evento
            ()=>{
                setHabilitado(true);
                setBoards((mensajesAnteriores)=>[...mensajesAnteriores, tablero]);
            }
        )


    }
    // @ts-ignore
    const handleClick = (row, col) => {
        const newBoard : Tablero = {
            mensaje: mensaje, nombre: tableroInicial.nombre, posicion: "D", salaId: tableroInicial.salaId,
            board : Array.from(tableroInicial.board), ganador: ganador
        };
        const newShips = Array.from(ships);

        if (newShips[row][col] === 1) {
            newBoard.board[row][col] = '🚢';
            newBoard.nombre = "Sistema";
            newBoard.mensaje = "GANASTE :)";
            alert('¡Barco encontrado!');
            setHabilitado(true);
            setGanador(true);
            newBoard.ganador = true;
        } else {
            newBoard.board[row][col] = '-';

        }
        setTableroInicial(newBoard);
        emitirTablero(newBoard);
    };


    return (
        <>
                <h1>BATTLESHIP</h1>
                <div className="row">
                    <br/>
                    <div className="col-sm-6">

                        <form onSubmit={handleSubmit(obtenerDatos)} id="formulario" >
                            {mostrarFormulario && (
                                <div className="mb-3">
                                    <label htmlFor="salaId" className="form-label">Sala ID</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Ej: 1234"
                                           id="salaId"
                                           {...register("salaId", {required: "Ingresar salaID"})}
                                           aria-describedby="salaIdHelp"
                                    />
                                    <div id="salaIdHelp" className="form-text">
                                        Ingresa tu idSala
                                    </div>
                                    {errors.salaId &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores: {errors.salaId.message}
                                        </div>
                                    }
                                </div>
                            )}
                            {mostrarFormulario &&(
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Ej: Kevin"
                                           id = "nombre"
                                           {...register("nombre",{required: "Nombre requerido"})}
                                           aria-describedby="nombreHelp"
                                    />
                                    <div id="nombreHelp" className="form-text">
                                        Ingresa tu nombre.
                                    </div>
                                    {errors.nombre &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores: {errors.nombre.message}
                                        </div>
                                    }
                                </div>

                            )}
                            {!mostrarFormulario &&(
                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                    <input type="text"
                                           value={mensaje}
                                           className="form-control"
                                           placeholder="Ej: Mensaje"
                                           id = "mensaje"
                                           {...register("mensaje")}
                                           aria-describedby="mensajeHelp"
                                           onChange={(e)=>{
                                               setMensaje(e.target.value)
                                           }}

                                    />
                                    <div id="mensajeHelp" className="form-text">
                                        Ingresa tu mensaje
                                    </div>
                                    {errors.mensaje &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores: {errors.mensaje.message}
                                        </div>
                                    }
                                </div>
                            )}

                            <button type="submit"
                                    disabled={!isValid}
                                    className="btn btn-warning"
                                    onClick={()=>{setMostrarFormulario(false)}}>
                                Unirse Sala
                            </button>
                            <button type="reset"
                                    className="btn btn-danger">
                                Reset
                            </button>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        {   tableroInicial.salaId !=="" &&(
                            boards.map((tablero, indice) =>
                                <Board obtenerInformacion={handleClick}
                                       nombre={tablero.nombre}
                                       mensaje={tablero.mensaje}
                                       posicion={tablero.posicion}
                                       salaId={tablero.salaId}
                                       board={tablero.board}
                                       habilitado={habilitado}
                                       ganador={tablero.ganador}
                                ></Board>
                            )
                        )

                        }
                    </div>
                </div>
        </>
    )
}