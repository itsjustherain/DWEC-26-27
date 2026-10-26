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

class Carta {
    // en js solo se puede tener un constructor, asi que este vale para los tres casos:
    // sin nada (por defecto), con otra carta (copia) o con numero y palo
    // numeroCarta puede ser el numero o la carta que se quiere copiar
    constructor(numeroCarta, palo) {
        // valores por defecto
        this.numero = 1;
        this.palo = "c";

        if (numeroCarta instanceof Carta) {
            // si me pasan una carta copio sus datos
            this.numero = numeroCarta.numero;
            this.palo = numeroCarta.palo;
        } else if (numeroCarta !== undefined) {
            // uso los set para que se compruebe que son validos, si no lo son se quedan los de por defecto
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

    // devuelven true si se cambia y false si el valor no vale
    setNumero(numeroNuevo) {
        // entero entre 1 y 13
        if (!Number.isInteger(numeroNuevo) || numeroNuevo < 1 || numeroNuevo > 13) {
            return false;
        }
        this.numero = numeroNuevo;
        return true;
    }
    setPalo(paloNuevo) {
        // solo vale c, p, r o t
        if (typeof paloNuevo !== "string") {
            return false;
        }
        const letra = paloNuevo.toLowerCase();
        if (ORDEN_PALOS.indexOf(letra) === -1) {
            return false;
        }
        this.palo = letra;
        return true;
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

// constructor por defecto
const cartaPorDefecto = new Carta();
cartaPorDefecto.mostrarCarta();

// constructor con numero y palo
const sieteDePicas = new Carta(7, "p");
sieteDePicas.mostrarCarta();

// constructor de copias
const copia = new Carta(sieteDePicas);
copia.mostrarCarta();
// cambio la copia y la original no se toca
copia.setNumero(10);
console.log(copia.getNumero(), sieteDePicas.getNumero());

// getters
console.log(sieteDePicas.getNumero());
console.log(sieteDePicas.getPalo());

// setters con valores buenos
const carta = new Carta();
console.log(carta.setNumero(12));
console.log(carta.setPalo("r"));
carta.mostrarCarta();

// setters con valores malos, tiene que salir false y la carta no cambia
console.log(carta.setNumero(0));
console.log(carta.setNumero(14));
console.log(carta.setNumero(3.5));
console.log(carta.setNumero("7"));
console.log(carta.setPalo("x"));
console.log(carta.setPalo(5));
carta.mostrarCarta();

// mostrarCarta con los numeros especiales y alguno normal
for (const numero of [1, 2, 10, 11, 12, 13]) {
    new Carta(numero, "t").mostrarCarta();
}

// y con los cuatro palos
for (const letra of ["c", "p", "r", "t"]) {
    new Carta(5, letra).mostrarCarta();
}

// comparar con numeros distintos
console.log(new Carta(9, "t").comparar(new Carta(4, "c")));
console.log(new Carta(4, "c").comparar(new Carta(9, "t")));

// comparar con el mismo numero y distinto palo
console.log(new Carta(8, "c").comparar(new Carta(8, "p")));
console.log(new Carta(8, "t").comparar(new Carta(8, "r")));

// comparar dos cartas iguales
console.log(new Carta(13, "p").comparar(new Carta(13, "p")));
