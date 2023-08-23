'use client'
import {useState} from "react";
import {useRouter} from "next/navigation"

export default function AddTopic(){
    const [name, setName] = useState("");
    const [foundationDate, setFoundationDate] = useState("");
    const [isPublic, setIsPublic] = useState("");
    const [studentsNumber, setStudentsNumber] = useState("");


    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !foundationDate){
            alert("Title and description are required.");
            return;
        }

        try{
            const res = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({title: name, description: foundationDate}),
            });

            if(res.ok){
                router.push("/");
            }else{
                throw new Error("Failed to create a topic");
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
                    placeholder="University Title"
                />
                <input
                    onChange={(e) => setFoundationDate(e.target.value)}
                    value={foundationDate}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="University Description"
                />

                <button type="submit" className="bg-green-700 font-bold text-white py-3 px-6 w-fit">
                    Add University
                </button>
            </form>
        </>
    )
}