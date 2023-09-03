import {BiEdit, BiTrashAlt} from "react-icons/bi";
import data from "../database/data.json"

export default function Table(){
    return (
        <>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Nombre</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">CódigoBienes</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Marca/Modelo</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">No.Serie</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Estado</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Costo</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Custodio</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                {
                    data.map((obj,i) => <Tr {...obj} key={i} />)
                }
                </tbody>
            </table>
        </>
    )
}

function Tr({id,avatar,nombre,codBienes,marcamodelo,nSerie,status,costo,custodio}){
    return (
        <>
            <tr className="bg-gray-50 text-center">
                <td className="px-16 py-2 flex flex-row items-center">
                    <img src={avatar || '#'} alt=""/>
                    <span className="text-center ml-2 font-semibold text-black">{nombre || "Desconocido"}</span>
                </td>
                <td className="px-16 py-2 text-black">
                    <span>{codBienes || "Desconocido"}</span>
                </td>
                <td className="px-16 py-2 text-black">
                    <span>{marcamodelo || "Desconocido"}</span>
                </td>
                <td className="px-16 py-2 text-black">
                    <span>{nSerie || "Desconocido"}</span>
                </td>
                <td className="px-16 py-2 text-black">
                    <button className="cursor"><span className="bg-green-500 text-white px-4 py-1 rounded">{status || "Desconocido"}</span></button>
                </td>
                <td className="px-16 py-2 text-black">
                    <span>{costo || "0"}</span>
                </td>
                <td className="px-16 py-2 text-black">
                    <span>{custodio || "Desconocido"}</span>
                </td>
                <td className="px-16 py-2 flex justify-around gap-5">
                    <button className="cursor"><BiEdit size={25} color={"rgb(34,197,94)"}/></button>
                    <button className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}/></button>
                </td>
            </tr>
        </>
    )
}