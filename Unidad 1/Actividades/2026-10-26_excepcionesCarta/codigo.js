// nombre completo de cada palo a partir de su letra
const NOMBRES_PALOS = {
    c: "corazones",
    p: "picas",
    r: "rombos",
    t: "tréboles"
};

// los numeros que se cambian por un nombre
const NOMBRES_ESPECIALES = {
    1: "As",
    11: "Jack",
    12: "Reina",
    13: "Rey"
};

// orden de los palos de menor a mayor, el de la derecha gana
const ORDEN_PALOS = ["t", "r", "p", "c"];

// clase para controlar los errores de la carta
class ExcepcionesCarta extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ExcepcionesCarta";
    }

    // lanza la excepcion si el numero no es un entero entre 1 y 13
    static comprobarNumero(numero) {
        if (!Number.isInteger(numero) || numero < 1 || numero > 13) {
            throw new ExcepcionesCarta("El número no es correcto");
        }
    }

    // lanza la excepcion si el palo no es una de las letras c, p, r, t
    static comprobarPalo(palo) {
        if (typeof palo !== "string" || ORDEN_PALOS.indexOf(palo.toLowerCase()) === -1) {
            throw new ExcepcionesCarta("El palo no es correcto");
        }
    }
}

class carta {
    // en js solo se puede tener un constructor, asi que este vale para los tres casos:
    // sin nada (por defecto), con otra carta (copia) o con numero y palo
    // numeroCarta puede ser el numero o la carta que se quiere copiar
    constructor(numeroCarta, palo) {
        // valores por defecto
        this.numero = 1;
        this.palo = "c";

        if (numeroCarta instanceof carta) {
            // si me pasan una carta copio sus datos
            this.numero = numeroCarta.numero;
            this.palo = numeroCarta.palo;
        } else if (numeroCarta !== undefined || palo !== undefined) {
            // los set comprueban los datos y lanzan una ExcepcionesCarta si alguno no vale
            this.setNumero(numeroCarta);
            this.setPalo(palo);
        }
    }

    getNumero() {
        return this.numero;
    }
    getPalo() {
        return this.palo;
    }

    // si el valor no es correcto lanzan una excepcion y la carta no cambia
    setNumero(numeroNuevo) {
        ExcepcionesCarta.comprobarNumero(numeroNuevo);
        this.numero = numeroNuevo;
    }
    setPalo(paloNuevo) {
        ExcepcionesCarta.comprobarPalo(paloNuevo);
        this.palo = paloNuevo.toLowerCase();
    }

    // devuelve algo tipo "Reina de picas" o "7 de rombos"
    nombreCompleto() {
        const numeroTexto = this.numero in NOMBRES_ESPECIALES ? NOMBRES_ESPECIALES[this.numero] : this.numero;
        return `${numeroTexto} de ${NOMBRES_PALOS[this.palo]}`;
    }

    mostrarCarta() {
        console.log(`es el ${this.nombreCompleto()}`);
    }

    // devuelve -1 si esta carta es menor, 0 si son iguales y 1 si es mayor
    comparar(otraCarta) {
        let resultado;

        if (this.numero !== otraCarta.numero) {
            // primero el numero
            resultado = this.numero > otraCarta.numero ? 1 : -1;
        } else if (this.palo !== otraCarta.palo) {
            // si el numero es el mismo miro el palo
            resultado = ORDEN_PALOS.indexOf(this.palo) > ORDEN_PALOS.indexOf(otraCarta.palo) ? 1 : -1;
        } else {
            resultado = 0;
        }

        if (resultado === 1) {
            console.log(`Gana la carta actual: ${this.nombreCompleto()}`);
        } else if (resultado === -1) {
            console.log(`Gana la carta recibida: ${otraCarta.nombreCompleto()}`);
        } else {
            console.log("Empate: las dos cartas son iguales");
        }
        return resultado;
    }
}

// pruebas

// la prueba del enunciado, el palo "manzanas" no existe asi que salta la excepcion en c1
try {
    let c1 = new carta(1, "manzanas");
    let c2 = new carta(-5, "rombos");
} catch (e) {
    console.log(e.message);
}

// numero incorrecto
try {
    let c3 = new carta(-5, "r");
} catch (e) {
    console.log(e.message);
}

// numero muy grande, no entero y texto
try {
    new carta(14, "p");
} catch (e) {
    console.log(e.message);
}
try {
    new carta(3.5, "p");
} catch (e) {
    console.log(e.message);
}
try {
    new carta("7", "p");
} catch (e) {
    console.log(e.message);
}

// si falta el palo tambien da error
try {
    new carta(5);
} catch (e) {
    console.log(e.message);
}

// compruebo que el error es de tipo ExcepcionesCarta
try {
    new carta(0, "t");
} catch (e) {
    console.log(e instanceof ExcepcionesCarta, e.name);
}

// cartas correctas, no salta nada
try {
    const cartaPorDefecto = new carta();
    cartaPorDefecto.mostrarCarta();

    const sieteDePicas = new carta(7, "p");
    sieteDePicas.mostrarCarta();

    // constructor de copias
    const copia = new carta(sieteDePicas);
    copia.mostrarCarta();
    copia.setNumero(10);
    console.log(copia.getNumero(), sieteDePicas.getNumero());

    // palo en mayuscula tambien vale
    new carta(12, "C").mostrarCarta();
} catch (e) {
    console.log(e.message);
}

// los set tambien lanzan excepcion si el valor no vale
const c4 = new carta(2, "t");
try {
    c4.setNumero(20);
} catch (e) {
    console.log(e.message);
}
try {
    c4.setPalo("x");
} catch (e) {
    console.log(e.message);
}
// la carta no ha cambiado
c4.mostrarCarta();

// mostrarCarta con los numeros especiales y alguno normal
for (const numero of [1, 2, 10, 11, 12, 13]) {
    new carta(numero, "t").mostrarCarta();
}

// comparar
console.log(new carta(9, "t").comparar(new carta(4, "c")));
console.log(new carta(4, "c").comparar(new carta(9, "t")));
console.log(new carta(8, "c").comparar(new carta(8, "p")));
console.log(new carta(8, "t").comparar(new carta(8, "r")));
console.log(new carta(13, "p").comparar(new carta(13, "p")));
