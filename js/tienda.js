/* =========================================================
   CARRITO DE COMPRAS - ESCUELA SANTOS
   Archivo: tienda.js
   Maneja productos, total y envío por WhatsApp
   ========================================================= */


/* =========================
   VARIABLES GLOBALES
   ========================= */

// Arreglo que almacena los productos del carrito
let carrito = [];

// Total acumulado de la compra
let total = 0;


/* =========================================================
   AGREGAR PRODUCTO AL CARRITO
   ========================================================= */

function agregarAlCarrito(nombre, precio) {

    // Se agrega el producto al carrito como objeto
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    // Se suma el precio al total
    total += precio;

    // Se actualiza la interfaz
    actualizarCarrito();
}


/* =========================================================
   ACTUALIZAR CARRITO EN PANTALLA
   ========================================================= */

function actualizarCarrito() {

    // Elemento donde se listan los productos
    const lista = document.getElementById("lista-carrito");

    // Elemento donde se muestra el total
    const totalHTML = document.getElementById("total");

    // Se limpia la lista antes de volver a dibujar
    lista.innerHTML = "";

    // Recorre los productos del carrito
    carrito.forEach((item, index) => {

        // Se crea elemento <li>
        const li = document.createElement("li");

        // Texto del producto
        li.textContent = `${item.nombre} - $${item.precio}`;

        // Botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";

        // Acción eliminar producto
        btnEliminar.onclick = function () {
            eliminarProducto(index);
        };

        // Se agrega el botón al elemento
        li.appendChild(btnEliminar);

        // Se agrega a la lista HTML
        lista.appendChild(li);
    });

    // Se actualiza el total
    totalHTML.textContent = total;
}


/* =========================================================
   ELIMINAR PRODUCTO DEL CARRITO
   ========================================================= */

function eliminarProducto(index) {

    // Se descuenta el valor del total
    total -= carrito[index].precio;

    // Se elimina el producto del array
    carrito.splice(index, 1);

    // Se actualiza la interfaz
    actualizarCarrito();
}


/* =========================================================
   ENVIAR PEDIDO POR WHATSAPP
   ========================================================= */

function enviarWhatsApp() {

    // Validar carrito vacío
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    // Pedir nombre del cliente
    let nombreCliente = prompt("Ingresa tu nombre:");

    // Validar nombre
    if (!nombreCliente) {
        alert("Debes ingresar tu nombre");
        return;
    }

    // Construcción del mensaje
    let mensaje = `Hola, soy ${nombreCliente}. Estoy interesado en comprar:\n\n`;

    carrito.forEach(item => {
        mensaje += `- ${item.nombre} ($${item.precio})\n`;
    });

    mensaje += `\nTotal: $${total}`;

    // Número de WhatsApp (formato internacional)
    let telefono = "573243934290";

    // URL de WhatsApp
    let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp
    window.open(url, "_blank");
}