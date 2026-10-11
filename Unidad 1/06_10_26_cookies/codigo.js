// FUNCIÓN PARA CREAR LA COOKIE
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    // encodeURIComponent evita que ";" o "," del valor rompan la cookie
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

// FUNCIÓN PARA LEER LA COOKIE
function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return decodeURIComponent(c.substring(name.length));
        }
    }
    return "";
}

// Creamos la cookie
setCookie("comida", "manzanas", 7);

// Leemos la cookie
console.log("El valor de comida es: " + getCookie("comida"));

setCookie("comida", "churros", 7);
console.log("El valor de comida es: " + getCookie("comida"));

// Otra cookie: una cookie solo guarda texto, así que el array se guarda como JSON
const deportes = ["futbol", "baloncesto", "tenis"];
setCookie("deportes", JSON.stringify(deportes), 30);

const deportesLeidos = JSON.parse(getCookie("deportes"));
console.log(deportesLeidos[0]); // futbol
deportesLeidos[0] = "badminton";
setCookie("deportes", JSON.stringify(deportesLeidos), 30);
console.log(JSON.parse(getCookie("deportes"))[0]); // badminton
