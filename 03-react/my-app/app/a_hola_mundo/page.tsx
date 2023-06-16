// /a_hola_mundo/page.tsx
/*
const a_componente = function (){
    return (
        <></>
    )}
 */

/*
export default a_componente
const b_componente = ()=>{
    return <></>
}
 */

import {DESTRUCTION} from "dns";
import DEstilosEjemplo from "@/app/componentes/DEstilosEjemplo";

export default function a_hola_mundo(){
    return (
        <>
            <h1>Hola desde a_hola_mundo</h1>
            <DEstilosEjemplo/>
        </>
    )
}