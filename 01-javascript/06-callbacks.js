const fs = require('fs'); //File system
                            // Importar modulo fs
// 06-ejemplo.txt -> Hola
//1) Leer archivo:06-ejemplo.txt,
//luego imprimir en consola
//2) despues del paso 1, leer archivo:01-variables.js
//, luego imprimir en consola
//3) crear un nuievo archivo llamado 06-nuevo-archivo.txt
//con el contenido de los otros dos archivos.
console.log('Primero');
const a = 1 + 1;
fs.readFile( //No es un caramelo ya que se esta comunicando con otro proceso.
    './06-ejemplo.txt', //Nombre o path del archivo
    'utf-8', //codificacion
    (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {
        console.log('Segundo')
        if (errorLecturaPrimerArchivo){
            console.error(errorLecturaPrimerArchivo);
            throw new Error('Error leyendo primer archivo');
        } else {
            fs.readFile(
                './01-variables.js', //Nombre o path del archivo
                'utf-8', //codificacion
                (errorLecturaSegundoArchivo, contenidoSegundoArchivo) => {
                })
        }
    }
);
console.log('Tercero')

// 1) Leer archivo:06-ejemplo.txt
// luego imprimir en consola
// 2) Despues del paso 1, Leer archivo:01-variables.js
//, luego imprimir en consola
// 3) Crear un nuevo archivo llamado 06-nuevo-archivo.txt
// con el contenido de los otros dos archivos


// 1) Leer archivo: 06-ejemplo.txt
fs.readFile(
    './06-ejemplo.txt',
    'utf8',
    (errorLectura, data1) => {
    if (errorLectura) {
        console.error('Error al leer el archivo:', errorLectura);
    } else {
        console.log('Contenido de 06-ejemplo.txt:');
        console.log(data1);
        // 2) Leer archivo: 01-variables.js
        fs.readFile(
            './01-variables.js',
            'utf8',
            (errorLectura, data2) => {
            if (errorLectura) {
                console.error('Error al leer el archivo:', errorLectura);
            } else {
                console.log('Contenido de 01-variables.js:');
                console.log(data2);

                // 3) Crear un nuevo archivo llamado 06-nuevo-archivo.txt
                // con el contenido de los otros dos archivos
                const nuevoContenido = data1 + '\n' + data2;

                fs.writeFile(
                    './06-nuevo-archivo.txt',
                    nuevoContenido,
                    (errorEscritura) => {
                        if (errorEscritura) {
                            console.error('Error al crear el nuevo archivo:', errorEscritura);
                        } else {
                            console.log('Archivo 06-nuevo-archivo.txt creado exitosamente.');
                        }
                });
            }
        });
    }
});

/*
fs.writeFile(
    './06-nuevo-archivo.txt',
    nuevoContenido,
    (errorEscritura) => {

    }
);
*/
