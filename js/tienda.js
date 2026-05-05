/* =========================================================
   TIENDA.JS - ESCUELA DE FÚTBOL SANTOS
   Manejo del carrito de compras y conexión con backend
   ========================================================= */


/* =========================
   CONFIGURACIÓN DEL BACKEND
   ========================= */

// URL base del servidor backend donde corre Node.js
const API_URL = "http://localhost:3000";

// Arreglo donde se almacenan los productos agregados al carrito
let carrito = [];


/* =========================
   OBTENER PRODUCTOS DESDE EL BACKEND
   ========================= */

/*
   Esta función solicita al backend la lista de productos
   usando una petición HTTP GET.
*/
async function obtenerProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);
        const productos = await respuesta.json();

        console.log("Productos recibidos del servidor:", productos);

        // Se envían los productos a la función que los muestra en pantalla
        mostrarProductos(productos);

    } catch (error) {
        console.error("Error al obtener productos del backend:", error);
    }
}


/* =========================
   MOSTRAR PRODUCTOS EN LA INTERFAZ
   ========================= */

/*
   Recibe los productos del backend y los renderiza en el HTML
*/
function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");

    // Validación por si el contenedor no existe en el HTML
    if (!contenedor) {
        console.error("No existe el contenedor de productos en el HTML");
        return;
    }

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const elemento = document.createElement("div");

        elemento.classList.add("producto");

        elemento.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">
                Agregar al carrito
            </button>
        `;

        contenedor.appendChild(elemento);
    });
}


/* =========================
   AGREGAR PRODUCTOS AL CARRITO
   ========================= */

/*
   Agrega un producto seleccionado al carrito de compras
*/
function agregarAlCarrito(id, nombre, precio) {
    carrito.push({
        id: id,
        nombre: nombre,
        precio: precio
    });

    console.log("Carrito actualizado:", carrito);

    actualizarTotal();
}


/* =========================
   CALCULAR TOTAL DEL CARRITO
   ========================= */

/*
   Calcula la suma total de todos los productos en el carrito
*/
function actualizarTotal() {
    const total = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio;
    }, 0);

    const elementoTotal = document.getElementById("total");

    if (elementoTotal) {
        elementoTotal.textContent = total;
    }
}


/* =========================
   FINALIZAR COMPRA Y ENVIAR AL BACKEND
   ========================= */

/*
   Envía el carrito al backend para registrar el pedido
*/
async function finalizarCompra() {
    try {
        const respuesta = await fetch(`${API_URL}/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                carrito: carrito
            })
        });

        const resultado = await respuesta.json();

        console.log("Respuesta del servidor:", resultado);

        alert("Compra realizada correctamente");

        // Vaciar carrito después de la compra
        carrito = [];
        actualizarTotal();

    } catch (error) {
        console.error("Error al enviar el pedido al backend:", error);
    }
}


/* =========================
   INICIALIZACIÓN DEL SISTEMA
   ========================= */

/*
   Se ejecuta automáticamente cuando carga la página
   y trae los productos desde el backend
*/
document.addEventListener("DOMContentLoaded", obtenerProductos);