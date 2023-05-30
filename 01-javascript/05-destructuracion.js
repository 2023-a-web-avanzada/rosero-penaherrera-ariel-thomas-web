// 05-05-destructuracion.js...

const adrian = {
    nombre: "Adrian",
};

const carolina = {
    nombre: "Carolina",
    apellido: "Eguez",
};

const adrianCarolina = { //Crea una nueva Referencia (VALOR)
    ...carolina, // 1 en el orden es importante para propiedades que se repiten
    ...adrian, // El ultimo reemplaza a los anteriores
}
console.log('adrianCarolina', adrianCarolina);

//Destructuracion de arreglos
const arregloUno = [1,2,3,4,5];
const arregloDos = [6,7,8,9,10];
const superArreglo = [
    ...arregloUno, //El orden importa
    ...arregloDos,
]; //
console.log('superArreglo', superArreglo);

