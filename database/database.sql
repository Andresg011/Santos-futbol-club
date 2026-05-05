/* =========================================================
   BASE DE DATOS: ESCUELA SANTOS
   Proyecto: Tienda + Inscripciones de escuela de fútbol
   Autor: Gustavo
   ========================================================= */


/* =========================================================
   1. CREACIÓN DE LA BASE DE DATOS
   ========================================================= */

/*
   Se crea la base de datos principal del proyecto.
   Aquí se almacenará toda la información del sistema.
*/
CREATE DATABASE escuela_santos;

/*
   Seleccionamos la base de datos para empezar a trabajar en ella.
*/
USE escuela_santos;



/* =========================================================
   2. TABLA: USUARIOS (PADRES O ACUDIENTES)
   ========================================================= */

/*
   Esta tabla guarda la información de los padres o responsables
   de los niños inscritos en la escuela.
*/
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único del usuario
    nombre VARCHAR(100) NOT NULL,       -- Nombre del padre o acudiente
    telefono VARCHAR(20),               -- Número de contacto
    email VARCHAR(100),                 -- Correo electrónico (opcional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Fecha en la que se registra el usuario automáticamente
);



/* =========================================================
   3. TABLA: JUGADORES (NIÑOS INSCRITOS)
   ========================================================= */

/*
   Aquí se guardan los datos de los niños que pertenecen a la escuela.
   Cada jugador está relacionado con un usuario (padre).
*/
CREATE TABLE jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Identificador del jugador
    nombre VARCHAR(100) NOT NULL,        -- Nombre del niño
    edad INT NOT NULL,                   -- Edad del jugador

    talla_camiseta VARCHAR(10),          -- Talla camiseta
    talla_pantaloneta VARCHAR(10),       -- Talla pantaloneta
    talla_medias VARCHAR(10),            -- Talla medias

    usuario_id INT,                      -- Relación con el padre/acudiente

    /*
       Relación entre tablas:
       Un usuario puede tener varios jugadores (1 a muchos)
    */
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);



/* =========================================================
   4. TABLA: PEDIDOS (INSCRIPCIONES O COMPRAS)
   ========================================================= */

/*
   Esta tabla guarda cada compra o inscripción realizada.
   Ejemplo: uniforme, mensualidad, inscripción, etc.
*/
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- ID del pedido

    usuario_id INT,                      -- Quién hizo el pedido

    total DECIMAL(10,2),                 -- Valor total de la compra

    estado VARCHAR(20) DEFAULT 'pendiente',
    /*
       Estado del pedido:
       pendiente, pagado, cancelado
    */

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    /*
       Relación con usuarios
    */
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);



/* =========================================================
   5. TABLA: DETALLE DEL PEDIDO
   ========================================================= */

/*
   Aquí se guarda cada producto dentro de un pedido.
   Es el contenido del carrito de compras.
*/
CREATE TABLE detalle_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID del detalle

    pedido_id INT,                     -- A qué pedido pertenece

    producto VARCHAR(100),             -- Nombre del producto
    cantidad INT,                      -- Cantidad comprada
    precio DECIMAL(10,2),              -- Precio unitario

    /*
       Relación con pedidos:
       Un pedido puede tener muchos productos
    */
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);