import inquirer from 'inquirer';
//const fs = require('fs');
import fs from "fs"

class Universidad {

    constructor(idU, fechaCreacion, nombre, esPublica, promedioNotas, numeroEstudiantes, listaFacultades
    ) {
        this.idU = idU;
        this.fechaCreacion = fechaCreacion;
        this.nombre = nombre;
        this.esPublica = esPublica;
        this.promedioNotas = promedioNotas;
        this.numeroEstudiantes = numeroEstudiantes;
        this.listaFacultades = listaFacultades;
    }

    //Creación de Universidad
    async createUniversidad() {
        const miUniversidad = new Universidad();
        let promUniversidad;
        const answerRes = await inquirer
            .prompt([
                {type:'input',name:'id',message:'Ingrese el ID de la Universidad:'},
                {type:'input',name:'fechaCreacion',message:'Ingresé la fecha de fundación de la Universidad con el formato YYYY-MM-DD:'},
                {type:'input',name:'nombre',message:'Ingresé el nombre de la nueva Universidad:'},
                {type:'input',name:'esPublica',message:'¿La Universidad es Pública?:', choices:['Si','No']},
                {type:'input',name:'promedioNotas',message:'Ingresé el promedio de notas de la Universidad (0.0-10.0):', default: '5.0'},
                {type:'input',name:'numeroEstudiantes',message:'Ingresé el numero de estudiantes de la Universidad:'}
            ]).then(a=>{
                promUniversidad = new Promise(
                    res => (
                        miUniversidad.idU = a.id,
                            miUniversidad.fechaCreacion = new Date(a.fechaCreacion.split('-')[0],a.fechaCreacion.split('-')[1],a.fechaCreacion.split('-')[2]),
                            miUniversidad.nombre = a.nombre,
                            miUniversidad.esPublica = (a.esPublica === 'Si'),
                            miUniversidad.promedioNotas = parseFloat(a.promedioNotas),
                            miUniversidad.numeroEstudiantes = a.numeroEstudiantes,
                            miUniversidad.listaFacultades = [],
                            res(miUniversidad)
                    ));
            });
        return promUniversidad
    }

    async updateUniversidad(listaUniversidades){
        let promUniversidad;
        let indexUniversidad;
        const answerRes = await inquirer
            .prompt([
                {type:'input',name:'uCambiar',message:'Ingresé el nombre de la Universidad:'},
                {type:'rawlist',name:'cEleccion',message:'Elige la opción que vas a cambiar: ',
                    choices: ['nombre','promedioNotas','numeroEstudiantes']},
                {type:'input',name:'nuevoValor',message:'Ingrese el nuevo valor: '},
            ]).then(a=>{
                promUniversidad = new Promise(
                    res =>(
                        listaUniversidades.forEach(
                            valorActual => {
                                if(valorActual.nombre === a.uCambiar){
                                    indexUniversidad = listaUniversidades.indexOf(valorActual)
                                    switch (a.cEleccion){
                                        case "nombre":
                                            listaUniversidades[indexUniversidad].nombre = a.nuevoValor
                                            break
                                        case "promedioNotas":
                                            listaUniversidades[indexUniversidad].promedioNotas = a.nuevoValor
                                            break
                                        case "numeroEstudiantes":
                                            listaUniversidades[indexUniversidad].numeroEstudiantes = a.nuevoValor
                                            break
                                    }
                                }
                            }
                        ),
                            res(listaUniversidades)
                    ));
            });
        return promUniversidad
    }

    async deleteUniversidad(listaUniversidades){
        let promUniversidad;
        const answerRes = await inquirer
            .prompt([
                {type:'input',name:'name',message:'Ingrese el nombre de la Universidad que desea eliminar:'},
            ]).then(a=>{
                promUniversidad = new Promise(
                    res =>(
                        res(listaUniversidades.filter(item => item.nombre !== a.name))
                    ));
            });
        return promUniversidad
    }
}

class Facultad {

    constructor(idF, fechaCreacion, nombre, numeroEstudiantes, poseeAsociacionEstudiantes, promedioInvestigativo) {
        this.idF = idF;
        this.fechaCreacion = fechaCreacion;
        this.nombre = nombre;
        this.numeroEstudiantes = numeroEstudiantes;
        this.poseeAsociacionEstudiantes = poseeAsociacionEstudiantes;
        this.promedioInvestigativo = promedioInvestigativo;
    }

    //Función para anexar las facultades con su respectiva Universidad
    async indexUniversidad(listaUniversidad){
        var promIndexUniversidad
        var indiceUniversidad;
        await inquirer.prompt([
            {type:'input',name:'opcUniversidad',message:'Ingrese el nombre de la Universidad:'},
        ]).then(ansR => {
            promIndexUniversidad = new Promise(
                res => (
                    listaUniversidad.forEach(
                        valorActual => {
                            if(valorActual.nombre === ansR.opcUniversidad){
                                indiceUniversidad = listaUniversidad.indexOf(valorActual)
                            }
                        }
                    ),
                        res(indiceUniversidad)
                ));
        });
        return promIndexUniversidad
    }

