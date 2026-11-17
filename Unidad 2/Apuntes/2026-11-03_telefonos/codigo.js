//Clase Terminal
class Terminal{
    constructor(num){
        this.num = num;
        this.segundos = 0;
    }

    getNun(){
        return this.num;
    }

    getSegundos(){
        return this.segundos;
    }

    setNum(num){
        this.num = num;
    }

    setSegundos(segundos){
        this.segundos = segundos;
    }

    llama(t2,seg){
        this.segundos += seg;
        t2.setSegundos(t2.getSegundos() + seg);
    }

    toString(){
        return `Nº ${this.num} - ${this.segundos}s de conversación` ;
    }
}

class Movil extends Terminal{
    constructor(num,tarifa){
        super(num);
        this.tarifa = tarifa;
        this.euros = 0.00;
    }

    llama(m2,seg){
        super.llama(m2,seg);
        switch(this.tarifa){
            case "rata":
                this.euros += ((seg/60)*0.06);
                break;
            case "mono":
                this.euros += ((seg/60)*0.12);
                break;
            case "bisonte":
                this.euros += ((seg/60)*0.30);
                break;
        }
    }
}

//Terminales
let t1 = new Terminal("678 11 22 33");
let t2 = new Terminal("644 74 44 69");
let t3 = new Terminal("622 32 89 09");
let t4 = new Terminal("664 73 98 18");
console.log(t1.toString());
console.log(t2.toString());
t1.llama(t2, 320);
t1.llama(t3, 200);
console.log(t1.toString());
console.log(t2.toString());
console.log(t3.toString());
console.log(t4.toString());

//Móviles
let m1 = new Movil("678 11 22 33", "rata");
let m2 = new Movil("644 74 44 69", "mono");
let m3 = new Movil("622 32 89 09", "bisonte");
console.log(m1);
console.log(m2);
m1.llama(m2, 320);
m1.llama(m3, 200);
m2.llama(m3, 550);
console.log(m1);
console.log(m2);
console.log(m3);

const form = document.querySelector("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const para = document.querySelector("p");

form.addEventListener("submit", (e) => {
  if (fname.value === "" || lname.value === "") {
    e.preventDefault();
    para.textContent = "You need to fill in both names!";
  }
});