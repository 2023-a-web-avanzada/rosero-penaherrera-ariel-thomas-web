import cStyles from './menu.module.css'
export default function MenuComponent () {
    return (
        <>
            <nav>
                <ul className={cStyles.navegacion}>
                    <li><a href={"#"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                    </a></li>
                    <li><a href={"#"}>MERCADOS▼</a>
                        <ul className={cStyles.submenu}>
                            <li><a href={"#"}>MERCADO EN LÍNEA</a></li>
                            <li><a href={"#"}>EMISORES</a></li>
                            <li><a href={"#"}>MANUALES EN INSCRIPCIÓN</a></li>
                            <li><a href={"#"}>CONOZCA EL MERCADO</a></li>
                        </ul>
                    </li>
                    <li><a href={"#"}>NORMATIVA▼</a>
                        <ul className={cStyles.submenu}>
                            <li><a href={"#"}>MERCADO DE VALORES</a></li>
                            <li><a href={"#"}>AUTORREGULACION</a></li>
                            <li><a href={"#"}>NORMATIVA RELACIONADA</a></li>
                        </ul>
                    </li>
                    <li><a href={"#"}>ESTADÍSTICAS▼</a>
                        <ul className={cStyles.submenu}>
                            <li><a href={"#"}>BOLETINES</a></li>
                            <li><a href={"#"}>BOLETINES</a></li>
                            <li><a href={"#"}>VALORACIÓN</a></li>
                        </ul>
                    </li>
                    <li><a href={"#"}>CASAS</a></li>
                    <li><a href={"#"}>CAPACITACIÓN</a></li>
                    <li><a href={"#"}>BLOG & NOTICIAS</a></li>
                    <li><a href={"#"}>CONTACTO</a></li>
                </ul>
            </nav>
        </>
    )
}