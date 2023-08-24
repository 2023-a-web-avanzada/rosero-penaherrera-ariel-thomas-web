'use client';
import {HiOutlineTrash} from "react-icons/hi";
import {useRouter} from "next/navigation";

export default function RemoveBtn({ idUniversity }){
   const router = useRouter();
    const removeUniversity = async () => {
        const confirmed = confirm("¿Estàs seguro que quieres eliminar la universidad?");

        if(confirmed){
            const res = await fetch(`http://localhost:3000/api/universities?idUniversity=${idUniversity}`, {
                method: "DELETE",
            });
            if(res.ok){
                router.refresh();
            } else {
                console.log("Error deleted")
            }
        }
    };

    return(
        <>
            <button onClick={removeUniversity} className="text-red-500">
                <HiOutlineTrash size={24}/>
            </button>
        </>
    )
}