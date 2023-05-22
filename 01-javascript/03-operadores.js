const arreglo = [ { id: 1, nombre: 'Adrian', nota: 5 },
    { id: 2, nombre: 'Vicente', nota: 8 }, { id: 3, nombre: 'Carolina', nota: 14 },
    { id: 4, nombre: 'Wendy', nota: 16 }, { id: 5, nombre: 'Andrea', nota: 19 },
    { id: 6, nombre: 'Pamela', nota: 19 }, { id: 7, nombre: 'Cristian', nota: 20 },
    {id: 8, nombre: 'Daniel', nota: 19 }, { id: 9, nombre: 'Lilly', nota: 14 },
    { id: 10, nombre: 'Ramiro', nota: 12 } ];

//Función como Parámetro
//Operador FIND.- Hay que enviar una expresión -> Truty o Falsy
//Devuelve el primero que cumpla esa condición
const respuestaFind = arreglo.find(
    function (valorActual, indiceActual, arregloCompleto){
        console.log('valorActual', valorActual);
        console.log('indiceActual', indiceActual);
        console.log('arregloCompleto', arregloCompleto);
        return valorActual.nota <= 5;
    }
);
console.log('respuestaFind', respuestaFind);


//Operador FindIndex.- Devolver el indice del primer elemento que cumpla esa condición
//Enviamos una expresión -> trusty falsy
const respuestaFindIndex = arreglo
    .findIndex(
        function (valorActual){
            return valorActual.nota < 5; //Expresion (<=)
        }

    );
console.log('respuestaFindIndex', respuestaFindIndex); //Si encuentra indice, sino-1

//Operador ForEach
// Iterar el arreglo
const respuestaForEach = arreglo
    .forEach(
        function (valorActual){
            console.log(valorActual);
    }
    );
console.log('respuestaForEach', respuestaForEach); //undefined

//Operador MAP (Modificar o iterar el arreglo)
//Enviamos los datos dek nuevo arreglo y devuelve el nuevo arreglo
//Se crea un nuevo arreglo

const respuestaMap = arreglo
    .map(
        function (valorActual){
            const nuevaNota = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: valorActual.nota + 1,
                estaAprobado: (valorActual.nota + 1) > 14,
                registrado: true,
            }

            return nuevaNota;
        }
    );
console.log('respuestaMap', respuestaMap); // [...] nuevo arreglo
console.log('arreglo', arreglo); // [...] arreglo



//Operador FILTER (Filtra Arreglo)
// enviamos expresion
// devuelve los elementos que cumplen con esa condición en un nuevo arreglo

const respuestaFilter = arreglo
    .filter(
        function (valorActual){
            return valorActual.nota > 10;
        }
    );
console.log('respuestaFilter', respuestaFilter); // [...] nuevo arreglo
console.log('arreglo', arreglo); // [...] arreglo

//Opeador SOME --> expresion
//devuelve booleano
//Hay alguna X que cumpla esta condición?
//Or
const respuestaSome = arreglo
    .some(
        function (valorActual){
            return valorActual.nota > 9;
        }
    );
console.log('respuestaSome', respuestaSome); //True

//Operador EVERY --> Expresion
// devuelve boolean
// todos los X cumplen está condicion
// And
const respuestaEvery = arreglo
    .every(
        function (valorActual){
            return valorActual.nota <= 20;
        }
    );
console.log('respuestaEvery', respuestaEvery); //True

//Operador Reduce --> izq --> Der
//Reduce Right    --> der --> izq
// 1) [1,2,5,6,2,4,5,6,7,8,3,1,2]
// 2) 0 --> Varialve (acumulador)
// 3) devolver la operacion
//Ej: variable inicial en 100
//1.- 100 - 1 = 99
//2.- 99 - 2 = 97
//3.- 97 - 5 = 92
//..
//EJ: variable inicial en 0
// 1_ 0 + 1 = 1
// 2_ 1 + 2 = 3
// 3_ 3 + 5 = 8
const respuestaReduce = arreglo
    .reduce(
        function (valorAcumulado, valorActual, indice, arreglo){
            return valorActual.nota + valorActual;
        },
        0 //acumulador
    );
console.log('respuestaReduce', respuestaReduce); //True
console.log(respuestaReduce/ arreglo.lenght); //true

// Concatenar operaciones
arreglo.filter((a)=> a.nota < 14)
    .map((a) => a.nota + 1)
    .some((a) => a < 14);
