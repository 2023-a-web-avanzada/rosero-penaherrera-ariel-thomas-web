
import {Button} from "@mui/material";

export interface BattleShipChatProps {
    nombre: string;
    mensaje: string;
    posicion: 'D' | 'I',
    error? : boolean,
    salaId: string,
    board: string[][],
    habilitado: boolean,
    ganador: boolean,
    // @ts-ignore
    obtenerInformacion: (row, col) => void

}



export default function (props: BattleShipChatProps){

    const {nombre, mensaje, posicion, board, habilitado, ganador} = props

    // @ts-ignore
    function clickBoton(fila,columna){
        props.obtenerInformacion(fila,columna);
    }
    return (
        <>
            <div className="container">
                {
                    posicion === "D"?
                        <div className="left-element" style={{ textAlign: 'left' }}>
                            <p className="text-left"><strong>({nombre}): {mensaje}</strong></p>
                            {
                                board.map((row, rowIndex) => (
                                    <div key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <Button onClick={()=>{
                                                clickBoton(rowIndex,colIndex);
                                            }}
                                                    disabled={habilitado}
                                                    variant="outlined"
                                                    key={colIndex}
                                                    style={{ width: '50px', height: '50px' }}
                                            >
                                                {cell}
                                            </Button>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="left-element" style={{ textAlign: 'right' }}>
                            <p className="text-rigth"><strong>{mensaje}({nombre}) </strong></p>
                            {
                                board.map((row, rowIndex) => (
                                    <div key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <Button onClick={()=>{
                                                clickBoton(rowIndex,colIndex);
                                            }}
                                                    disabled={true}
                                                    variant="outlined"
                                                    key={colIndex}
                                                    style={{ width: '50px', height: '50px' }}
                                            >
                                                {cell}
                                            </Button>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>


        </>
    );
};