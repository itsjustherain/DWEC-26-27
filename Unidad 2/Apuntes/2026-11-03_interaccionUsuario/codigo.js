/*const btn = document.querySelector("#boton2");
//const btn = document.getElementById("boton2");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

btn.addEventListener("click", () => {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});
*/

//Objeto caja de texto (input:text)
let caja = document.querySelector("#entrada");
//let d = document.querySelector("#contenido");

caja.addEventListener("keydown", () =>{
    let d = document.querySelector("#contenido");
    d.innerHTML = caja.value;
});

//Capturando eventos de ratón
caja.addEventListener("mouseover", (context) =>{
  alert("Has pasado por encima. CoordenadaX: " + context.clientX + " CoordenadaY: " + context.clientY);
})

//Mostrando las coordenadas del ratón
let miVentana = document.querySelector("html");
let cajilla = document.getElementById("verCoordenadas");

miVentana.addEventListener("mousemove", function(context){
  cajilla.innerHTML = `(${context.clientX},${context.clientY})`;
})

//Moviendo imágenes
let mortadelo = document.querySelector("img");

miVentana.addEventListener("keydown", (context)=>{
  if(context.key === "ArrowRight"){
    //alert(mortadelo.style.left);
    mortadelo.style.left = parseInt(mortadelo.style.left) + 10 + "px";
  }
})

//Intercambiando imágenes
//¿Cuándo? click boton
//¿Qué? intercambiar imagen
//¿Dónde? etoqueta img
let bMortadelo = document.getElementById("bMortadelo");
bMortadelo.addEventListener("click", ()=>{
  mortadelo.src = "mortadelo.jpg";
})

let bFilemon = document.getElementById("bFilemon");
bFilemon.addEventListener("click", ()=>{
  mortadelo.src = "filemon.jpg";
})