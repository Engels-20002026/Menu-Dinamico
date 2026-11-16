
const menuPrincipal = document.getElementById("menu-principal");
const menuToggle = document.getElementById("menu-toggle");


async function cargarMenu() {
    try {
        // Obtener los datos del archivo JSON
        const respuesta = await fetch("menu.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo menu.json");
        }

        const datos = await respuesta.json();

        // Limpiar el menu antes de cargar las opciones
        menuPrincipal.innerHTML = "";

        // Recorrer las opciones del JSON
        datos.menu.forEach(opcion => {

            const elemento = document.createElement("li");

            // Verificar si la opción tiene un submenú
            if (opcion.submenu) {

                // Crear botón para desplegar el submenú
                const boton = document.createElement("button");
                boton.className = "submenu-toggle";
                boton.innerHTML = `${opcion.icono} ${opcion.nombre} ▾`;
                boton.setAttribute("aria-expanded", "false");

                // Crear lista del submenú
                const listaSubmenu = document.createElement("ul");
                listaSubmenu.className = "submenu";

                // Recorrer las opciones secundarias
                opcion.submenu.forEach(subopcion => {

                    const elementoSubmenu = document.createElement("li");

                    const enlaceSubmenu = document.createElement("a");
                    enlaceSubmenu.textContent = subopcion.nombre;
                    enlaceSubmenu.href = subopcion.enlace;

                   // Cerrar el submenú después de seleccionar una opción
enlaceSubmenu.addEventListener("click", () => {
    elemento.classList.remove("open");
    boton.setAttribute("aria-expanded", "false");

    menuPrincipal.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
});

elementoSubmenu.appendChild(enlaceSubmenu);
listaSubmenu.appendChild(elementoSubmenu);
                });

                // Abrir y cerrar el submenú
                boton.addEventListener("click", () => {

                    const estaAbierto = elemento.classList.toggle("open");

                    boton.setAttribute("aria-expanded", estaAbierto);

                });

                elemento.appendChild(boton);
                elemento.appendChild(listaSubmenu);

            } else {

                // Crear enlace para las opciones principales
                const enlace = document.createElement("a");

                enlace.href = opcion.enlace;
                enlace.textContent = `${opcion.icono} ${opcion.nombre}`;

                // Cerrar el menú móvil al seleccionar una opción
enlace.addEventListener("click", () => {
    menuPrincipal.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
});

elemento.appendChild(enlace);
            }

            // Agregar la opción al menú principal
            menuPrincipal.appendChild(elemento);
        });

        console.log("Menú cargado correctamente desde JSON");

    } catch (error) {

        console.error("Error al cargar el menú:", error);

        menuPrincipal.innerHTML =
            "<li><span style='color:white'>Error al cargar el menú</span></li>";
    }
}

// ABRIR Y CERRAR EL MENÚ EN DISPOSITIVOS MÓVILES
menuToggle.addEventListener("click", () => {

    const estaAbierto = menuPrincipal.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", estaAbierto);
});

// CARGAR EL MENÚ AL INICIAR LA PÁGINA
cargarMenu();
