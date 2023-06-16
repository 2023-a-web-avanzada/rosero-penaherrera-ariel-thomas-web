import Universidad from "./Universidad"
import Facultad from "./Facultad"
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
                                facultad = new Facultad()
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
                                                facultad.createFacultad().then(
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
                                                facultad.updateFacultad(universidades, indexUniversidad).then(
                                                    newData => {
                                                        writeFile('./Universidades.txt', JSON.stringify(newData))
                                                        console.log('Información actualizada con éxito')
                                                        mainFacultad()
                                                    }
                                                )
                                                break

                                            case 'Borrar Facultad':
                                                facultad.deleteFacultad(universidades, indexUniversidad).then(
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

async function readFile(path){
    let myFirstPromise = await new Promise(
        (resolve, reject)=>{
            fs.readFile(
                path,
                'utf-8',//codificación
                (errorReadFirstFile , content) =>{//callback
                    if(errorReadFirstFile){
                        reject('Error read a file');
                    }else{
                        resolve(content);
                    }
                }
            );
        }
    );
    return myFirstPromise
}

async function writeFile(path, content){
    const myPromise = await new Promise(
        (resolve, reject)=> {
            fs.writeFile(
                path,
                content,
                (errorWrite) => {//callback
                    if (errorWrite) {
                        reject('Error reading a file');
                    } else {
                        resolve(content);
                    }
                }
            );
        }
    );
    return myPromise
}
async function readWriteFile(path, newContent){
    try {
        let answerContentFileOriginal = await readFile(path); //espera una respuesta
        if(answerContentFileOriginal == ""){
            answerContentFileOriginal='[]'
        }
        answerContentFileOriginal = JSON.parse(answerContentFileOriginal);
        answerContentFileOriginal.push(newContent)
        const strRestaurant = JSON.stringify(answerContentFileOriginal);
        await writeFile(path, strRestaurant);
    }catch (error){
        console.error(error);
    }
}