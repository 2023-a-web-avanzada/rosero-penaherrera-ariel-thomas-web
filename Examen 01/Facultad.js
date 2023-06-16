import Universidad from "./Universidad";

const inquirer = require('inquirer');
const fs = require('fs');

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
        this.promedioInvestigativo = promedioInvestigativo;
    }

    //Función para anexar las facultades con su respectiva Universidad
    async indexUniversidad(listaUniversidad){
        var promIndexUniversidad
        var indexUniversidad;
        await inquirer.prompt([
            {type:'input',name:'opcUniversidad',message:'Ingrese el nombre de la Universidad:'},
        ]).then(ansR => {
            promIndexUniversidad = new Promise(
                res => (
                    listaUniversidad.forEach(
                        valorActual => {
                            if(valorActual.name === asnR.opcUniversidad){
                                indexUniversidad = listaUniversidad.indexOf(valorActual)
                            }
                        }
                    ),
                res(indexUniversidad)
                ));
        });
        return promIndexUniversidad
    }

    async createFacultad() {
        const miFacultad = new Facultad();
        let promFacultad;
        const answerRes = await inquirer
            .prompt([
                {type:'input',name:'id',message:'Ingrese el ID de la Facultad:'},
                {type:'input',name:'fechaCreacion',message:'Ingresé la fecha de fundación de la Facultad con el formato YYYY-MM-DD:'},
                {type:'input',name:'nombre',message:'Ingresé el nombre de la nueva Facultad:'},
                {type:'input',name:'numeroEstudiantes',message:'Ingresé el numero de estudiantes de la Facultad:'},
                {type:'input',name:'poseeAsociacionEstudiantes',message:'¿La Facultad tiene Asociación de Estudiantes?:', choices:['Si','No']},
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
                {type:'input',name:'id',message:'Ingrese el nombre de la Facultad:'},
                {type:'rawlist',name:'cEleccion',message:'Elige la opción que vas a cambiar: ',
                    choices: ['name','numeroEstudiantes','poseeAsociacionEstudiantes','promedioInvestigativo']},
                {type:'input',name:'nuevoValor',message:'Ingrese el nuevo valor: '},
            ]).then(a=>{
                promUniversidad = new Promise(
                    res =>(
                        listaUniversidades[indexUniversidad].listaFacultades.forEach(
                            facultad => {
                                if(facultad.nombre == a.nombre){
                                    indexFacultad = listaUniversidades[indexUniversidad].listaFacultades.indexOf(facultad)
                                    switch (a.cEleccion){
                                        case "nombre":
                                            listaUniversidades[indexUniversidad].listaFacultades[indexFacultad].name = a.nuevoValor
                                            break
                                        case "numeroEstudiantes":
                                            listaUniversidades[indexUniversidad].listaFacultades[indexFacultad].numeroEstudiantes = a.nuevoValor
                                            break
                                        case "poseeAsociacionEstudiantes":
                                            listaUniversidades[indexUniversidad].listaFacultades[indexFacultad]= (a.nuevoValor === 'Si')
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
        let listaFacultades = listaUniversidades[indexUniversidad].listaFacultades;
        await inquirer
            .prompt([
                {type:'input',name:'name',message:'Ingrese el nombre de la Facultad que desea eliminar:'},
            ]).then(a=>{
                promUniversidad = new Promise(
                    res =>(
                        listaUniversidades[indexUniversidad].listaFacultades = listaFacultades.filter(item => item.nombre !== a.nombre),
                        res(listaUniversidades)
                    ));
            });
        return promUniversidad
    }
}
export default Facultad;