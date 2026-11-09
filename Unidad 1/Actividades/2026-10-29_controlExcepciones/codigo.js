class Jugador {
    #nombre;
    #dorsal;
    #apellido;
    #partidosGoles;
    constructor(dorsal, nombre, apellido) {
        this.nombre = nombre;
        this.dorsal = dorsal;
        this.apellido = apellido;
        this.partidosGoles = {};
    }

    get nombre() {
        return this.nombre;
    }

    get dorsal() {
        return this.dorsal;
    }

    get apellido() {
        return this.apellido;
    }

    get nombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    get partidosGoles() {
        if(this.partidosGoles.length === 0) {
            console.log("No hay datos");
        } else {
            for (const [clave, valor] of Object.entries(this.partidosGoles)) {
                console.log(`${clave}: ${valor}`);
            }
        }
    }

    set partidosGoles(datos) {
        for (const [partido, goles] of Object.entries(datos)) {
        if (goles < 0) {
            throw new Error("Los goles no pueden ser negativos");
        }
        this.partidosGoles[partido] = goles;
    }
}

}

j1 = new Jugador(9, "Karim", "Benzema");
try {
    j1.setPartidosGoles({ 1: 1, 2: 3, 3: 2, 4: 0, 5: 2 });
} catch (e) {
    console.log(e.message);
}

j1.getPartidosGoles();

class Equipo {
    
}
