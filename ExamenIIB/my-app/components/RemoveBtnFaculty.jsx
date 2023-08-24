'use client';
import {HiOutlineTrash} from "react-icons/hi";
import {useRouter} from "next/navigation";

export default function RemoveBtnFaculty({ idFaculty }){
    const router = useRouter();
    const removeFaculty = async () => {
        const confirmed = confirm("¿Estàs seguro que quieres eliminar la facultad?");

        if(confirmed){
            const res = await fetch(`http://localhost:3000/api/faculties?idFaculty=${idFaculty}`, {
                method: "DELETE",
            });
            if(res.ok){
                router.refresh();
            }
        } else {
            console.log("Error deleted")
        }
    };

    return(
        <>
            <button onClick={removeFaculty} className="text-red-500">
                <HiOutlineTrash size={24}/>
            </button>
        </>
    )
}