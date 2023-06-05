// Stringify y Parse
const arregloUsuarios = [
    {
        id: 1,
        nombre: 'Adrian',
    }
]
const arregloGuardado = JSON.stringify(arregloUsuarios) //Arreglo, Objetos
const usuario = {
    id: 1,
    nombre: 'Adrian',
};
const objetoGuardado = JSON.stringify(usuario) //Arreglos, Objetos
console.log('ArregloGuardado: ', arregloGuardado);
console.log('ObjetoGuardado: ', objetoGuardado);

const arregloRestaurado = JSON.parse(arregloGuardado);
const objetoRestaurado = JSON.parse(objetoGuardado);
console.log('ArregloRestaurado: ', arregloRestaurado);
console.log('ObjetoRestaurado: ', objetoRestaurado);



