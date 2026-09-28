//Codigo
var cosa = 3;
console.log(cosa++); // 3 y después incrementa a 4
cosa = 3;
console.log(++cosa); // incrementa a 4 y muestra 4

//Ejemplo de bucles
function howMany(selectObject) {
    let numberSelected = 0;
    for (let i = 0; i < selectObject.options.length; i++) {
        if (selectObject.options[i].selected) {
        numberSelected++;
        }
    }
    return numberSelected;
}

let btn = document.getElementById("btn");
btn.addEventListener("click",
    function () {
        alert(
            "Número de opciones seleccionadas: " +
            howMany(document.selectForm.musicTypes), //document.getEle,entById("musicTypes")
        );
    }
);

//Ejemplo mover options de un select a otro
let boton2 = document.getElementById("btn2");
boton2.addEventListener("click", 
    function () {
        let s1 = document.getElementById("musicTypes");
        let s2 = document.getElementById("vacio");
        for(let i=s1.options.length - 1;i>=0;i--){
            if(s1.options[i].selected){
                s2.appendChild(s1.options[i]);
            }
        }
    }
);

//Tabla de multiplicar
var num = 2;
console.log("Tabla del " + num);
for(let i=0;i<=10;i++){
    //console.log(num + " x " + i + " = " + (num*i));
    console.log(`${num} x ${i} = ${num*i}`);
}