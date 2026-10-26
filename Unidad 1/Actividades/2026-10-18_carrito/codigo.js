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

var cantidad = document.getElementById("cantidad");
var concepto = document.getElementById("concepto");
var comprar = document.getElementById("comprar");
var verCarrito = document.getElementById("verCarrito");

