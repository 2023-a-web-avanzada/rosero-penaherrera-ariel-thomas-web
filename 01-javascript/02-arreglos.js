// 02-arreglos.js
let arreglo = [6,7,8,9,10];
arreglo = 1;
arreglo = true;
arreglo = undefined;
arreglo = null;
arreglo = {};
arreglo = [true,1,1.1, "Adrian", 'Vicente', undefined, null, {}, [1,2]];
arreglo = [5,6,7,8,9];

// for of
for (let numero of arreglo){ //Valores
    console.log('numero', numero);
}

//for in
for (let indice in arreglo){ //indices
    console.log('indices', indice);
}

//Añadir al final un elemento
arreglo.push(11);
//Eliminar al final un elemento
arreglo.pop();
//Añadir al inicio del arreglo
arreglo.unshift(4);
//splice(indice donde empezar, numero elementos eliminados,
//items a agregar)
//EJ: arreglos.splice( //
// 0 // indice, - Requerido
// 3 // eliminar 3  - Requerido (también puedo borrar 0 elementos)
// 1,2,3,4,5,6 //Agregar los elementos del 1-6 - Opcional
// )

arreglo.splice(0, 0 , 1,2,3)
console.log(arreglo);
const indiceNueve = arreglo.indexOf(9);
console.log(indiceNueve);





