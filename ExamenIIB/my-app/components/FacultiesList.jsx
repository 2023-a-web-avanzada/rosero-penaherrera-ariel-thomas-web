import Link from "next/link";
import {HiPencilAlt} from "react-icons/hi";
import RemoveBtnFaculty from "@/components/RemoveBtnFaculty";

const getFaculties = async (params) => {

    try {
        console.log("Params:", params);
        const res = await fetch(`http://localhost:3000/api/faculties?idUniversity=${params.params}`, {
            cache: 'no-store'
        });

        if(!res.ok) {
            throw new Error("Failed to fetch faculties");
        }
        return res.json()

    } catch (error){
        console.log("Error loading faculties", error);
    }
}

export default async function FacultiesList({params}){

    const { faculties } = await getFaculties({params});

    return(
        <>
            {faculties.map(f => (
                <div key={f._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">{f.name}</h2>
                        <div className="grid grid-cols-1 divide-y gap-x-5">
                            <div><label className="font-semibold">Fecha de fundación: </label>{f.foundationDate}</div>
                            <div><label className="font-semibold">¿Tiene su propio edificio?: </label>{f.ownBuilding.toString()}</div>
                            <div><label className="font-semibold">Número de carreras: </label>{f.careersNumber}</div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtnFaculty idFaculty={f._id}/>
                        <Link href={`/faculties/${params}/editFaculty/${f._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}