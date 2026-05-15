/* =========================================================
   BASE DE DATOS: ESCUELA SANTOS
   ========================================================= */

CREATE DATABASE IF NOT EXISTS escuela_santos;
USE escuela_santos;


/* =========================
   TABLA USUARIOS
   ========================= */
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* =========================
   TABLA JUGADORES (MEJORADA)
   ========================= */
CREATE TABLE IF NOT EXISTS jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,

    talla_camiseta VARCHAR(10),
    talla_pantaloneta VARCHAR(10),
    talla_medias VARCHAR(10),

    usuario_id INT,

    /* NUEVOS CAMPOS PARA FRONTEND */
    posicion VARCHAR(50),
    categoria VARCHAR(20),
    foto VARCHAR(255),
    velocidad INT DEFAULT 50,
    tiro INT DEFAULT 50,
    pase INT DEFAULT 50,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


/* =========================
   DATOS DE PRUEBA
   ========================= */
INSERT INTO jugadores 
(nombre, edad, posicion, categoria, foto, velocidad, tiro, pase)
VALUES
('Juan Pérez', 10, 'Delantero', 'sub10', 'img/jugador1.png', 80, 70, 65),
('Carlos López', 12, 'Defensa', 'sub12', 'img/jugador2.png', 60, 50, 75);