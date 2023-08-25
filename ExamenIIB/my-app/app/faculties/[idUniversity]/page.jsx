import NavbarFaculty from "@/components/NavbarFaculty";
import FacultiesList from "@/components/FacultiesList";

export default function HomeFaculty({params}){
    const idUniversity = params.idUniversity
    return (
        <>
            <NavbarFaculty params={idUniversity}/>

            <FacultiesList params={idUniversity}/>
        </>
    )
}