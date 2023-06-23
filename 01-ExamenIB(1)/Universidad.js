import inquirer from 'inquirer';
import fs from 'fs';

export class Universidad {
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
                {type:'input',name:'id',message:'Ingresé el nombre de la Universidad:'},
                {type:'rawlist',name:'cEleccion',message:'Elige la opción que vas a cambiar: ',
                choices: ['name','promedioNotas','numeroEstudiantes']},
                {type:'input',name:'nuevoValor',message:'Ingrese el nuevo valor: '},
                ]).then(a=>{
                    promUniversidad = new Promise(
                        res =>(
                            listaUniversidades.forEach(
                                valorActual => {
                                    if(valorActual.nombre === a.nombre){
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
                            res(listaUniversidades.filter(item => item.nombre !== a.nombre))
                        ));
            });
        return promUniversidad
    }
}