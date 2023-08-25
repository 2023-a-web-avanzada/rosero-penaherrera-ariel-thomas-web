'use client';
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function EditFacultyForm({ idFaculty, name, foundationDate, ownBuilding, careersNumber,idUniversity}){
    const [newName, setNewName] = useState(name)
    const [newFoundationDate, setNewFoundationDate] = useState(foundationDate);
    const [newOwnBuilding, setNewOwnBuilding] = useState(ownBuilding)
    const [newCareersNumber, setNewCareersNumber] = useState(careersNumber)

    const router = useRouter();
    const handleSumit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/faculties/${idFaculty}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newFoundationDate, newOwnBuilding, newCareersNumber}),
            });

            if(!res.ok){
                throw new Error("Failed to update faculty");
            }

            router.refresh();
            router.push(`http://localhost:3000/faculties/${idUniversity}`);
        } catch (error){
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSumit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Nombre Facultad"
                />
                <input
                    onChange={(e) => setNewFoundationDate(e.target.value)}
                    value={newFoundationDate}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Fecha de fundación"
                />

                <label>¿Tiene su propio edificio?
                    <input
                        onChange={(e) => setNewOwnBuilding(e.target.value)}
                        value={newOwnBuilding}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="True or False"
                    />
                </label>

                <input
                    onChange={(e) => setNewCareersNumber(e.target.value)}
                    value={newCareersNumber}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Número de carreras"
                />

                <button className="bg-green-700 font-bold text-white py-3 px-6 w-fit">
                    Update Faculty
                </button>
            </form>
        </>
    )
}