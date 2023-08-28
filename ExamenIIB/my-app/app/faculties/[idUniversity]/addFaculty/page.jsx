'use client'

import {useState} from "react";
import {useRouter} from "next/navigation"
import NavbarFaculty from "@/components/NavbarFaculty";

export default function AddFaculty({params}){
    const idUniversity = params.idUniversity
    console.log("Componente anadir: " + idUniversity)

    const [name, setName] = useState("");
    const [foundationDate, setFoundationDate] = useState("");
    const [ownBuilding, setOwnBuilding] = useState(false);
    const [careersNumber, setCareersNumber] = useState("");

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !foundationDate || !careersNumber){
            alert("Todos los campos son requeridos");
            return;
        }

        try{
            const res = await fetch("http://localhost:3000/api/faculties", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({name, foundationDate, ownBuilding, careersNumber: parseInt(careersNumber), idUniversity}),
            });

            if(res.ok){
                router.push(`http://localhost:3000/faculties/${idUniversity}`);
            }else{
                throw new Error("Failed to create faculty");
            }
        } catch(error) {
            console.log(error);
        }
    };
    return (
        <>
            <NavbarFaculty params={idUniversity}/>
            <div className="border border-slate-400 px-8 py-2">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="Nombre Facultad"
                    />
                    <input
                        onChange={(e) => setFoundationDate(e.target.value)}
                        value={foundationDate}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="Fecha de fundación"
                    />
                    <label> ¿Tiene su propio edificio?
                        <input
                            onChange={(e) => setOwnBuilding(e.target.checked)}
                            checked={ownBuilding}
                            className="border border-slate-500 px-8 py-2"
                            type="checkbox"
                        />
                    </label>
                    <input
                        onChange={(e) => setCareersNumber(e.target.value)}
                        value={careersNumber}
                        className="border border-slate-500 px-8 py-2"
                        type="number"
                        placeholder="Número de carreras"
                    />
                    <button type="submit" className="bg-green-700 font-bold text-white py-3 px-6 w-fit">
                        Add Faculty
                    </button>
                </form>
            </div>
        </>
    )
}