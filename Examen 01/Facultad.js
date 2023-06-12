
class Facultad {
    constructor(){
        this.idF = 0;
        this.fechaCreacion = null;
        this.nombre = "";
        this.numeroEstudiantes = 0;
        this.poseeAsociacionEstudiantes = true;
        this.promedioInvestigativo = 0.0;
    }

    constructor(
        idF,
        fechaCreacion,
        nombre,
        numeroEstudiantes,
        poseeAsociacionEstudiantes,
        promedioInvestigativo,
    ) {
        this.idF = idF;
        this.fechaCreacion = fechaCreacion;
        this.nombre = nombre;
        this.numeroEstudiantes = numeroEstudiantes;
        this.poseeAsociacionEstudiantes = poseeAsociacionEstudiantes;
        this.numeroEstudiantes = numeroEstudiantes;
        this.promedioInvestigativo = promedioInvestigativo;
    }

    toString() {
        return "Id Facultad: " + this.id_f + ", Nombre: " + this.nombre + "\n" +
            "Fecha de creación: " + this.fechaCreacion + "\n" +
            "Número de profesores: " + this.numeroProfesores + "\n" +
            "Posee asociación de estudiantes: " + this.poseeAsociacionDeEstudiantes + "\n" +
            "Promedio de Investigación: " + this.promedioInvestigativo;
    }

    function crearFacultad() {
        const id = parseInt(prompt("Ingrese el ID de la Facultad:"));

        console.log("Ingresé la fecha de fundación de la Facultad con el formato YYYY-MM-DD:");
        const auxFechaFundacion = prompt();
        const fechaCreacion = moment(auxFechaFundacion, "YYYY-MM-DD").format("YYYY-MM-DD");

        console.log("Ingresé el nombre de la nueva Facultad:");
        const nombreFacultad = prompt();

        const nEstudiantes = parseInt(prompt("Ingrese el número de estudiantes de la Facultad:"));

        const poseeAsociacionEstudiantes = true;

        console.log("Ingresé el promedio investigativo de la Facultad (0.0-10.0):");
        const promedioInvestigativo = parseFloat(prompt());

        const nuevaFacultad = new Facultad(id, fechaCreacion, nombreFacultad, nEstudiantes, poseeAsociacionEstudiantes, promedioInvestigativo);
        return nuevaFacultad;
    }

    //Creación Universidad en Archivos
    function escribirFacultad(rutaArchivo, facultades, listarFacultades) {
        listarFacultades.push(facultades);
        const texto = `${facultades.idF},${facultades.fechaCreacion},${facultades.nombre},${facultades.numeroEstudiantes},${facultades.poseeAsociacionEstudiantes},${facultades.promedioInvestigativo}\n`;
        try {
            const fs = require("fs");
            fs.appendFileSync(rutaArchivo, texto);
        } catch (e) {
            console.log("Error en la escritura de la Facultad", e);
        }
    }

    function leerFacultad(rutaArchivo) {
        const listarFacultad = [];

        try {
            const fs = require("fs");
            const contenido = fs.readFileSync(rutaArchivo, "utf-8");
            const lineas = contenido.split("\n");

            for (let i = 0; i < lineas.length; i++) {
                const tokens = lineas[i].split(",");
                const idF = parseInt(tokens[0]);
                const fechaDeFundacion = tokens[1];
                const nombreFacultad = tokens[2];
                const numeroEstudiantes = tokens[3]
                const poseeAsociacionEstudiantes = Boolean(tokens[4]);
                const promedioInvestigativo = parseFloat(tokens[4])

                const fechaDeFundacionFacultad = moment(fechaDeFundacion, "YYYY-MM-DD").format("YYYY-MM-DD");
                const nuevaFactuladArchivo = new Universidad(idU, fechaDeFundacionFacultad, nombreFacultad, poseeAsociacionEstudiantes, promedioInvestigativo, numeroEstudiantes);

                listarFacultad.push(nuevaFactuladArchivo);
            }
        } catch (e) {
            console.log("Error en la lectura de la Provincia", e);
        }

        return listarFacultad;
    }

