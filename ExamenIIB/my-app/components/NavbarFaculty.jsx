import Link from "next/link";

export default function NavbarFaculty({params}){
    return(
        <>
            <nav className="flex justify-between items-center bg-green-800 px-8 py-3">
                <Link href={`/faculties/${params}`}>Facultades</Link>
                <Link className="text-white font-bold" href={"/"}>Volver</Link>
                <Link className="bg-white p-2" href={`/faculties/${params}/addFaculty`}>Crear Facultad</Link>
            </nav>
        </>
    );
}

