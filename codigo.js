const usuario = "itsjustherain";
const repositorio = "DWEC-26-27";
const contenedor = document.getElementById("carpetas");
const api = `https://api.github.com/repos/${usuario}/${repositorio}/contents`;
const paginas = `https://${usuario}.github.io/${repositorio}`;

async function obtenerContenido(ruta = "") {
    const respuesta = await fetch(`${api}/${ruta}`);
    if (!respuesta.ok) {
        throw new Error(`GitHub respondió ${respuesta.status} al consultar ${ruta || "el repositorio"}`);
    }
    return respuesta.json();
}

function ordenarPorNombre(a, b) {
    return a.name.localeCompare(b.name, "es", { numeric: true });
}

function agregarEnlace(contenedorPadre, texto, ruta) {
    const enlace = document.createElement("a");
    enlace.href = `${paginas}/${ruta.split("/").map(encodeURIComponent).join("/")}/`;
    enlace.textContent = texto;
    contenedorPadre.appendChild(enlace);
}

async function cargarUnidades() {
    try {
        const raiz = await obtenerContenido();
        const unidades = raiz
            .filter(elemento => elemento.type === "dir" && /^Unidad\s+\d+$/i.test(elemento.name))
            .sort(ordenarPorNombre);

        contenedor.replaceChildren();

        if (unidades.length === 0) {
            contenedor.textContent = "Todavía no hay carpetas de unidades.";
            return;
        }

        for (const unidad of unidades) {
            const seccion = document.createElement("section");
            const titulo = document.createElement("h2");
            titulo.textContent = unidad.name;
            seccion.appendChild(titulo);

            const contenidos = await obtenerContenido(unidad.path);
            const clases = contenidos.filter(elemento => elemento.type === "dir").sort(ordenarPorNombre);
            const paginaUnidad = contenidos.some(elemento => elemento.type === "file" && elemento.name.toLowerCase() === "index.html");

            if (paginaUnidad) {
                agregarEnlace(seccion, "Página de la unidad", unidad.path);
            }

            const lista = document.createElement("ul");
            for (const clase of clases) {
                const archivosClase = await obtenerContenido(clase.path);
                if (!archivosClase.some(archivo => archivo.type === "file" && archivo.name.toLowerCase() === "index.html")) {
                    continue;
                }

                const elemento = document.createElement("li");
                agregarEnlace(elemento, clase.name.replaceAll("_", " "), clase.path);
                lista.appendChild(elemento);
            }

            if (lista.childElementCount > 0) {
                seccion.appendChild(lista);
            } else if (!paginaUnidad) {
                const aviso = document.createElement("p");
                aviso.textContent = "Todavía no hay páginas de clase publicadas.";
                seccion.appendChild(aviso);
            }

            contenedor.appendChild(seccion);
        }
    } catch (error) {
        console.error("Error obteniendo las unidades y clases:", error);
        contenedor.textContent = "No se pudieron cargar las unidades. Comprueba la conexión y que el repositorio sea público.";
    }
}

cargarUnidades();
