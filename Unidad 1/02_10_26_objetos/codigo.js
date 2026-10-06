function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const myCar = new Car("Eagle", "Talon TSi", 1993);
console.log(myCar);

// Animal properties and method encapsulation
const animalProto = {
  type: "Invertebrates", // Default value of properties
  displayType() {
    // Method which will display the type of animal
    console.log(this.type);
  },
};

// Create a new animal type called `animal`
const animal = Object.create(animalProto);
animal.displayType(); // Logs: Invertebrates

// Create a new animal type called fish
const fish = Object.create(animalProto);
fish.type = "Fishes";
fish.displayType(); // Logs: Fishes

//Inicializar las propiedades de un objeto con una expresion o variable

var obj1 = {};
obj1.propiedad1 = "valor1";
console.log(obj1);
var random = Math.random();
obj1[random] = "Numero aleatorio";
random = Math.random();
obj1.random = "Otro Numero aleatorio";
console.log(obj1);
console.log(Object.keys(obj1));

//Definiendo métodos

var persona = {
    nombre: "Pepillo",
    apellidos: "el de los Palotes",
    nacimiento: "01/01/1980",
    getNombreCompleto: function(){
        return this.nombre + " " + this.apellidos;
    },
}

function getNombre() {
    return persona.nombre;
}
console.log(persona.getNombreCompleto());
console.log(Object.keys(persona));