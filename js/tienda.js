/* =========================================================
   CARRITO DE COMPRAS - ESCUELA SANTOS
   Archivo: tienda.js
   Maneja productos, imágenes, cantidades, total y WhatsApp
   ========================================================= */


/* =========================
   VARIABLES GLOBALES
   ========================= */

// Arreglo donde se almacenan los productos del carrito
let carrito = [];

// Variable que almacena el total de la compra
let total = 0;


/* =========================================================
   AGREGAR PRODUCTO AL CARRITO
   ========================================================= */

function agregarAlCarrito(nombre, precio, imagen) {

    // Solicita la cantidad del producto
    let cantidad = parseInt(prompt("Ingresa la cantidad de este producto:"));

    // Valida que la cantidad sea un número válido
    if (!cantidad || cantidad <= 0) {
        alert("Cantidad no válida");
        return;
    }

    // Agrega el producto al carrito incluyendo la imagen
    carrito.push({
        nombreProducto: nombre,
        precio: precio,
        cantidad: cantidad,
        imagen: imagen
    });

    // Calcula el total general
    total += precio * cantidad;

    // Actualiza la interfaz del carrito
    actualizarCarrito();
}


/* =========================================================
   ACTUALIZAR CARRITO EN PANTALLA
   ========================================================= */

function actualizarCarrito() {

    // Obtiene la lista del carrito en el HTML
    const lista = document.getElementById("lista-carrito");

    // Obtiene el elemento donde se muestra el total
    const totalHTML = document.getElementById("total");

    // Limpia la lista antes de renderizar nuevamente
    lista.innerHTML = "";

    // Recorre los productos del carrito
    carrito.forEach((item, index) => {

        // Crea el contenedor del producto
        const li = document.createElement("li");

        /* =========================
           IMAGEN DEL PRODUCTO
           ========================= */

        const img = document.createElement("img");
        img.src = item.imagen;
        img.width = 50;
        img.height = 50;
        img.style.marginRight = "10px";

        /* =========================
           TEXTO DEL PRODUCTO
           ========================= */

        const texto = document.createElement("span");
        texto.textContent =
            `${item.nombreProducto} x${item.cantidad} - $${item.precio * item.cantidad}`;

        /* =========================
           BOTÓN ELIMINAR
           ========================= */

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";

        btnEliminar.onclick = function () {
            eliminarProducto(index);
        };

        /* =========================
           ESTRUCTURA DEL ITEM
           ========================= */

        li.appendChild(img);
        li.appendChild(texto);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    });

    // Actualiza el total en pantalla
    totalHTML.textContent = total;
}


/* =========================================================
   ELIMINAR PRODUCTO DEL CARRITO
   ========================================================= */

function eliminarProducto(index) {

    // Resta el valor del producto eliminado
    total -= carrito[index].precio * carrito[index].cantidad;

    // Elimina el producto del arreglo
    carrito.splice(index, 1);

    // Actualiza la vista del carrito
    actualizarCarrito();
}


/* =========================================================
   ENVIAR COMPRA POR WHATSAPP
   ========================================================= */

function enviarWhatsApp() {

    // Valida si el carrito está vacío
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    /* =========================
       DATOS DEL USUARIO
       ========================= */

    // Solicita nombre del acudiente
    let nombreAcudiente = prompt("Ingresa tu nombre (acudiente):");
    if (!nombreAcudiente) return;

    // Solicita nombre del niño
    let nombreNino = prompt("Ingresa el nombre del niño:");
    if (!nombreNino) return;


    /* =========================
       MENSAJE DE WHATSAPP
       ========================= */

    let mensaje = `Hola, soy ${nombreAcudiente} acudiente de ${nombreNino}.\n\n`;
    mensaje += `Estoy interesado en comprar:\n\n`;

    // Recorre los productos del carrito
    carrito.forEach(item => {

        mensaje += `Producto: ${item.nombreProducto}\n`;
        mensaje += `Cantidad: ${item.cantidad}\n`;
        mensaje += `Subtotal: $${item.precio * item.cantidad}\n\n`;
    });

    // Agrega total final
    mensaje += `Total: $${total}`;


    /* =========================
       ENVÍO A WHATSAPP
       ========================= */

    let telefono = "573243934290";

    let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}