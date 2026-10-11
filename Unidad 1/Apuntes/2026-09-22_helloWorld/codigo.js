// Código javascript
// let myVar = "my value";

const fSuma = function (a, b) {
    return a + b;
};

console.log(fSuma(2, 3));

// DEMO DE HOISTING: la declaración de "numero" se eleva, pero no su valor
console.log(numero); // undefined
var numero = 5;

const PI = 3.14;
console.log(PI);
// PI = 0.14; // Error: una constante no se puede reasignar

// OBJETOS EN JS
const obj1 = { marca: "seat", modelo: "ibiza", color: "blanco" };
console.log(obj1.marca); // seat
obj1.marca = "ford";
console.log(obj1.marca); // ford
console.log(obj1);

// Conversiones de tipos
let x = 1;
console.log(x + 1); // 2
x = "1";
console.log(x + 1); // 11
console.log(parseInt(x) + 1); // 2
