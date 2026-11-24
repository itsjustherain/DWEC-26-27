// Restricción: utiliza un selector como input[name="lenguajes"]:checked.

// Conceptos: checkbox, checked, querySelectorAll(), Array.from(), map(), join().

const btnMostrar = document.getElementById('mostrar')
const btnOcultar = document.getElementById('ocultar')
const caja = document.getElementById('caja');
const resultado = document.getElementById('resultado')

function mostrarLenguajes() {
    const seleccion = document.querySelectorAll('input[name="lenguajes"]:checked');

    if (seleccion.length === 0) {
        resultado.textContent = 'No has seleccionado ningún lenguaje.';
    } else {
        // Array.from: convierte el NodeList en un array para poder usar map()
        // map: se queda solo con el value de cada checkbox marcado
        // join: une los valores en un único texto separados por ', '
        const texto = Array.from(seleccion).map(input => input.value).join(', ');
        resultado.textContent = 'Tus lenguajes favoritos: ' + texto;
    }
}

function ocultarLenguajes() {
    resultado.textContent = '';
}

btnMostrar.addEventListener('click', mostrarLenguajes);
btnOcultar.addEventListener('click', ocultarLenguajes);
