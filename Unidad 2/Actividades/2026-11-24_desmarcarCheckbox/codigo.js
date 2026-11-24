// Extra: consigue hacerlo con una única función que reciba un parámetro:

// checkAll(true);
// checkAll(false);

// Conceptos: querySelectorAll(), forEach(), checked, funciones y eventos.

const btnMostrarNivel = document.getElementById('mostrar');

const caja = document.getElementById('caja');
const resultado = document.getElementById('resultado');
const btnMarcar = document.getElementById('selTodos');
const btnDesmarcar = document.getElementById('desTodos');
const btnAlternar = document.getElementById('altTodos');

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

function checkAll(estado) {
    const checkboxes = document.querySelectorAll('input[name="lenguajes"]');
    for (const c of checkboxes) {
        c.checked = estado;
    }
}

btnMarcar.addEventListener("click", () => checkAll(true));

btnDesmarcar.addEventListener("click", () => checkAll(false));

btnAlternar.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('input[name="lenguajes"]');
    for (const c of checkboxes) {
        c.checked = !c.checked;
    }
});

btnMostrarNivel.addEventListener('click', mostrarLenguajes);

