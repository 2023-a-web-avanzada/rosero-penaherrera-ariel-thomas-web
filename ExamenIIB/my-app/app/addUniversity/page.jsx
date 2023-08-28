'use client'
import {useState} from "react";
import {useRouter} from "next/navigation"

export default function AddUniversity(){
    const [name, setName] = useState("");
    const [foundationDate, setFoundationDate] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [studentsNumber, setStudentsNumber] = useState("");


    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !foundationDate || !studentsNumber){
            alert("Todos los campos son requeridos");
            return;
        }

        try{
            const res = await fetch("http://localhost:3000/api/universities", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({name, foundationDate, isPublic, studentsNumber: parseInt(studentsNumber)}),
            });

            if(res.ok){
                router.push("/");
                router.refresh();
            }else{
                throw new Error("Failed to create university");
            }
        } catch(error) {
            console.log(error);
        }
    };


    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Nombre Universidad"
                />
                <input
                    onChange={(e) => setFoundationDate(e.target.value)}
                    value={foundationDate}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Fecha de fundación"
                />
                <label> ¿Es Pública?
                    <input
                        onChange={(e) => setIsPublic(e.target.checked)}
                        checked={isPublic}
                        className="border border-slate-500 px-8 py-2"
                        type="checkbox"
                    />
                </label>
                <input
                    onChange={(e) => setStudentsNumber(e.target.value)}
                    value={studentsNumber}
                    className="border border-slate-500 px-8 py-2"
                    type="number"
                    placeholder="Número de estudiantes"
                />
                <button type="submit" className="bg-green-700 font-bold text-white py-3 px-6 w-fit">
                    Add University
                </button>
            </form>
        </>
    )
}