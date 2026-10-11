// EJERCICIOS

const datos = [
    {
        dni: "77777777A",
        nombre: "PEPE",
        apellidos: "LOPEZ PEREZ",
        telefono: "666666666",
        asignatura: {
            nombre: "DWEC",
            codigo: 1111
        }
    },
    {
        dni: "66666666B",
        nombre: "MARIA",
        apellidos: "GARCIA GOMEZ",
        telefono: "777777777",
        asignatura: {
            nombre: "DWES",
            codigo: 2222
        }
    },
    {
        dni: "22222222C",
        nombre: "JUAN",
        apellidos: "PEREZ SANCHEZ",
        telefono: "888888888",
        asignatura: {
            nombre: "DIW",
            codigo: 3333
        }
    }
];

// EJERCICIO 1
// Realiza un listado completo en consola de todos los profesores junto con la asignatura que impartan
for (let i = 0; i < datos.length; i++) {
    console.log(datos[i].dni + " ");
    console.log(datos[i].nombre + " ");
    console.log(datos[i].apellidos + " ");
    console.log(datos[i].telefono + " ");
    console.log(datos[i].asignatura.nombre + " ");
    console.log(datos[i].asignatura.codigo + " ");
    console.log();
}

// EJERCICIO 2
// Dado un código de asignatura mostrar el nombre y apellido del profesor que la imparta
const codigoBuscado = 2222;

let encontrado = false;

for (let i = 0; i < datos.length; i++) {
    if (datos[i].asignatura.codigo === codigoBuscado) {
        console.log(`Profesor: ${datos[i].nombre} ${datos[i].apellidos}`);
        encontrado = true;
        break;
    }
}
if (!encontrado) {
    console.log("No hay ninguna asignatura con ese código");
}

// Capturando elementos del formulario
const input1 = document.getElementById("valor");
const btnEnviar = document.getElementById("boton");

// Capturando eventos
btnEnviar.addEventListener("click",
    function () {
        console.log(input1.value);
        input1.value = "";
    }
);

// EJERCICIO 3
// Crear un formulario para dar de alta profesores introduciendo el dni, nombre, apellidos y
// teléfono del mismo.
const inputDniProfesor = document.getElementById("dniProfesor");
const inputNombreProfesor = document.getElementById("nombreProfesor");
const inputApellidosProfesor = document.getElementById("apellidosProfesor");
const inputTelefonoProfesor = document.getElementById("telefonoProfesor");

const btnProfe = document.getElementById("btnProfe");
const btnMostrarProfe = document.getElementById("btnMostrarProfe");
let nuevoProfesor;

btnProfe.addEventListener("click",
    function () {
        if (inputDniProfesor.value === "" || inputNombreProfesor.value === "" ||
            inputApellidosProfesor.value === "" || inputTelefonoProfesor.value === "") {
            alert("Rellena todos los campos");
            return;
        }
        for (let i = 0; i < datos.length; i++) {
            if (datos[i].dni === inputDniProfesor.value) {
                alert("Ya existe un profesor con ese DNI");
                return;
            }
        }
        // Todavía no imparte ninguna asignatura: asignatura es null hasta que se le añada una
        nuevoProfesor = {
            dni: inputDniProfesor.value,
            nombre: inputNombreProfesor.value,
            apellidos: inputApellidosProfesor.value,
            telefono: inputTelefonoProfesor.value,
            asignatura: null
        };
        datos.push(nuevoProfesor);
        inputDniProfesor.value = "";
        inputNombreProfesor.value = "";
        inputApellidosProfesor.value = "";
        inputTelefonoProfesor.value = "";
        alert("¡Profesor dado de alta correctamente!");
    }
);

btnMostrarProfe.addEventListener("click",
    function () {
        console.log(nuevoProfesor);
    }
);

// Más abajo añadir otro formulario para añadir asignaturas a un profesor indicando código de la
// asignatura y DNI del profesor que la imparta.
// Cada profesor tiene una única asignatura: si ya tenía una, se sustituye por la nueva.
const inputDniAsignatura = document.getElementById("dniProfe");
const inputNombreAsig = document.getElementById("nombreAsig");
const inputCodigoAsignatura = document.getElementById("codAsigAsignatura");
let dniProfeAsignado;
const btnAsig = document.getElementById("btnAsig");
const btnMostrarAsig = document.getElementById("btnMostrarAsig");
btnAsig.addEventListener("click",
    function () {
        // El código se guarda como número, igual que en los datos iniciales
        const codigo = Number(inputCodigoAsignatura.value);
        if (inputNombreAsig.value === "" || inputCodigoAsignatura.value === "" || isNaN(codigo)) {
            alert("Introduce un nombre y un código numérico");
            return;
        }
        let profesorEncontrado = false;
        for (let i = 0; i < datos.length; i++) {
            if (datos[i].dni === inputDniAsignatura.value) {
                datos[i].asignatura = {
                    nombre: inputNombreAsig.value,
                    codigo: codigo
                };
                profesorEncontrado = true;
            }
        }
        if (!profesorEncontrado) {
            alert("No existe ningún profesor con ese DNI");
            return;
        }
        dniProfeAsignado = inputDniAsignatura.value;
        inputDniAsignatura.value = "";
        inputNombreAsig.value = "";
        inputCodigoAsignatura.value = "";
        alert("¡Asignatura agregada correctamente!");
    }
);

btnMostrarAsig.addEventListener("click",
    function () {
        for (let i = 0; i < datos.length; i++) {
            if (datos[i].dni === dniProfeAsignado && datos[i].asignatura) {
                console.log(`Profesor: ${datos[i].nombre}, Código Asignatura: ${datos[i].asignatura.codigo}, Nombre Asignatura: ${datos[i].asignatura.nombre} `);
            }
        }
    }
);

// Añadir un tercer y último formulario donde introduciendo el código de la asignatura me indique
// el profesor que imparte esa asignatura
const inputCodigoBuscar = document.getElementById("codAsigBuscar");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click",
    function () {
        const codigo = Number(inputCodigoBuscar.value);
        for (let i = 0; i < datos.length; i++) {
            // Los profesores sin asignatura se saltan
            if (datos[i].asignatura && datos[i].asignatura.codigo === codigo) {
                console.log(`Nombre Asignatura: ${datos[i].asignatura.nombre}, código asignatura: ${datos[i].asignatura.codigo}, nombre profesor: ${datos[i].nombre}`);
            }
        }
        inputCodigoBuscar.value = "";
    }
);

// Todos los datos se mostrarán por consola (las confirmaciones y avisos, con alert)
