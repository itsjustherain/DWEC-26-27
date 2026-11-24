// validacion de un formulario de emploeados de una empresa con los siguientes elementos:
// - DNI
// - Nombre
// - Apellidos
// - Edad
// - Fecha de nacimiento
// - Tipo de empleado: Directivo, Encargado, Operario
// - Departamento/s al que pertenece

// REGLAS DE VALIDACIÓN
// 1. DNI correcto
// 2. Algún valor > 3 para nombre y apellidos sin contar blancos
// 3. Edad entre 18 y 65
// 4. Fecha de nacimiento correcta en formato dd/mm/aaaa
// 5. Que se haya marcado alguna opción en tipo de empleado y departamento

// Recojo el formulario
let form = document.forms[0];
form.addEventListener("submit", (event) => {
    event.preventDefault(); // retengo el submit
    let hayErrores = false; // lo declaro (antes daba ReferenceError)
    let errorDni = document.getElementById("errorDni");
    errorDni.innerHTML = ""; // limpio el error anterior

    // compruebo cosas
    if (!compruebaDNI(form.elements["dni"].value)) {
        hayErrores = true;
        errorDni.innerHTML = "<p>- El dni introducido no es correcto</p>"
    }

    // envio el formulario
    if(!hayErrores) {
        form.submit();
    }
    
});

function compruebaDNI(DNI) {
    // 8 números + letra, y la letra debe corresponder al número
    if (!/^[0-9]{8}[A-Za-z]$/.test(DNI)) {
        return false;
    }
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const numero = parseInt(DNI.substring(0, 8), 10);
    return letras[numero % 23] === DNI[8].toUpperCase();
}
