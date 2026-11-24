const usuario = "itsjustherain";
const repositorio = "DWEC-26-27";
const contenedor = document.getElementById("carpetas");
// Una sola petición con el árbol completo (la API de GitHub limita a 60 peticiones/hora sin autenticar)
const api = `https://api.github.com/repos/${usuario}/${repositorio}/git/trees/HEAD?recursive=1`;
const paginas = `https://${usuario}.github.io/${repositorio}`;
const CLAVE_CACHE = `arbol-${usuario}-${repositorio}`;
const MINUTOS_CACHE = 10;
// Subcarpetas de cada unidad, en el orden en que se muestran
const TIPOS = ["Apuntes", "Actividades"];

let arbol = null;

async function cargarArbol() {
    try {
        const guardado = JSON.parse(sessionStorage.getItem(CLAVE_CACHE));
        if (guardado && Date.now() - guardado.hora < MINUTOS_CACHE * 60000) {
            return guardado.arbol;
        }
    } catch { /* caché ilegible: se vuelve a pedir */ }

    const respuesta = await fetch(api);
    if (!respuesta.ok) {
        throw new Error(`GitHub respondió ${respuesta.status} al consultar el repositorio`);
    }
    const datos = await respuesta.json();
    try {
        sessionStorage.setItem(CLAVE_CACHE, JSON.stringify({ hora: Date.now(), arbol: datos.tree }));
    } catch { /* sin caché */ }
    return datos.tree;
}

// Lista el contenido directo de una carpeta, con el mismo formato que la API "contents"
async function obtenerContenido(ruta = "") {
    arbol ??= await cargarArbol();
    const prefijo = ruta ? `${ruta}/` : "";
    return arbol
        .filter(e => e.path.startsWith(prefijo) && !e.path.slice(prefijo.length).includes("/"))
        .map(e => ({
            name: e.path.slice(prefijo.length),
            path: e.path,
            type: e.type === "tree" ? "dir" : "file"
        }));
}

function ordenarPorNombre(a, b) {
    return a.name.localeCompare(b.name, "es", { numeric: true });
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// "2026-11-24_opcionRadio" -> { fecha: "24 nov", titulo: "Opcion Radio" }
function formatearClase(nombre) {
    const [, anio, mes, dia, resto] = nombre.match(/^(\d{4})-(\d{2})-(\d{2})_(.+)$/) ?? [];
    if (!resto) {
        return { fecha: "", titulo: nombre.replaceAll("_", " ") };
    }
    const titulo = resto
        .replace(/([a-záéíóúñ])([A-Z])/g, "$1 $2")
        .replaceAll("_", " ");
    return {
        fecha: `${Number(dia)} ${MESES[Number(mes) - 1]}`,
        titulo: titulo.charAt(0).toUpperCase() + titulo.slice(1)
    };
}

function agregarEnlace(contenedorPadre, texto, ruta, esClase = false) {
    const enlace = document.createElement("a");
    enlace.href = `${paginas}/${ruta.split("/").map(encodeURIComponent).join("/")}/`;
    if (esClase) {
        const { fecha, titulo } = formatearClase(texto);
        if (fecha) {
            const etiqueta = document.createElement("span");
            etiqueta.className = "fecha";
            etiqueta.textContent = fecha;
            enlace.appendChild(etiqueta);
        }
        const nombre = document.createElement("span");
        nombre.className = "nombre";
        nombre.textContent = titulo;
        enlace.appendChild(nombre);
    } else {
        enlace.textContent = texto;
    }
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

            let hayClases = false;
            const tipos = document.createElement("div");
            tipos.className = "tipos";
            for (const tipo of TIPOS) {
                const carpetaTipo = clases.find(clase => clase.name === tipo);
                if (!carpetaTipo) {
                    continue;
                }

                const lista = document.createElement("ul");
                const carpetasTipo = (await obtenerContenido(carpetaTipo.path))
                    .filter(elemento => elemento.type === "dir")
                    .sort(ordenarPorNombre);

                for (const clase of carpetasTipo) {
                    const archivosClase = await obtenerContenido(clase.path);
                    if (!archivosClase.some(archivo => archivo.type === "file" && archivo.name.toLowerCase() === "index.html")) {
                        continue;
                    }

                    const elemento = document.createElement("li");
                    agregarEnlace(elemento, clase.name, clase.path, true);
                    lista.appendChild(elemento);
                }

                if (lista.childElementCount > 0) {
                    const bloque = document.createElement("div");
                    bloque.className = "tipo";
                    bloque.dataset.tipo = tipo.toLowerCase();

                    const subtitulo = document.createElement("h3");
                    subtitulo.textContent = tipo;
                    const contador = document.createElement("span");
                    contador.textContent = lista.childElementCount;
                    subtitulo.appendChild(contador);

                    bloque.appendChild(subtitulo);
                    bloque.appendChild(lista);
                    tipos.appendChild(bloque);
                    hayClases = true;
                }
            }

            if (hayClases) {
                seccion.appendChild(tipos);
            }

            if (!hayClases && !paginaUnidad) {
                const aviso = document.createElement("p");
                aviso.textContent = "Todavía no hay páginas de clase publicadas.";
                seccion.appendChild(aviso);
            }

            contenedor.appendChild(seccion);
        }
    } catch (error) {
        console.error("Error obteniendo las unidades y clases:", error);
        const aviso = document.createElement("p");
        aviso.className = "error";
        aviso.textContent = "No se pudieron cargar las unidades. Comprueba la conexión y que el repositorio sea público.";
        contenedor.replaceChildren(aviso);
    }
}

cargarUnidades();