class Opciones {
    mostrarOpcionesUniversidades() {
        console.log("CRUD de Universidades");
        console.log("1. Crear una Universidad");
        console.log("2. Listar las Universidades");
        console.log("3. Opciones Facultad - Actualizar una Universidad");
        console.log("4. Eliminar una Universidad");
        console.log("5. Salir" + "\n");
        console.log("Ingresé el número de la acción que quiere realizar: ");
    }

    mostrarOpcionesFacultades() {
        console.log("CRUD de Facultades");
        console.log("1. Crear una Facultad");
        console.log("2. Listar las Facultades");
        console.log("3. Actualizar una Facultad");
        console.log("4. Eliminar una Facultad");
        console.log("5. Atrás" + "\n");
        console.log("Ingresé el número de la acción que quiere realizar: ");
    }
}

const rutaArchivoUniversidades = "Universidades.txt";
let rutaArchivoFacultades;
const opciones = new Opciones();
const opcionesUniversidades = new Opciones();
const listarFacultades = new Facultad();
const listarUniversidades = new Universidad();
let opcionUniversidad = true;
let opcionFacultad = true;

console.log("\nSistema de Gestión de Universidades y Facultades\n");

try {
    while (opcionUniversidad) {
        opcionesUniversidades.mostrarOpcionesUniversidades();
        const opcion = parseInt(prompt());

        switch (opcion) {
            case 1: {
                // Creación
                const nuevaUniversidad = listarUniversidades.crearUniversidad();
                const aux = listarUniversidades.leerUniversidad(rutaArchivoUniversidades);
                listarUniversidades.escribirUniversidad(
                    rutaArchivoUniversidades,
                    nuevaUniversidad,
                    aux
                );
                console.log();
                break;
            }
            case 2: {
                // Listar
                console.log("Universidades registradas: ");
                const aLecturaUniversidad = listarUniversidades.leerUniversidad(
                    rutaArchivoUniversidades
                );
                console.log(aLecturaUniversidad);
                break;
            }
            case 3: {
                // Actualización
                console.log("Operaciones CRUD: ");
                console.log("1. Actualizar Información de la Universidad: ");
                console.log("2. Opciones de las Facultades: ");
                console.log("Ingresé el número de la opción a realizar: ");
                const subOpcion = parseInt(prompt());

                switch (subOpcion) {
                    case 1: {
                        console.log("\n Universidades registradas: ");
                        const aLecturaUniversidad = listarUniversidades.leerUniversidad(
                            rutaArchivoUniversidades
                        );
                        console.log(aLecturaUniversidad + "\n");
                        console.log(
                            "Ingresé el nombre de la Universidad que desea actualizar:"
                        );
                        const actualizarUniversidad = prompt();
                        console.log("Actualizar información de la Universidad");
                        listarUniversidades.actualizarUniversidad(
                            actualizarUniversidad,
                            aLecturaUniversidad,
                            rutaArchivoUniversidades
                        );
                        break;
                    }
                    case 2: {
                        try {
                            console.log(
                                "\nIngresé el nombre de la Universidad a la cual va a pertenecer la facultad:"
                            );
                            const actualizarUniversidad = prompt();
                            rutaArchivoFacultades = `${actualizarUniversidad}.txt`;

                            while (opcionFacultad) {
                                opciones.mostrarOpcionesFacultades();
                                const facultadSubOpcion = parseInt(prompt());

                                switch (facultadSubOpcion) {
                                    case 1: {
                                        // Crear
                                        const nuevaFacultad = listarFacultades.crearFacultad();
                                        let aux = listarFacultades.leerFacultad(
                                            rutaArchivoFacultades
                                        );
                                        listarFacultades.escribirFacultad(
                                            rutaArchivoFacultades,
                                            nuevaFacultad,
                                            aux
                                        );
                                        console.log();
                                        break;
                                    }
                                    case 2: {
                                        // Listar
                                        console.log("Facultades registradas: ");
                                        const aLecturaFacultades = listarFacultades.leerFacultad(
                                            rutaArchivoFacultades
                                        );
                                        console.log(aLecturaFacultades);
                                        break;
                                    }
                                    case 3: {
                                        // Actualizar
                                        console.log("Facultades registradas: ");
                                        const alecturaFacultad = listarFacultades.leerFacultad(
                                            rutaArchivoFacultades
                                        );
                                        console.log(alecturaFacultad);
                                        console.log(
                                            "\nIngrese el nombre de la Facultad que desea actualizar: "
                                        );
                                        const actualizarFacultad = prompt();
                                        console.log("\nActualizar información de la Facultad\n");
                                        listarFacultades.actualizarFacultad(
                                            actualizarFacultad,
                                            alecturaFacultad,
                                            rutaArchivoFacultades
                                        );
                                        break;
                                    }
                                    case 4: {
                                        // Eliminar
                                        console.log("Facultades registradas: ");
                                        const alecturaFacultades = listarFacultades.leerFacultad(
                                            rutaArchivoFacultades
                                        );
                                        console.log(alecturaFacultades);
                                        console.log();
                                        console.log(
                                            "Ingresé el nombre de la Facultad que desea eliminar: "
                                        );
                                        const eliminarFacultad = prompt();
                                        listarFacultades.eliminarFacultad(
                                            eliminarFacultad,
                                            alecturaFacultades,
                                            rutaArchivoFacultades
                                        );
                                        console.log("\nFacultades registradas: ");
                                        const aLecturaCiudades = listarFacultades.leerFacultad(
                                            rutaArchivoFacultades
                                        );
                                        console.log(aLecturaCiudades + "\n");
                                        break;
                                    }
                                    case 5: {
                                        console.log("Atrás" + "\n");
                                        opcionFacultad = false;
                                        break;
                                    }
                                    default: {
                                        console.log("Error: ¡La opción ingresada no existe!");
                                        break;
                                    }
                                }
                            }
                        } catch (e) {
                            console.log("Error en las ciudades !!", e);
                        }
                        break;
                    }
                    default: {
                        console.log("Error: ¡La opción ingresada no existe!");
                        break;
                    }
                }
                break;
            }
            case 4: {
                // Eliminar
                console.log("Universidades registradas: ");
                const aLecturaUniversidad = listarUniversidades.leerUniversidad(
                    rutaArchivoUniversidades
                );
                console.log(aLecturaUniversidad + "\n");
                console.log(
                    "Ingresé el nombre de la Universidad que desea eliminar: "
                );
                const eliminarUniversidad = prompt();
                const auxI = listarUniversidades.eliminarUniversidad(
                    eliminarUniversidad,
                    aLecturaUniversidad,
                    rutaArchivoUniversidades
                );
                console.log("Universidades registradas: ");
                console.log(auxI + "\n");
                break;
            }
            case 5: {
                // Salir
                console.log("Vuelva Pronto");
                opcionUniversidad = false
            }
        }
    }
} catch (e){
    console.log("Error en el Menu", e);
}