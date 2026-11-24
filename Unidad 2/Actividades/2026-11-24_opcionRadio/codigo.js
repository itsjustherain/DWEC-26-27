const btnMostrarNivel = document.getElementById('mostrar');
const btnOcultarNivel = document.getElementById('ocultar');
const caja = document.getElementById('caja');
const resultado = document.getElementById('resultado');

function mostrarNivel() {
    const radios = document.querySelectorAll('input[name="nivel"]');
    let seleccionado = null;

    radios.forEach((radio) => {
        if(radio.checked) {
            seleccionado = radio.value;
        }
    });
    
    resultado.textContent = "Selecciona una opcion por favor";

    if (seleccionado !== null) {
        resultado.textContent = `Tu nivel es ${seleccionado}`;
    }
}

btnMostrarNivel.addEventListener('click', mostrarNivel);
caja.addEventListener('change', mostrarNivel);
btnOcultarNivel.addEventListener('click', () => {
    resultado.textContent = "";
})