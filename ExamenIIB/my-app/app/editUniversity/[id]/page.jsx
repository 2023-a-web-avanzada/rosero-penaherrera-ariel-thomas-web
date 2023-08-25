import EditUniversityForm from "@/components/EditUniversityForm";

const getUniversityById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/universities/${id}`, {
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error("Failed to fetch university");
        }

        return res.json();
    } catch (error){
        console.log(error)
    }
}

export default async function EditUniversity({ params }){
    const { id } = params;
    const { university } = await getUniversityById(id);
    const { name, foundationDate, isPublic, studentsNumber } = university;
    return (
        <>
            <EditUniversityForm idUniversity={id} name={name} foundationDate={foundationDate} isPublic={isPublic} studentsNumber={studentsNumber}/>
        </>
    )
}