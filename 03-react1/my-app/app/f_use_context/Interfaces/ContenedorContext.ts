import {Property} from "csstype";
import {Dispatch, SetStateAction} from "react";

export interface ContenedorContextObjeto{
    nombreUsuario:string;
    setNombreUsuario:Dispatch<SetStateAction<string>>
}