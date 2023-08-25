'use client'
import NavbarFaculty from "@/components/NavbarFaculty";
import EditFacultyForm from "@/components/EditFacultyForm";

const getFacultyById = async (id) => {
    try{
        const res = await fetch(`http://localhost:3000/api/faculties/${id}`,
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
    const {id} = params;
    const {faculty} = await getFacultyById(id)
    const {name, foundationDate, ownBuilding, careersNumber} = faculty;

    return (
        <>
            <NavbarFaculty params={id}/>
            <EditFacultyForm idFaculty={id} name={name}
                             foundationDate={foundationDate} ownBuilding={ownBuilding}
                             careersNumber={careersNumber} idUniversity={idUniversity}/>
        </>
    )
}