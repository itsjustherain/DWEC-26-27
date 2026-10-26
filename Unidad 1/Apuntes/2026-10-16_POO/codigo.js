class persona{
    constructor(dni,nombre,apellidos){
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
    }

    verNombreCompleto(){
        return `${this.dni} - ${this.nombre} ${this.apellidos}`;
    }

    static compruebaDNI(dni){
        return true;
    }
}

class alumno extends persona{
    constructor(dni,nombre,apellidos,numAlumno){
        super(dni,nombre,apellidos); //Constructor clase base
        this.numAlumno = numAlumno;
    }

    verNombreCompleto(){
        return super.verNombreCompleto() + " [" + this.numAlumno + "]";
    }
}

var p1 = new persona("11111111A","Lola","Flores");
console.log(p1.verNombreCompleto());

var a1 = new alumno("22222222B","Pepillo","de los Palotes","111-11");
console.log(a1.verNombreCompleto());

console.log(persona.compruebaDNI("11111111A")?"Es correcto":"No es correcto");