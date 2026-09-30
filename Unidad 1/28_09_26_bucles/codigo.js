// EJERCICIOS

var datos = [
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
        console.log();
    }

// EJERCICIO 2
// Dado un código de asignatura mostrar el nombre y apellido del profesor que la imparta
    var codigoBuscado = 2222;

let encontrado = false;

for(let i = 0; i < datos.length; i++){
    if (datos[i].asignatura.codigo === codigoBuscado){
        console.log(`Profesor: ${datos[i].nombre} ${datos[i].apellidos}`);
        encontrado = true;
        break;
    }
}
if (encontrado != true){
    console.log("No hay ninguna asignatura con ese código");
}

// Capturando elementos del formulario
var input1 = document.getElementById("valor");
let btnEnviar = document.getElementById("boton");

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
var dniProfesor = document.getElementById("dniProfesor");
var nombreProfesor = document.getElementById("nombreProfesor");
var apellidosProfesor = document.getElementById("apellidosProfesor");
var telefonoProfesor = document.getElementById("telefonoProfesor");

let btnProfe = document.getElementById("btnProfe");
let btnMostrarProfe = document.getElementById("btnMostrarProfe");
let nuevoProfesor;

btnProfe.addEventListener("click",
    function() {
        nuevoProfesor = {dni: dniProfesor.value,
            nombre: nombreProfesor.value,
            apellidos: apellidosProfesor.value,
            telefono: telefonoProfesor.value}
        datos.push(nuevoProfesor);
        dniProfesor.value = "";
        nombreProfesor.value = "";
        apellidosProfesor.value = "";
        telefonoProfesor.value = "";
        alert("¡Profesor dado de alta correctamente!");
    }
)

btnMostrarProfe.addEventListener("click",
    function() {
        console.log(nuevoProfesor)
    }
)

// Más abajo añadir otro formulario para añadir asignaturas a un profesor indicando código de la 
// asignatura y DNI del profesor que la imparta.
var dniAsignaturaProfe = document.getElementById("dniProfe"); 
var nombreAsig = document.getElementById("nombreAsig"); 
var codigoAsignaturaInput = document.getElementById("codAsigAsignatura"); 
var dniProfe;
let btnAsig = document.getElementById("btnAsig");       
let btnMostrarAsig = document.getElementById("btnMostrarAsig");       
btnAsig.addEventListener("click", 
    function() {
        for(let i = 0; i < datos.length; i++){
            if (datos[i].dni === dniAsignaturaProfe.value){
                    datos[i].asignatura = {
                        nombre : nombreAsig.value,
                        codigo : codigoAsignaturaInput.value
                    }
            }
        }
        dniProfe = dniAsignaturaProfe.value;
        dniAsignaturaProfe.value = ""
        nombreAsig.value = ""
        codigoAsignaturaInput.value = ""
        alert("!Asignatura agregada correctamente!");
    }
)


btnMostrarAsig.addEventListener("click",
    function() {
        for(let i = 0; i < datos.length; i++){
            if (datos[i].dni === dniProfe){
                    console.log(`Profesor: ${datos[i].nombre}, Código Asignatura: ${datos[i].asignatura.codigo}, Nombre Asignatura: ${datos[i].asignatura.nombre} `);
            }
        }
    }
)


//Añadir un tercer y último formulario donde introduciendo el código de la  asignatura me indique 
// el profeosr que imparte esa asignatura
var codigoAsignaturaBuscarInput = document.getElementById("codAsigBuscar");
let btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click",
    function() {
        for (let i = 0; i < datos.length; i++) {
            if (datos[i].asignatura.codigo == codigoAsignaturaBuscarInput.value) {
                console.log(`Nombre Asignatura: ${datos[i].asignatura.nombre}, código asignatura: ${datos[i].asignatura.codigo}, nombre profesor: ${datos[i].nombre}`);
            }
        }
        codigoAsignaturaBuscarInput.value = "";
    }
)

// Todos los datos se mostrarán por consola

