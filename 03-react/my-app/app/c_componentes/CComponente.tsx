import {useState} from "react";

export type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar?: boolean;
    colorIteracion?: string;
}
export default function CComponente(
    props: PropiedadesComponente
){
    //const ulr = props.url
    //const iteraciones = props.iteraciones
    //const mostrar = props.mostrar
    let { url, iteraciones, mostrar, colorIteracion = "bg-yellow-500"} = props;
    const arreglo = [0,1]
    //const numeroUno = arreglo[0]
    //const numeroDos = arreglo[1]
    let [numeroUno, numeroDos] = arreglo

    const contenidoAdicional = ()=>{
        if(mostrar){
            return <p>Mostrar</p>
        }
        return <p>Ocultar</p>
    }

    //useState
    const [ iteracionLocal, setIteracionLocal ] = useState(
        1, //valor de la variable
    ) // click al boton,cmabiar el classname de bg-yellow-500 a bg-red-500 y cuando vuelva a dar click de nuevo cambiar.

    //UseState Color
    const [ colorIteracionesLocal, setColorIteracionesLocal] = useState(
        colorIteracion
    )

    return(
        <div className="border border-solid border-black p-3 m-2">
            <a target="_blank" href={url}>IR A URL</a>
            <p className={colorIteracion}>Iteracion: {iteraciones} {iteracionLocal}</p>
            <p>Mostrar: {mostrar}</p>
            {contenidoAdicional()}
            { mostrar && <p>Mostrar Rapido</p>}

            <button className="border border-solid border-black bg-blue-500" onClick={
                (event)=> {
                    setIteracionLocal(iteracionLocal + 1);
                    if(colorIteracionesLocal == "bg-yellow-500"){
                        setColorIteracionesLocal("bg-red-500");
                    } else {
                        setColorIteracionesLocal("bg-yellow-500");
                    }
                    console.log(event);
                }
            }> Aumentar </button>
        </div>
    )
}