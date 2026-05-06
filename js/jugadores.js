/* =========================================================
   JUGADORES.JS - ESCUELA SANTOS
   Maneja:
   - Carga de jugadores desde backend
   - Render dinámico de tarjetas
   - Filtro por categoría
   - Búsqueda por nombre
   - Modal con animación estilo videojuego
   ========================================================= */


/* =========================
   CONFIGURACIÓN GENERAL
   ========================= */

// URL base del backend (ajusta si cambias el puerto)
const API = "http://localhost:3000";


/* =========================
   REFERENCIAS DEL DOM
   ========================= */

// Contenedor donde se renderizan los jugadores
const contenedor = document.getElementById("jugadores");

// Input de búsqueda
const buscador = document.getElementById("buscador");

// Select de categorías
const categorias = document.getElementById("categorias");

// Modal
const modal = document.getElementById("modalJugador");

// Contenedor del detalle dentro del modal
const detalle = document.getElementById("detalleJugador");

// Botón cerrar modal
const cerrar = document.getElementById("cerrarModal");


/* =========================
   FUNCIÓN: CARGAR TODOS LOS JUGADORES
   ========================= */

async function cargarJugadores() {
    try {
        // Petición al backend
        const res = await fetch(`${API}/jugadores`);

        // Convertir respuesta a JSON
        const data = await res.json();

        // Mostrar en pantalla
        mostrarJugadores(data);

    } catch (error) {
        console.error("Error al cargar jugadores:", error);
    }
}


/* =========================
   FUNCIÓN: MOSTRAR JUGADORES
   ========================= */

function mostrarJugadores(jugadores) {

    // Limpiar contenedor antes de renderizar
    contenedor.innerHTML = "";

    // Recorrer cada jugador
    jugadores.forEach(jugador => {

        // Crear tarjeta
        const card = document.createElement("div");
        card.classList.add("jugador-card");

        // Contenido HTML de la tarjeta
        card.innerHTML = `
            <!-- Imagen del jugador -->
            <img src="${jugador.foto}" alt="Jugador" loading="lazy">

            <!-- Información básica -->
            <h3>${jugador.nombre}</h3>
            <p>Edad: ${jugador.edad}</p>
            <p>Posición: ${jugador.posicion}</p>
        `;

        // Evento click para abrir modal con detalle
        card.addEventListener("click", () => {
            mostrarDetalle(jugador);
        });

        // Agregar tarjeta al contenedor
        contenedor.appendChild(card);
    });
}


/* =========================
   FUNCIÓN: MOSTRAR DETALLE
   ========================= */

function mostrarDetalle(jugador) {

    detalle.innerHTML = `

    <!-- Contenedor para animación 3D -->
    <div class="animacion-contenedor">
        <img src="${jugador.foto}" class="jugador-img" id="imgJugador">
    </div>

    <!-- Nombre del jugador -->
    <h2>${jugador.nombre}</h2>

    <!-- Posición -->
    <p>${jugador.posicion}</p>

    <!-- Habilidades -->
    <p>Velocidad</p>
    <div class="barra" style="width:${jugador.velocidad || 50}%"></div>

    <p>Tiro</p>
    <div class="barra" style="width:${jugador.tiro || 50}%"></div>

    <p>Pase</p>
    <div class="barra" style="width:${jugador.pase || 50}%"></div>
`;

    // Mostrar modal
    modal.style.display = "flex";

    // Activar animación después de renderizar
    setTimeout(() => {
        const img = document.getElementById("imgJugador");
        if (img) {
            img.classList.add("animar");
        }
    }, 100);
}


/* =========================
   EVENTO: CERRAR MODAL
   ========================= */

// Cerrar con botón X
cerrar.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar al hacer click fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


/* =========================
   BUSCADOR CON DEBOUNCE
   ========================= */

let timeout;

// Evento al escribir en el input
buscador.addEventListener("input", () => {

    // Limpiar tiempo anterior
    clearTimeout(timeout);

    // Esperar 300ms antes de hacer la petición
    timeout = setTimeout(async () => {

        const valor = buscador.value.trim();

        try {
            // Si el input está vacío, cargar todos
            if (valor === "") {
                cargarJugadores();
                return;
            }

            // Petición al backend para buscar
            const res = await fetch(`${API}/jugadores/buscar/${valor}`);
            const data = await res.json();

            // Mostrar resultados
            mostrarJugadores(data);

        } catch (error) {
            console.error("Error en búsqueda:", error);
        }

    }, 300);
});


/* =========================
   FILTRO POR CATEGORÍA
   ========================= */

categorias.addEventListener("change", async () => {

    const categoria = categorias.value;

    try {
        // Si selecciona "todos"
        if (categoria === "todos") {
            cargarJugadores();
            return;
        }

        // Petición al backend filtrando
        const res = await fetch(`${API}/jugadores/categoria/${categoria}`);
        const data = await res.json();

        // Mostrar jugadores filtrados
        mostrarJugadores(data);

    } catch (error) {
        console.error("Error al filtrar:", error);
    }
});


/* =========================
   INICIALIZACIÓN
   ========================= */

// Cargar jugadores al abrir la página
cargarJugadores();
