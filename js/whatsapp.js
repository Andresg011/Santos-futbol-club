/* =========================================================
   WHATSAPP - BOTÓN INDEX (VERSIÓN PRO)
   Escuela de Fútbol Santos
   ========================================================= */

window.enviarWhatsApp = function (origen) {

    /* =====================================================
       NÚMERO DE WHATSAPP
       ===================================================== */
    const telefono = "573243934290";

    /* =====================================================
       MENSAJE PARA INDEX
       ===================================================== */

    let mensaje = "";

    if (origen === "index") {

        /*
            Mensaje predefinido (sin pedir datos al usuario)
            Se ve profesional y guía la conversación
        */
        mensaje = 
            "Hola, estoy interesad@ en inscribir a mi hijo en la Escuela de Fútbol Santos. " +
            "Quisiera recibir información sobre horarios, costos y proceso de inscripción. Gracias.";

    } else {

        /*
            Mensaje general para otros botones o páginas
        */
        mensaje = "Hola, quiero información de la Escuela de Fútbol Santos. Gracias.";
    }

    /* =====================================================
       GENERAR LINK DE WHATSAPP
       ===================================================== */

    const url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);

    /* =====================================================
       ABRIR WHATSAPP
       ===================================================== */

    const ventana = window.open(url, "_blank");

    if (ventana) {
        ventana.focus();
    }
};