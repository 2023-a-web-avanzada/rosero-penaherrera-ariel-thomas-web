import EditUniversityForm from "@/components/EditUniversityForm";

const getUniversityById = async (idUniversity) => {
    try {
        const res = await fetch(`http://localhost:3000/api/universities/${idUniversity}`, {
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
    const { idUniversity } = params;
    const { university } = await getUniversityById(idUniversity);
    const { name, foundationDate, isPublic, studentsNumber } = university;
    return (
        <>
            <EditUniversityForm idUniversity={idUniversity} name={name} foundationDate={foundationDate} isPublic={isPublic} studentsNumber={studentsNumber}/>
        </>
    )
}