    function actualizarFacultad(buscarFacultad, listarFaculades, rutaArchivo) {
        try {
            for (let i = 0; i < listarFaculades.length; i++) {
                const encontrarFacultad = listarFaculades[i];
                if (encontrarFacultad.nombre === buscarFacultad) {
                    const indexCiudad = i;
                    console.log("Información de la Facultad\n");

                    console.log("1. Nombre de la Facultad: " + encontrarFacultad.nombre);
                    console.log("2. Número de estudiantes: " + encontrarFacultad.nombre);
                    console.log("3. Posee Asociación de estudiantes: " + encontrarFacultad.poseeAsociacionEstudiantes);
                    console.log("Seleccione la información que desea actualizar: ");

                    switch (parseInt(readLine().trim())) {
                        case 1:
                            console.log("Ingrese la nueva información:");
                            const nuevoNombre = readLine();
                            encontrarFacultad.nombre = nuevoNombre.toString();
                            listarFaculades[indexCiudad] = encontrarFacultad;
                            actualizacionDatos(listarFaculades, rutaArchivo);
                            console.log("¡Los datos de la facultad se actualizaron con éxito!");
                            break;
                        case 2:
                            console.log("Ingrese la nueva información:");
                            const nuevoNumEstudiantes = parseInt(readLine());
                            encontrarFacultad.numeroEstudiantes = nuevoNumEstudiantes;
                            listarFaculades[indexCiudad] = encontrarFacultad;
                            actualizacionDatos(listarFaculades, rutaArchivo);
                            console.log("¡Los datos de la facultad se actualizaron con éxito!");
                            break;
                        case 3:
                            console.log("Ingrese la nueva información:");
                            const nPoseeAsociacionEstudiantes = readLine().toLowerCase() === "true";
                            encontrarFacultad.poseeAsociacionEstudiantes = nPoseeAsociacionEstudiantes;
                            listarFaculades[indexCiudad] = encontrarFacultad;
                            actualizacionDatos(listarFaculades, rutaArchivo);
                            console.log("¡Los datos de la facultad se actualizaron con éxito!");
                            break;
                        default:
                            console.log("¡La opción ingresada no es correcta!");
                            break;
                    }
                }
            }
        } catch (e) {
            console.log("Error en el proceso de Actualización", e);
        }
        return listarFaculades;
    }

    function actualizacionDatos(listarFacultades, rutaArchivo) {
        try {
            let archivo = null;
            let fw = null;
            let pw = null;
            let texto = "";
            for (let i = 0; i < listarFacultades.length; i++) {
                const facultades = listarFacultades[i];
                try {
                    archivo = new File(rutaArchivo);
                    fw = new FileWriter(archivo);
                    pw = new PrintWriter(fw);

                    texto += facultades.idF + ",";
                    texto += facultades.fechaCreacion + ",";
                    texto += facultades.nombre + ",";
                    texto += facultades.numeroEstudiantes+ ",";
                    texto += facultades.poseeAsociacionEstudiantes + ", ";
                    texto += facultades.promedioInvestigativo + "\n";
                    fw.write(texto);

                } catch (e) {
                    console.log("Error en la escritura del archivo facultades", e);
                } finally {
                    try {
                        if (fw != null) {
                            fw.close();
                        }
                    } catch (e) {
                        console.log("Error en la escritura actualización", e);
                    }
                }
            }
        } catch (e) {
            console.log("Error en la actualización", e);
        }
    }

    function eliminarFaculad(encontrarFacultad, listarFacultades, rutaArchivo) {
        try {
            for (let i = 0; i < listarFacultades.length; i++) {
                const buscarFacultad = listarFacultades[i];
                if (buscarFacultad.nombre === encontrarFacultad) {
                    listarFacultades.splice(i, 1);
                    actualizacionDatos(listarFacultades, rutaArchivo);
                    console.log("La facultad se eliminó con éxito!!");
                    break;
                } else {
                    console.log("La facultad ingresada no existe, ingrese una facultad válida");
                }
            }
        } catch (e) {
            console.log("Error en la eliminación de la ciudad", e);
        }
        return listarFacultades;
    }


}