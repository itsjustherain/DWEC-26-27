class animal{
    constructor(nombre,raza){
        this.nombre = nombre;
        this.raza = raza;
    }

    hablar(){
        console.log("Hablar");
    }
}

class perro extends animal{
    constructor(nombre,raza){
        super(nombre,raza);
    }

    hablar(){
        console.log("Guau");
    }
}

class gato extends animal{
    constructor(nombre,raza){
        super(nombre,raza);
    }

    hablar(){
        console.log("Miau");
    }
}

var obj1 = new animal("Eustaquio","Loro");
var obj2 = new perro("Lolo","galgo");

obj1.hablar();
obj2.hablar();

var granja = [];
granja.push(new animal("Lorenzo","Desconocido"));
granja.push(new perro("Luis","Mastín")); //Polimorfismo
granja.push(new gato("Paca","Siames"));  //Polimorfismo
granja.push(new perro("Lola","Caniche"));//Polimorfismo

for(bicho of granja)
    bicho.hablar(); //Ligadura dinámica