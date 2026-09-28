const usuario = "itsjustherain";
const repositorio = "DWEC-26-27";
const rama = "main";
const contenedor = document.getElementById("carpetas");

fetch(`https://api.github.com/repos/${usuario}/${repositorio}/contents/`)
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`GitHub respondió ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(elementos => {
        const unidades = elementos.filter(elemento =>
            elemento.type === "dir" && /^Unidad\s+\d+$/i.test(elemento.name)
        );

        if (unidades.length === 0) {
            contenedor.textContent = "Todavía no hay carpetas de unidades.";
            return;
        }

        unidades
            .sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true }))
            .forEach(unidad => {
                const enlace = document.createElement("a");
                enlace.href = `https://${usuario}.github.io/${repositorio}/${encodeURIComponent(unidad.name)}/`;
                enlace.textContent = unidad.name;

                const elemento = document.createElement("div");
                elemento.appendChild(enlace);
                contenedor.appendChild(elemento);
            });
    })
    .catch(error => {
        console.error("Error obteniendo las unidades:", error);
        contenedor.textContent = "No se pudieron cargar las unidades. Comprueba la conexión y que el repositorio sea público.";
    });
