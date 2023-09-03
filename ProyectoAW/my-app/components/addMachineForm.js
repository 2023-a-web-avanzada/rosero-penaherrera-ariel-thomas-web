'use client'
import {useReducer} from "react"
import { BiPlus} from "react-icons/bi";
import Success from "@/components/success";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.nombre]: event.target.value
    }
}

export default function AddMachineForm(){

    const[formData, setFormData] = useReducer(formReducer,{})

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(formData).length === 0) return console.log("Don't have Form Data");
        console.log(formData)
    }

    if(Object.keys(formData).length > 0) return <Success message={"Data Added"}/>

    return(
        <>
            <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
                <div className="input-type">
                    <input type="text" name="nombre" onChange={setFormData}
                           className="border w-full px-5 py-3 focus:outline-none rounded-md text-gray-800" placeholder="Nombre"/>
                </div>
                <div className="input-type">
                    <input type="text" name="codBienes" onChange={setFormData}
                           className="border w-full px-5 py-3 focus:outline-none rounded-md text-gray-800" placeholder="Codigo de Bienes"/>
                </div>
                <div className="input-type">
                    <input type="text" name="marcamodelo" onChange={setFormData}
                           className="border w-full px-5 py-3 focus:outline-none rounded-md text-gray-800" placeholder="Marca/Modelo"/>
                </div>
                <div className="input-type">
                    <input type="text" name="nSerie" onChange={setFormData}
                           className="border w-full px-5 py-3 focus:outline-none rounded-md text-gray-800" placeholder="Número de Serie"/>
                </div>
                <div className="flex gap-10 items-center">
                    <div className="form-check">
                        <input type="radio" name="status" value="active" id="radioDefault1" onChange={setFormData}
                               className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                        <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                            En Uso
                        </label>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="status" value="inactive" id="radioDefault1" onChange={setFormData}
                               className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                        <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                            De Baja
                        </label>
                    </div>
                </div>
                <div className="input-type">
                    <input type="text" name="costo" onChange={setFormData}
                           className="border w-full px-5 py-3 focus:outline-none rounded-md text-gray-800" placeholder="Costo"/>
                </div>
                <div className="input-type">
                    <input type="text" name="custodio" onChange={setFormData}
                           className="border w-full px-5 py-3 focus:outline-none rounded-md text-gray-800" placeholder="Custodio"/>
                </div>

                <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                    Añadir <span className="px-1"><BiPlus size={24}></BiPlus></span>
                </button>
            </form>
        </>
    )
}