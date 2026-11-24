// Referencias a los elementos
const zona = document.getElementById("zonaDibujo");
const svg = document.getElementById("superficieDibujo");

// Array de puntos de contacto activos
let ongoingTouches = [];

// Configuración de eventos
function startup() {
    zona.addEventListener("touchstart", handleStart, false);
    zona.addEventListener("touchmove", handleMove, false);
    zona.addEventListener("touchend", handleEnd, false);
    zona.addEventListener("touchcancel", handleCancel, false);
}

function handleStart(evt) {
    evt.preventDefault();

    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {

        let touch = touches[i];

        // Crear nuevo trazo
        let linea = document.createElementNS(
            "http://www.w3.org/2000/svg", "polyline"
        );

        linea.setAttribute("fill", "none");
        linea.setAttribute("stroke", "#000000");
        linea.setAttribute("stroke-width", "3");
        linea.setAttribute("stroke-linecap", "round");
        linea.setAttribute("stroke-linejoin", "round");

        svg.appendChild(linea);

        // Registrar el contacto
        ongoingTouches.push({
            identifier: touch.identifier,
            x: touch.clientX,
            y: touch.clientY,
            linea: linea
        });

        // Punto inicial
        let pos = obtenerPosicion(touch);

        linea.setAttribute("points", `${pos.x},${pos.y}`);
    }
}

function handleMove(evt) {
    evt.preventDefault();

    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {

        let touch = touches[i];

        // Buscar el contacto que se está moviendo
        let idx = ongoingTouchIndexById(touch.identifier);

        if (idx < 0) continue;

        let pos = obtenerPosicion(touch);

        let actual = ongoingTouches[idx];

        // Añadir nuevo punto al trazo
        let puntos = actual.linea.getAttribute("points");

        actual.linea.setAttribute(
            "points",
            puntos + ` ${pos.x},${pos.y}`
        );

        // Actualizar posición
        actual.x = touch.clientX;
        actual.y = touch.clientY;
    }
}

function handleEnd(evt) {
    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {

        let idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ongoingTouches.splice(idx, 1);
        }
    }
}

function handleCancel(evt) {
    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {

        let idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ongoingTouches.splice(idx, 1);
        }
    }
}

// Obtener coordenadas relativas a la zona de dibujo
function obtenerPosicion(touch) {
    let rect = zona.getBoundingClientRect();

    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// Buscar un contacto por su identificador
function ongoingTouchIndexById(idToFind) {

    for (let i = 0; i < ongoingTouches.length; i++) {

        if (ongoingTouches[i].identifier === idToFind) {
            return i;
        }
    }

    return -1;
}

// Borrar todos los trazos
function borrarDibujo() {
    svg.innerHTML = "";
    ongoingTouches = [];
}

// Inicializar
startup();
