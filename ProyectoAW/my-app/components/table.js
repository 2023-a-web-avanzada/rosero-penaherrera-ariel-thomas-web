import {BiEdit, BiTrashAlt} from "react-icons/bi";

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
                    <tr className="bg-gray-50 text-center">
                        <td className="px-16 py-2 flex flex-row items-center">
                            <img src="#" alt=""/>
                            <span className="text-center ml-2 font-semibold text-black">Digestor</span>
                        </td>
                        <td className="px-16 py-2 text-black">
                            <span>84100007</span>
                        </td>
                        <td className="px-16 py-2 text-black">
                            <span>84100007</span>
                        </td>
                        <td className="px-16 py-2 text-black">
                            <span>970400015715</span>
                        </td>
                        <td className="px-16 py-2 text-black">
                            <button className="cursor"><span className="bg-green-500 text-white px-4 py-1 rounded">En Uso</span></button>
                        </td>
                        <td className="px-16 py-2 text-black">
                            <span>$5000</span>
                        </td>
                        <td className="px-16 py-2 text-black">
                            <span>Ing.Marco Polo</span>
                        </td>
                        <td className="px-16 py-2 flex justify-around gap-5">
                            <button className="cursor"><BiEdit size={25} color={"rgb(34,197,94)"}/></button>
                            <button className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}