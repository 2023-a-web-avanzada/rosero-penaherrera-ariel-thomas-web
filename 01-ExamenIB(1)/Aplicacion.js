import inquirer from "inquirer";
import {readFile,writeFile,readWriteFile} from './lectura-escritura.js'
import {Universidad} from "./Universidad.js"
import {Facultad} from "./Facultad.js"

async function main(){
    try{
        const uni = new Universidad()
        const respuesta = await inquirer
            .prompt([
                {
                    type: 'rawlist',
                    name: 'opcion',
                    message: '(-----GESTIÓN DE UNIVERSIDADES Y FACULTADES-----")\n' +
                        '---------Universidad------------")\n' + 'Elige una opción:',
                    choices: ['Crear', 'Mostrar Universidades y Facultades', 'Actualizar', 'Gestión de Facultades',
                        'Borrar Universidad con sus Facultades', 'Salir']
                }
            ]).then((answer) => {
                    switch (answer.opcion) {
                        case 'Crear':
                            uni.createUniversidad().then(
                                (dataUniversidad) => {
                                    readWriteFile('./Universidades.txt', dataUniversidad)
                                    main()
                                })
                            break

                        case 'Mostrar Universidades y Facultades':
                            readFile('./Universidades.txt').then(
                                dataUniversidad => {
                                    console.log(JSON.parse(dataUniversidad))
                                    main()
                                }
                            )
                            break

                        case 'Actualizar':
                            readFile('./Universidades.txt').then(
                                dataUniversidad =>{
                                    const listaUniversidades = JSON.parse(dataUniversidad)
                                    uni.updateUniversidad(listaUniversidades).then(
                                        newData =>{
                                            writeFile('./Universidades.txt',JSON.stringify(newData))
                                            console.log('Información actualizada con éxito')
                                            main()
                                        }
                                    )
                                }
                            )
                            break

                        case 'Gestión de Facultades':
                            var f = new Facultad()
                            var indexUniversidad;
                            readFile('./Universidades.txt').then(
                                dataUniversidad =>{
                                    const listaUniversidades = JSON.parse(dataUniversidad)
                                    f.indexUniversidad(listaUniversidades).then(
                                        indice =>{
                                            indexUniversidad = parseInt(indice)
                                            mainFacultad();
                                        }
                                    )
                                }
                            )
                        async function mainFacultad() {
                            try {
                                f = new Facultad()
                                var universidades = readFile('./Universidades.txt').then(
                                    dataUniversidad =>{
                                        universidades = JSON.parse(dataUniversidad)
                                    }
                                )
                                const answFacultad = await inquirer
                                    .prompt([
                                        {
                                            type: 'rawlist',
                                            name: 'opcion',
                                            message: '**Gestión de Facultades**")\n' +
                                                '---------Facultad------------")\n' + 'Elige una opción:',
                                            choices: ['Crear', 'Mostrar Facultades', 'Actualizar', 'Borrar Facultad',
                                                'Salir']
                                        }
                                    ]).then((ansP) => {
                                        switch (ansP.opcion) {
                                            case 'Crear':
                                                f.createFacultad().then(
                                                    (dataFacultad) => {
                                                        universidades[indexUniversidad].listaFacultades.push(dataFacultad)
                                                        writeFile('./Universidades.txt', JSON.stringify(universidades))
                                                        mainFacultad()
                                                    })
                                                break

                                            case 'Mostrar Facultades':
                                                console.log(universidades[indexUniversidad].listaFacultades)
                                                mainFacultad()
                                                break

                                            case 'Actualizar':
                                                f.updateFacultad(universidades, indexUniversidad).then(
                                                    newData => {
                                                        writeFile('./Universidades.txt', JSON.stringify(newData))
                                                        console.log('Información actualizada con éxito')
                                                        mainFacultad()
                                                    }
                                                )
                                                break

                                            case 'Borrar Facultad':
                                                f.deleteFacultad(universidades, indexUniversidad).then(
                                                    newData => {
                                                        writeFile('./Universidades.txt', JSON.stringify(newData))
                                                        console.log('Información borrada con éxito')
                                                        mainFacultad()
                                                    }
                                                )
                                                break

                                            case 'Salir':
                                                main()
                                                break
                                        }
                                    });
                            } catch (e) {
                                console.error(e);
                            }
                        }
                            break

                        case 'Borrar Universidad con sus Facultades':
                            readFile('./Universidades.txt').then(
                                dataUniversidad =>{
                                    const listaUniversidades = JSON.parse(dataUniversidad)
                                    uni.deleteUniversidad(listaUniversidades).then(
                                        newData =>{
                                            writeFile('./Universidades.txt',JSON.stringify(newData))
                                            console.log('Información eliminada con éxito')
                                            main()
                                        }
                                    )
                                }
                            )
                            break

                        case 'Salir':
                            console.log('¡Vuelva pronto!')
                            break

                    }
                }
            );
    }catch(e){
        console.error(e);
    }
}
main();
