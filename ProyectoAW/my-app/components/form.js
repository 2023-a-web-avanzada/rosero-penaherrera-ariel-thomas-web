'use client'
import {useReducer} from "react"
import { BiPlus} from "react-icons/bi";
import Success from "@/components/success";
import AddMachineForm from "@/components/addMachineForm";
import UpdateMachineForm from "@/components/updateMachineForm";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.nombre]: event.target.value
    }
}

export default function Form(){

   const flag = true;

    return(
        <>
            <div className="container mx-auto py-5">
                {flag?<AddMachineForm/>:<UpdateMachineForm/>}
            </div>
        </>
    )
}