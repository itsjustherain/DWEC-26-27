class Carta {
    constructor(num,palo) {
        this.n = num;
        this.p = palo;
        this.robada = false;
    }

    //getters y setters
    getNum() {
        return this.n;
    }
    getPalo() {
        return this.p;
    }
    setNum(num) {
        this.n = num;
    }
    setPalo(palo) {
        this.p = palo;
    }
    estaRobada() {
        return this.robada;
    }
    robar() {
        this.robada = true;
    }
}

class Baraja {
    // tipo: "francesa" (52 cartas) o "española" (48 cartas)
    constructor(tipo = "francesa") {
        this.mazo = []; // array de cartas
        let palos, numeros;
        if (tipo === "española") {
            palos = ["o", "c", "e", "b"]; // oros, copas, espadas, bastos
            numeros = 12;
        } else {
            palos = ["c", "r", "p", "t"]; // corazones, rombos, picas, trébol
            numeros = 13;
        }
        for (let i = 0; i < palos.length; i++) { // palos
            for (let j = 0; j < numeros; j++) {// numeros
                this.mazo.push(new Carta(j + 1, palos[i]));
            }
        }
    }
    barajar() {
        // intercambio cartas de forma aleatoria dentro del array de cartas
        let n = this.mazo.length;
        for (let i = 0; i < n; i++) {
            let a = Math.floor(Math.random() * n);
            let b = Math.floor(Math.random() * n);
            [this.mazo[a], this.mazo[b]] = [this.mazo[b], this.mazo[a]];
        }
    }
    robar(){
        // devuelve una copia de la primera carta no robada del mazo
        for (const c of this.mazo) {
            if (!c.estaRobada()) {
                c.robar();
                let copia = new Carta(c.getNum(), c.getPalo());
                copia.robar();
                return copia;
            }
        }
        return null;
    }
    numCartas() {
        // número de cartas que quedan en el mazo (sin robar)
        return this.mazo.filter(c => !c.estaRobada()).length;
    }
    cortar() {
        // genero una posición aleatoria entre 1....length-1 e intercambio los 2 bloques de cartas entre si
        let pos = Math.floor(Math.random() * (this.mazo.length - 1)) + 1;
        this.mazo = this.mazo.slice(pos).concat(this.mazo.slice(0, pos));
    }
}

// interacción con el usuario
// capturo los botones
let bNueva = document.getElementById("bNueva");
let bBarajar = document.getElementById("bBarajar");
let bCortar = document.getElementById("bCortar");
let bRobar = document.getElementById("bRobar");
let cartaRobada = document.getElementById("cartaRobada");

// baraja global: existe desde el principio, no solo tras pulsar "Nueva"
let miBaraja = new Baraja();

// invocar los eventos necesarios
bNueva.addEventListener("click", () => {
    // 1. instanciar un nuevo objeto de la clase baraja
    miBaraja = new Baraja();
    // 2. dejar el div vacio
    cartaRobada.innerHTML="";
    // 3. mostrar un mensaje
    alert("Se ha creado una baraja nueva")
})
bBarajar.addEventListener("click", () => {
    // 1. llamar al metodo barajar de la clase baraja
    miBaraja.barajar();
    // 2. mostrar un mensaje
    alert("Baraja barajada. Quedan " + miBaraja.numCartas() + " cartas");
})
bCortar.addEventListener("click", () => {
    // 1. llamar al metodo cortar de la clase baraja
    miBaraja.cortar();
    // 2. mostrar un mensaje
    alert("Baraja cortada. Quedan " + miBaraja.numCartas() + " cartas");
})
bRobar.addEventListener("click", () => {
    // 1. llamar al metodo robar y recoger un objeto carta
    let c = miBaraja.robar();
    // 2. llamamos a los metodos getPalo y getNum para formar el nombre de la imagen que vamos a mostrar en el div cartaRobada
    if (c === null) {
        alert("No quedan cartas en la baraja");
        return;
    }
    cartaRobada.innerHTML = "<img src='img/"+c.getPalo() + c.getNum()+".jpg'/>"
})