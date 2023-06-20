export type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar?: boolean;
}
export default function CComponente(
    props: PropiedadesComponente
){
    const { url, iteraciones, mostrar} = props;

    const contenidoAdicional = ()=>{
        if(mostrar){
            return <p>Mostrar</p>
        }
        return <p>Ocultar</p>
    }

    return(
        <>
            <a target="_blank" href={url}>IR A URL</a>
            <p>Iteracion: {iteraciones}</p>
            <p>Mostrar: {mostrar}</p>
            {contenidoAdicional()}
        </>
    )
}