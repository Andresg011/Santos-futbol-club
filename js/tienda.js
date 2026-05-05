function calcularTotal() {

    let camiseta = parseInt(document.getElementById("camiseta").value);
    let pantaloneta = parseInt(document.getElementById("pantaloneta").value);
    let medias = parseInt(document.getElementById("medias").value);

    let total = camiseta + pantaloneta + medias;

    document.getElementById("total").innerText = "Total: $" + total;
}

function enviarWhatsApp() {

    let nombre = document.getElementById("nombre").value;
    let jugador = document.getElementById("jugador").value;

    let camiseta = document.getElementById("camiseta").value;
    let pantaloneta = document.getElementById("pantaloneta").value;
    let medias = document.getElementById("medias").value;

    let total = camiseta + pantaloneta + medias;

    let mensaje = "Hola, soy " + nombre +
        ", acudiente de " + jugador +
        ". Quiero pedir el uniforme completo. Total: $" + total;

    let url = "https://wa.me/573243934290?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank");
}