    async createFacultad() {
        const miFacultad = new Facultad();
        let promFacultad;
        await inquirer
            .prompt([
                {type:'input',name:'id',message:'Ingrese el ID de la Facultad:'},
                {type:'input',name:'fechaCreacion',message:'Ingresé la fecha de fundación de la Facultad con el formato YYYY-MM-DD:'},
                {type:'input',name:'nombre',message:'Ingresé el nombre de la nueva Facultad:'},
                {type:'input',name:'numeroEstudiantes',message:'Ingresé el numero de estudiantes de la Facultad:'},
                {type:'rawlist',name:'poseeAsociacionEstudiantes',message:'¿La Facultad tiene Asociación de Estudiantes?:', choices: ['Si','No']},
                {type:'input',name:'promedioInvestigativo',message:'Ingresé el promedio investigativo de la Facultad (0.0-10.0):', default: '5.0'}
            ]).then(a=>{
                promFacultad = new Promise(
                    res => (
                        miFacultad.idF = a.id,
                            miFacultad.fechaCreacion = new Date(a.fechaCreacion.split('-')[0],a.fechaCreacion.split('-')[1],a.fechaCreacion.split('-')[2]),
                            miFacultad.nombre = a.nombre,
                            miFacultad.numeroEstudiantes = a.numeroEstudiantes,
                            miFacultad.poseeAsociacionEstudiantes = (a.poseeAsociacionEstudiantes === 'Si'),
                            miFacultad.promedioInvestigativo = parseFloat(a.promedioInvestigativo),
                            res(miFacultad)
                    ));
            });
        return promFacultad
    }

    async updateFacultad(listaUniversidades, indexUniversidad){
        let promUniversidad;
        let indexFacultad;
        await inquirer
            .prompt([
                {type:'input',name:'fCambiar',message:'Ingrese el nombre de la Facultad:'},
                {type:'rawlist',name:'cEleccion',message:'Elige la opción que vas a cambiar: ',
                    choices: ['nombre','numeroEstudiantes','poseeAsociacionEstudiantes','promedioInvestigativo']},
                {type:'input',name:'nuevoValor',message:'Ingrese el nuevo valor: '},
            ]).then(a=>{
                promUniversidad = new Promise(
                    res =>(
                        listaUniversidades[indexUniversidad].listaFacultades
                            .forEach(
                                facultative => {
                                    if(facultative.nombre == a.fCambiar){
                                        indexFacultad = listaUniversidades[indexUniversidad].listaFacultades.indexOf(facultative)
                                        switch (a.cEleccion){
                                            case "nombre":
                                                listaUniversidades[indexUniversidad].listaFacultades[indexFacultad].nombre = a.nuevoValor
                                                break
                                            case "numeroEstudiantes":
                                                listaUniversidades[indexUniversidad].listaFacultades[indexFacultad].numeroEstudiantes = a.nuevoValor
                                                break
                                            case "poseeAsociacionEstudiantes":
                                                listaUniversidades[indexUniversidad].listaFacultades[indexFacultad].poseeAsociacionEstudiantes = (a.nuevoValor === 'Si' ? true : false)
                                                break
                                            case "promedioInvestigativo":
                                                listaUniversidades[indexUniversidad].listaFacultades[indexFacultad].promedioInvestigativo = parseFloat(a.nuevoValor)
                                                break
                                        }
                                    }
                                }
                            ),
                    res(listaUniversidades)
                    ));
            });
        return promUniversidad
    }

    async deleteFacultad(listaUniversidades, indexUniversidad){
        let promUniversidad;
        let listFacultades = listaUniversidades[indexUniversidad].listaFacultades;
        await inquirer
            .prompt([
                {type:'input',name:'name',message:'Ingrese el nombre de la Facultad que desea eliminar:'},
            ]).then(a=>{
                promUniversidad = new Promise(
                    res =>(
                        listaUniversidades[indexUniversidad].listaFacultades = listFacultades.filter(item => item.nombre !== a.name),
                            res(listaUniversidades)
                    ));
            });
        return promUniversidad
    }

}

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

async function readFile(path){
    let myFirstPromise = await new Promise(
        (resolve, reject)=>{
            fs.readFile(
                path,
                'utf-8',//codificación
                (errorReadFirstFile , content) =>{//callback
                    if(errorReadFirstFile){
                        reject('Error en la lectura de archivo');
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
                        reject('Error en la escritura de archivo');
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
        const strUniversidad = JSON.stringify(answerContentFileOriginal);
        await writeFile(path, strUniversidad);
    }catch (error){
        console.error(error);
    }
}