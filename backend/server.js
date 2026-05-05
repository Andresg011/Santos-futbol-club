/* =========================================================
   SERVER.JS - ESCUELA DE FÚTBOL SANTOS
   Backend con Node.js + Express
   Maneja productos y pedidos del carrito
   ========================================================= */


/* =========================
   IMPORTACIONES
   ========================= */

const express = require("express");
const cors = require("cors");
require("dotenv").config();


/* =========================
   CONFIGURACIÓN DEL SERVIDOR
   ========================= */

const app = express();
const PORT = 3000;


/* =========================
   MIDDLEWARES
   ========================= */

// Permite comunicación entre frontend y backend
app.use(cors());

// Permite leer JSON desde el frontend
app.use(express.json());


/* =========================
   BASE DE DATOS SIMULADA (PRODUCTOS)
   ========================= */

/*
   Por ahora usamos datos en memoria.
   Más adelante lo conectamos a MySQL.
*/
let productos = [
    { id: 1, nombre: "Uniforme Escuela Santos", precio: 50000 },
    { id: 2, nombre: "Medias Deportivas", precio: 10000 },
    { id: 3, nombre: "Balón de Entrenamiento", precio: 30000 }
];


/* =========================
   RUTA: OBTENER PRODUCTOS
   ========================= */

/*
   Envía la lista de productos al frontend
*/
app.get("/productos", (req, res) => {
    res.json(productos);
});


/* =========================
   RUTA: RECIBIR PEDIDOS
   ========================= */

/*
   Recibe el carrito desde el frontend
*/
app.post("/pedidos", (req, res) => {
    const pedido = req.body;

    console.log("Pedido recibido del frontend:");
    console.log(pedido);

    // Aquí luego se guarda en MySQL

    res.json({
        mensaje: "Pedido recibido correctamente",
        pedido: pedido
    });
});


/* =========================
   SERVIDOR ACTIVO
   ========================= */

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});