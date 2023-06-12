
class Universidad {
    constructor(){
        this.idU = 0;
        this.fechaCreacion = null;
        this.nombre = "";
        this.esPublica = true;
        this.promedioNotas = 0.0;
        this.numeroEstudiantes = 0;
        this.listaFacultades = [];
    }

    constructor(
        idU,
        fechaCreacion,
        nombre,
        esPublica,
        promedioNotas,
        numeroEstudiantes,
        listaFacultades
    ) {
        this.idU = idU;
        this.fechaCreacion = fechaCreacion;
        this.nombre = nombre;
        this.esPublica = esPublica;
        this.promedioNotas = promedioNotas;
        this.numeroEstudiantes = numeroEstudiantes;
        this.listaFacultades = listaFacultades;
    }

    obtenerAtributos() {
        let idsFacultades = "";
        this.listaFacultades.forEach((facultad) => {
            idsFacultades += "," + facultad.id_f.toString();
        });
        return `${this.idU},${this.fechaCreacion},${this.nombre},${this.esPublica},${this.promedioNotas},${this.numeroEstudiantes},${idsFacultades}`;
    }

    //Creación de Universidad
    function crearUniversidad() {
        const id = parseInt(prompt("Ingrese el ID de la Universidad:"));

        console.log("Ingresé la fecha de fundación de la Universidad con el formato YYYY-MM-DD:");
        const auxFechaFundacion = prompt();
        const fechaCreacion = moment(auxFechaFundacion, "YYYY-MM-DD").format("YYYY-MM-DD");

        console.log("Ingresé el nombre de la nueva Universidad:");
        const nombreUniversidad = prompt();

        const esPublica = true;

        console.log("Ingresé el promedio de notas de la Universidad (0.0-10.0):");
        const promedioNotas = parseFloat(prompt());

        const nEstudiantes = parseInt(prompt("Ingrese el número de estudiantes de la Universidad:"));

        const nuevaUniversidad = new Universidad(id, fechaCreacion, nombreUniversidad, esPublica, promedioNotas, nEstudiantes);
        return nuevaUniversidad;
    }

    //Creación Universidad en Archivos
    function escribirUniversidad(rutaArchivo, universidades, listarUniversidades) {
        listarUniversidades.push(universidades);
        const texto = `${universidades.idU},${universidades.fechaCreacion},${universidades.nombre},${universidades.esPublica},${universidades.promedioNotas},${universidades.numeroEstudiantes}\n`;
        try {
            const fs = require("fs");
            fs.appendFileSync(rutaArchivo, texto);
        } catch (e) {
            console.log("Error en la escritura de la Universidad", e);
        }
    }

    //Leer archivo universidades
    function leerUniversidad(rutaArchivo) {
        const listarUniversidad = [];

        try {
            const fs = require("fs");
            const contenido = fs.readFileSync(rutaArchivo, "utf-8");
            const lineas = contenido.split("\n");

            for (let i = 0; i < lineas.length; i++) {
                const tokens = lineas[i].split(",");
                const idU = parseInt(tokens[0]);
                const fechaDeFundacion = tokens[1];
                const nombreUniversidad = tokens[2];
                const esPublica = Boolean(tokens[3]);
                const promedioNotas = parseFloat(tokens[4])
                const numeroEstudiantes = tokens[5]

                const fechaDeFundacionUniversidad = moment(fechaDeFundacion, "YYYY-MM-DD").format("YYYY-MM-DD");
                const nuevaUniversidadArchivo = new Universidad(idU, fechaDeFundacionUniversidad, nombreUniversidad, esPublica, promedioNotas, numeroEstudiantes);

                listarUniversidad.push(nuevaUniversidadArchivo);
            }
        } catch (e) {
            console.log("Error en la lectura de la Provincia", e);
        }

        return listarUniversidad;
    }

