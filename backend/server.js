/* =========================================================
   SERVIDOR PRINCIPAL - ESCUELA SANTOS
   Este archivo enciende el backend con Node.js + Express
   ========================================================= */

/*
   1. Importamos las librerías necesarias
*/
const express = require("express"); // Framework para crear el servidor
const cors = require("cors");       // Permite comunicación con el frontend
require("dotenv").config();         // Carga variables del archivo .env

/*
   2. Creamos la aplicación de Express
*/
const app = express();

/*
   3. Middlewares (configuraciones del servidor)
*/

// Permite recibir datos en formato JSON desde el frontend
app.use(express.json());

// Permite conexión desde cualquier frontend (HTML, JS, etc.)
app.use(cors());

/*
   4. Conexión a base de datos
   (traemos el archivo db.js que creaste en config/)
*/
const db = require("./config/db");

/*
   5. RUTA DE PRUEBA
   Sirve para verificar que el servidor está funcionando
*/
app.get("/", (req, res) => {
  res.send("🚀 Backend Escuela Santos funcionando correctamente");
});

/*
   6. RUTA DE PRUEBA: CONSULTAR USUARIOS
   Esto prueba la conexión con MySQL
*/
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error en la consulta:", err);
      return res.status(500).send("Error en la base de datos");
    }

    res.json(result);
  });
});

/*
   7. CONFIGURACIÓN DEL PUERTO
*/
const PORT = process.env.PORT || 3000;

/*
   8. ENCENDER EL SERVIDOR
*/
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});