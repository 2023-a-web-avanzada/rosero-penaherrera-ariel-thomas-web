'use client'
import NavbarFaculty from "@/components/NavbarFaculty";
import EditFacultyForm from "@/components/EditFacultyForm";

const getFacultyById = async (idFaculty) => {
    try{
        const res = await fetch(`https://localhost:3000/api/faculties/${idFaculty}`,
            {cache: "no-store"});

        if(!res.ok){
            throw new Error("Failed to fetch faculty");
        }

        return res.json();
    }catch (error){
        console.log(error)
    }
}
export default async function EditFaculty({params}){
    const idUniversity = params.idUniversity
    const {idFaculty} = params;
    console.log(idFaculty);
    const {faculty} = await getFacultyById(idFaculty)
    const {name, foundationDate, ownBuilding, careersNumber} = faculty;

    return (
        <>
            <NavbarFaculty params={idFaculty}/>
            <EditFacultyForm idFaculty={idFaculty} name={name}
                             foundationDate={foundationDate} ownBuilding={ownBuilding}
                             careersNumber={careersNumber} idUniversity={idUniversity}/>
        </>
    )
}