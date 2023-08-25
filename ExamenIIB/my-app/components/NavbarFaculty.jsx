import Link from "next/link";
import {useRouter} from "next/navigation";

export default function NavbarFaculty({params}){

    //const router = useRouter();
    //const {universityName} = router.query;

    return(
        <>
            <nav className="flex justify-between items-center bg-green-800 px-8 py-3">
                <Link className="text-white font-bold" href={`/faculties/${params}`}>Facultades</Link>
                <p className="text-white font-bold">NombreUniversidad</p>
                <Link className="bg-white p-2" href={`/faculties/${params}/addFaculty`}>Crear Facultad</Link>
            </nav>
        </>
    );
}

