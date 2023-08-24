'use client';
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function EditUniversityForm({ idUniversity, name, foundationDate, isPublic, studentsNumber}){
    const [newName, setNewName] = useState(name);
    const [newFoundationDate, setNewFoundationDate] = useState(foundationDate);
    const [newIsPublic, setNewIsPublic] = useState(isPublic)
    const [newStudentsNumber, setNewStudentsNumber] = useState(studentsNumber)

    const router = useRouter();
    const handleSumit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/universities/${idUniversity}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newFoundationDate, newIsPublic, newStudentsNumber}),
            });

            if(!res.ok){
                throw new Error("Failed to update topic");
            }

            router.refresh();
            router.push("/");
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
                    placeholder="Nombre Universidad"
                />
                <input
                    onChange={(e) => setNewFoundationDate(e.target.value)}
                    value={newFoundationDate}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Fecha de fundación"
                />

                <label>¿Es Pública?
                    <input
                        onChange={(e) => setNewIsPublic(e.target.value)}
                        value={newIsPublic}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="True or False"
                    />
                </label>

                <input
                    onChange={(e) => setNewStudentsNumber(e.target.value)}
                    value={newStudentsNumber}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Número de estudiantes"
                />

                <button className="bg-green-700 font-bold text-white py-3 px-6 w-fit">
                    Update University
                </button>
            </form>
        </>
    )
}