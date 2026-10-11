function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
const myCar = new Car("Eagle", "Talon TSi", 1993);
console.log(myCar);

// Propiedades y método de un animal (encapsulación)
const animalProto = {
    type: "Invertebrates", // Valor por defecto de la propiedad
    displayType() {
        // Método que muestra el tipo de animal
        console.log(this.type);
    },
};

// Creo un nuevo animal llamado `animal`
const animal = Object.create(animalProto);
animal.displayType(); // Muestra: Invertebrates

// Creo un nuevo animal llamado `fish`
const fish = Object.create(animalProto);
fish.type = "Fishes";
fish.displayType(); // Muestra: Fishes

// Inicializar las propiedades de un objeto con una expresión o variable

const obj1 = {};
obj1.propiedad1 = "valor1";
console.log(obj1);
let random = Math.random();
obj1[random] = "Número aleatorio";
random = Math.random();
obj1[random] = "Otro número aleatorio";
console.log(obj1);
console.log(Object.keys(obj1));

// Definiendo métodos

const persona = {
    nombre: "Pepillo",
    apellidos: "el de los Palotes",
    nacimiento: "01/01/1980",
    getNombreCompleto: function () {
        return this.nombre + " " + this.apellidos;
    },
};

console.log(persona.getNombreCompleto());
console.log(Object.keys(persona));
