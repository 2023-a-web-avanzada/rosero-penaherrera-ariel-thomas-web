import cStyles from "@/app/Encabezado/Encabezado.module.css";
import Image from "next/image";

export default function CarruselComponent () {
    return(
        <>
            <div>
                <div>
                    <div>
                        <Image src="/cabeceraImg1.png" alt="Imagen" width={700} height={250}></Image>
                        <p>
                            <Image src="Img1.png" alt="Imagen" width={300} height={150}></Image>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}