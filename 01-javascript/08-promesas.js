// 08-promesas.js
const fs = require('fs');
/* Una función que acepte como parametro una variable...*/
function leerArchivo(path){
    return new Promise(
        (resolve,reject) => {
            fs.readFile(
                path, //Nombre o path del archivo
                'utf-8', //Codificacion
                (errorLectura, contenido) => {
                    if(errorLectura) {
                        console.error(errorLectura);
                        reject('Error leyendo primer archivo');
                    } else {
                        resolve(contenido)
                    }
                }
            )
        }
    )
}

function escribirArchivo(path, contenido){
    return new Promise((resolve, reject) => {
        fs.writeFile(path, contenido, 'utf-8', (error) => {
            if (error) {
                console.log(error);
            }
        })
    })
}

function ejercicio(
    pathArchivoUno,
    pathArchivoDos,
    pathArchivoNuevo
){
    let contenidoTotal = '';
    leerArchivo(pathArchivoUno)
        .then(
            (contenidoPrimerArchivo) => {
                contenidoTotal = contenidoTotal + contenidoPrimerArchivo;
                return leerArchivo(pathArchivoDos)
            }
        )
        .then(
            (contenidoSegundoArchivo) => {
                contenidoTotal = contenidoTotal + contenidoSegundoArchivo;
                return escribirArchivo(pathArchivoNuevo)
            }
        )
        .catch(error => console.error(error))
}

ejercicio('06-ejemplo.txt', '01-variables.js', '08-ejemploArchivo.txt')

