class AnimalNoEncontrado extends Error {
    constructor(nombre) {
        super("No hay ningún animal llamado " + nombre);
        this.name = "AnimalNoEncontrado";
    }
}

class Animal {
    static COSTE_BASE = 20;
    #nombre;
    #edad;

    constructor(nombre = "Sin nombre", edad = 1) {
        if (nombre instanceof Animal) {
            this.nombre = nombre.nombre;
            this.edad = nombre.edad;
        } else {
            this.nombre = nombre;
            this.edad = edad;
        }
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        if (typeof nombre !== "string" || nombre.trim() === "") {
            throw new Error("El nombre no puede estar vacío");
        }
        this.#nombre = nombre;
    }

    get edad() {
        return this.#edad;
    }

    set edad(edad) {
        if (!Number.isInteger(edad) || edad > 30 || edad < 0) {
            throw new RangeError("Edad no válida: " + edad);
        }
        this.#edad = edad;
    }

    cumplirAnos() {
        this.edad++;
    }

    sonido() {
        return "...";
    }

    costeMensual() {
        return Animal.COSTE_BASE;
    }

    toString() {
        return `${this.nombre} (${this.edad} años) - ` + this.costeMensual().toFixed(2) + " €/mes";
    }
}

class Perro extends Animal {
    #raza;
    constructor(nombre,edad,raza) {
        super(nombre,edad);
        this.raza = nombre instanceof Perro ? nombre.raza : raza;
    }

    get raza() {
        return this.#raza;
    }

    set raza(raza) {
        this.#raza = raza;
        
    }

    sonido() {
        return "Guau";
    }

    costeMensual() {
        if (this.edad >= 10) {
            return Animal.COSTE_BASE + 25;
        } else {
            return Animal.COSTE_BASE + 15;
        }
    }

    toString() {
        return `Perro: ${super.toString()} - ${this.raza}`;
    }
}

class Gato extends Animal {
    #interior;
    constructor(nombre, edad, interior) {
        super(nombre,edad);
        this.interior = nombre instanceof Gato ? nombre.interior : interior;
    }

    get interior(){
        return this.#interior;
    }

    set interior(interior){
        this.#interior = interior;
    }

    sonido() {
        return "Miau";
    }

    costeMensual() {
        if (this.interior === true) {
            return Animal.COSTE_BASE + 5;
        } else {
            return Animal.COSTE_BASE;
        }
    }

    toString() {
        return `Gato: ${super.toString()}`;
    }
}

class Pajaro extends Animal {
    constructor(nombre,edad) {
        super(nombre,edad);
    }

    sonido() {
        return "Pío";
    }

    costeMensual() {
        return Animal.COSTE_BASE / 2;
    }

    toString() {
        return `Pájaro: ${super.toString()}`;
    }
}

class Refugio {
    #nombre;
    #animales = [];
    constructor(nombre) {
        this.nombre = nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get nombre() {
        return this.#nombre;
    }

    acoger(animal) {
        if (!(animal instanceof Animal)) {
            throw new TypeError("Solo se pueden acoger animales");
        } 
        for (const a of this.#animales) {
            if(a.nombre === animal.nombre) {
                throw new Error(`Ya hay un animal llamado ${animal.nombre}`);
            }
        }
        this.#animales.push(animal);
    }

    buscar(nombre) {
        for (const a of this.#animales) {
            if (a.nombre === nombre) {
                return a; 
            } 
        }
        throw new AnimalNoEncontrado(nombre);
    }

    adoptar(nombre) {
        const animal = this.buscar(nombre);
        const posicion = this.#animales.indexOf(animal);
        this.#animales.splice(posicion,1);
        return animal;
    }

    concierto() {
        for (const a of this.#animales) {
            console.log(a.nombre + ": " + a.sonido());
        }
    }

    contar() {
        let perros = 0;
        let gatos = 0;
        let pajaros = 0;
        for (const a of this.#animales) {
            if (a instanceof Perro) {
                perros++;
            } else if (a instanceof Gato) {
                gatos++;
            } else if (a instanceof Pajaro) {
                pajaros++;
            }
        }
        return `Perros: ${perros} | Gatos: ${gatos} | Pajaros: ${pajaros}`;
    }

    costeTotal() {
        let total = 0;
        for (const a of this.#animales) {
            total += a.costeMensual();
        }

        return total;
    }

    listar() {
        for (const a of this.#animales) {
            console.log(a.toString());
        }
    }
}

    //PROGRAMA
    const refugio = new Refugio("huellas");
    let a1 = new Animal();
    let a2 = new Animal(a1);
    a2.nombre = "Copia";

    console.log(a1.toString());
    console.log(a2.toString());

    refugio.acoger(new Perro("Toby", 3, "Mestizo"));
    refugio.acoger(new Perro("Lúa", 11, "Galgo"));
    refugio.acoger(new Gato("Misi", 3, "true"));
    refugio.acoger(new Pajaro("Kiwi", 1));
 
    try {
        let p1 = new Perro("", 2, "Mestizo");
    } catch (e) {
        console.log(e.message);
    }

    try {
        let g1 = new Gato("mensaje", 40);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }