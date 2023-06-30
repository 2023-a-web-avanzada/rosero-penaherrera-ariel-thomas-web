import {createContext} from "vm";
import {ContenedorContextObjeto} from "@/app/f_use_context/Interfaces/ContenedorContext";
import {create} from "domain";

export const ContenedorContext = createContext(
    {} as ContenedorContextObjeto
)