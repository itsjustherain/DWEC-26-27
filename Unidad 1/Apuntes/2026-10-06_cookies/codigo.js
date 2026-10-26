//var equipo = {};

function juega(nombre, numJugadores){
  this.nombre = nombre;
  this.numJugadores = numJugadores;

  this.getNombre = function(){
    return this.nombre;
  }

  this.getnumJugadores = function(){
    return this.numJugadores;
  }

}

//FUNCION PARA CREAR LA COOKIE
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

  const expires = "expires=" + d.toUTCString();
  const value = encodeURIComponent(JSON.stringify(cvalue));

  document.cookie = cname + "=" + value + ";" + expires + ";path=/";
}

// FUNCION PARA LEER LA COOKIE
function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();

    if (c.indexOf(name) === 0) {
      const value = decodeURIComponent(c.substring(name.length));

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }

  return null;
}


//creamos la cookie
setCookie("comida","manzanas",7);

//leemos la cookie
console.log("El valor de comida es: " + getCookie("comida"));

setCookie("comida","churros",7);
var valor = getCookie("comida");
console.log("El valor de comida es: " + valor);

//Otra cookie
var deportes = ["futbol", "baloncesto", "tenis"];
setCookie("deportes", deportes,30);

var valor = getCookie("deportes");
console.log(valor[0]); //futbol
valor[0] = "badminton";
setCookie("deportes", valor, 30);
console.log(valor[0]); //badminton

//Seguimos con cookies, pero con Objects
var olimpiadas = [];

olimpiadas.push(new juega ("futbol",11));
olimpiadas.push(new juega ("baloncesto",5));
console.log(olimpiadas[0].getNombre()); // Futbol
//Guardamos la cookie
setCookie("olimpiadas",olimpiadas,30);
//leemos la cookie
var dep = getCookie("olimpiadas");
console.log(dep);
console.log(dep[0].nombre); // Futbol
console.log(dep[0].getNombre()); // Futbol ERROR: EL JSON NO SE GUARDAN METODOS