    function actualizarUniversidad(encontrarUniversidad, listarUniversidad, rutaArchivo) {
        try {
            for (let i = 0; i < listarUniversidad.length; i++) {
                const hallarUniversidad = listarUniversidad[i];
                if (hallarUniversidad.nombre === encontrarUniversidad) {
                    console.log("Información de la Universidad\n");

                    console.log("1. Nombre de la Universidad: " + hallarUniversidad.nombre);
                    console.log("2. Promedio Notas (0.0-10.0): " + hallarUniversidad.promedioNotas);
                    console.log("3. Numero estudiantes: " + hallarUniversidad.numeroEstudiantes);
                    console.log("Seleccione la información que desea actualizar: ");

                    const opcion = parseInt(readLineSync.question());
                    switch (opcion) {
                        case 1: {
                            console.log("Ingrese la nueva información:");
                            const nuevoNombre = readLineSync.question();
                            hallarUniversidad.nombre = nuevoNombre;
                            listarUniversidad[i] = hallarUniversidad;
                            actualizarDatos(listarUniversidad, rutaArchivo);
                            console.log("¡Los datos de la universidad se actualizaron con éxito!");
                            break;
                        }
                        case 2: {
                            console.log("Ingrese la nueva información:");
                            const nuevoPromedioNotas = parseFloat(readLineSync.question());
                            hallarUniversidad.promedioNotas = nuevoPromedioNotas;
                            listarUniversidad[i] = hallarUniversidad;
                            actualizarDatos(listarUniversidad, rutaArchivo);
                            console.log("¡Los datos de la universidad se actualizaron con éxito!");
                            break;
                        }
                        case 3: {
                            console.log("Ingrese la nueva información:");
                            const nuevoNumeroEstudiantes = readLineSync.keyInYN("");
                            hallarUniversidad.numeroEstudiantes = nuevoNumeroEstudiantes;
                            listarUniversidad[i] = hallarUniversidad;
                            actualizarDatos(listarUniversidad, rutaArchivo);
                            console.log("¡Los datos de la universidad se actualizaron con éxito!");
                            break;
                        }
                        default: {
                            console.log("¡La acción ingresada no existe!");
                            break;
                        }
                    }
                }
            }
        } catch (e) {
            console.log("Error en el proceso de actualización", e);
        }

        return listarUniversidad;
    }

    //Actualizar datos en los archivos
    function actualizarDatos(listarUniversidades, rutaArchivo) {
        try {
            var archivo = null;
            var fw = null;
            var pw = null;
            var texto = "";
            for (let i = 0; i < listarUniversidades.length; i++) {
                const universidad = listarUniversidades[i];
                try {
                    archivo = new File(rutaArchivo);
                    fw = new FileWriter(archivo);
                    pw = new PrintWriter(fw);
                    texto = texto + universidad.idProvincia + ",";
                    texto = texto + universidad.fechaCreacion + ",";
                    texto = texto + universidad.nombreProvincia + ",";
                    texto = texto + universidad.esPublica + "\n";
                    texto = texto + universidad.promedioNotas + "\n"
                    texto = texto + universidad.numeroEstudiantes + ",";
                    fw.write(texto);
                } catch (e) {
                    console.log("Error en la escritura del archivo universidades", e);
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

    function eliminarUniversidad(encontrarUniversidad, listarUniversidad, rutaArchivo) {
        try {
            for (let i = 0; i < listarUniversidad.length; i++) {
                const hallarUniversidad = listarUniversidad[i];
                if (hallarUniversidad.nombre === encontrarUniversidad) {
                    listarUniversidad.splice(i, 1);
                    actualizarDatos(listarUniversidad, rutaArchivo);
                    console.log("¡Universidad eliminada con éxito!");
                    break;
                } else {
                    console.log("La Universidad ingresada no existe, ingrese una Universidad válida");
                }
            }
        } catch (e) {
            console.log("Error en la eliminación de la Universidad", e);
        }
        return listarUniversidad;
    }



}