import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import {HiPencilAlt} from "react-icons/hi";
import {HiBuildingOffice2} from "react-icons/hi2";

const getUniversities = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/universities", {
            cache: "no-store",
        });

        if(!res.ok) {
            throw new Error("Failed to fetch universities");
        }

        return res.json()

    } catch(error){
        console.log("Error loading universities: ", error);
    }
}

export default async function UniversitiesList(){

    const { universities } = await getUniversities();

    return(
        <>
            {universities.map(t => (
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl">{t.name}</h2>
                    <div className="grid grid-cols-1 divide-y gap-x-5">
                        <div><label className="font-semibold">Fecha de fundación: </label>{t.foundationDate}</div>
                        <div><label className="font-semibold">¿Es Pública?: </label>{t.isPublic.toString()}</div>
                        <div><label className="font-semibold">Número de estudiantes: </label>{t.studentsNumber}</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <RemoveBtn idUniversity={t._id}/>
                    <Link href={`/editUniversity/${t._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                    <Link href={`/faculties/${t._id}?name=${encodeURIComponent(t.name)}`}>
                        <HiBuildingOffice2 size={24} />
                    </Link>
                </div>

            </div>
            ))}
        </>
    )
}