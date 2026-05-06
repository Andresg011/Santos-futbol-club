
/* =========================================================
   SERVER.JS - ESCUELA DE FÚTBOL SANTOS
   Backend con Node.js + Express + MySQL
   Maneja productos, pedidos y jugadores desde base de datos
   ========================================================= */


/* =========================
   IMPORTACIONES
   ========================= */

// Framework para crear el servidor
const express = require("express");

// Permite comunicación entre frontend y backend (evita errores CORS)
const cors = require("cors");

// Librería para conectar Node con MySQL
const mysql = require("mysql2");

// Permite usar variables de entorno (opcional)
require("dotenv").config();


/* =========================
   CONFIGURACIÓN DEL SERVIDOR
   ========================= */

// Inicializa la aplicación
const app = express();

// Puerto donde corre el servidor
const PORT = 3000;

/* =========================
   CONEXIÓN A MYSQL
   ========================= */

const db = mysql.createConnection({
    host: "127.0.0.1", // IMPORTANTE: evita problemas con XAMPP
    user: "root",      // Usuario por defecto
    password: "",      // Tú ya confirmaste que no tienes contraseña
    database: "escuela_santos"
});

// Verifica si la conexión funciona
db.connect((err) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }

    console.log("Conectado a MySQL correctamente");
});


/* =========================
   MIDDLEWARES
   ========================= */

// Permite que el frontend (HTML/JS) se conecte al backend
app.use(cors());

// Permite recibir datos en formato JSON
app.use(express.json());


/* =========================
   CONEXIÓN A MYSQL
   ========================= */

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",      // Servidor local (XAMPP)
    user: "root",           // Usuario por defecto
    password: "",           // Dejar vacío si no tienes contraseña
    database: "escuela_santos" // Nombre de tu base de datos
});

// Verifica si la conexión fue exitosa
db.connect((err) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }

    console.log("Conectado a MySQL correctamente");
});


/* =========================================================
   DATOS TEMPORALES (PRODUCTOS)
   ========================================================= */

/*
   Estos productos aún están en memoria.
   Más adelante también los puedes pasar a MySQL.
*/
let productos = [
    { id: 1, nombre: "Uniforme Escuela Santos", precio: 50000 },
    { id: 2, nombre: "Medias Deportivas", precio: 10000 },
    { id: 3, nombre: "Balón de Entrenamiento", precio: 30000 }
];


/* =========================================================
   RUTA: OBTENER PRODUCTOS
   ========================================================= */

/*
   Envía la lista de productos al frontend
*/
app.get("/productos", (req, res) => {
    res.json(productos);
});


/* =========================================================
   RUTA: RECIBIR PEDIDOS
   ========================================================= */

/*
   Recibe el carrito desde el frontend
*/
app.post("/pedidos", (req, res) => {

    // Datos enviados desde el frontend
    const pedido = req.body;

    console.log("Pedido recibido:");
    console.log(pedido);

    // Aquí luego puedes guardar en MySQL

    res.json({
        mensaje: "Pedido recibido correctamente",
        pedido: pedido
    });
});


/* =========================================================
   RUTA: OBTENER JUGADORES DESDE MYSQL
   ========================================================= */

/*
   Esta ruta consulta la base de datos y devuelve los jugadores.
   Permite filtrar por categoría (sub10, sub12, etc).
*/
app.get("/jugadores", (req, res) => {

    // Obtener categoría desde la URL
    const categoria = req.query.categoria;

    // Consulta base
    let query = "SELECT * FROM jugadores";

    // Si el usuario selecciona una categoría específica
    if (categoria && categoria !== "todos") {

        query += " WHERE categoria = ?";

        // Consulta con filtro
        db.query(query, [categoria], (err, result) => {

            if (err) {
                console.error("Error en consulta:", err);
                return res.status(500).json(err);
            }

            res.json(result);
        });

    } else {

        // Consulta sin filtro (todos los jugadores)
        db.query(query, (err, result) => {

            if (err) {
                console.error("Error en consulta:", err);
                return res.status(500).json(err);
            }

            res.json(result);
        });
    }
});


/* =========================================================
   INICIO DEL SERVIDOR
   ========================================================= */

/*
   Levanta el servidor en el puerto definido
*/
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

