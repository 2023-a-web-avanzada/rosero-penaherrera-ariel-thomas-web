export type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar?: boolean;
    //colorIteracion?: string;
}

export default function CComponente(
    props: PropiedadesComponente
){
    const { url , iteraciones, mostrar} = props;
    return(
        <>
            <a target="_blank" href={url}> IR A URL</a>
            <p> Iteracion: {iteraciones}</p>
            <p> Mostrar: {mostrar}</p>
        </>
    )
}