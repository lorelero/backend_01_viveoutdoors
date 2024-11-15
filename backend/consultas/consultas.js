// // IMPORTANDO EL MANEJADOR DE ERRORES
// const errors = require("../handleErrors/handleErrors.js");

// importando paquetes instalados necesarios
require("dotenv").config();

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require("../conection/conection")

//variables globales de index.js
let status = "";
let message = "";

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER LAS PUBLICACIONES DE LA BBDD Y SUS CAMPOS RELACIONADOS CON TABLA PRODUCTO E IMAGENES

const leerPublicaciones = async () => {
  const consulta = `SELECT DISTINCT ON (p.id_producto) pub.id_publicacion, pub.fecha_creacion, pub.fecha_actualizacion, pub.estado, p.id_producto, p.nombre AS producto_nombre, p.descripcion AS producto_descripcion, p.stock, p.precio, img.url AS producto_imagen FROM publicaciones pub JOIN productos p ON pub.id_producto = p.id_producto LEFT JOIN imagenes_productos img ON p.id_producto = img.id_producto ORDER BY p.id_producto, img.id_imagen;`;
  try {
    const { rows } = await pool.query(consulta);
    console.log("Publicaciones: ", rows);
    return rows;
  } catch (error) {
    console.error("Error al leer publicaciones:", error);
    throw new Error("No se pudieron obtener las publicaciones");
  }
};


// ------------------------------------
// Función para insertar un nuevo producto
const insertarProducto = async (nombre, descripcion, stock, precio) => {
  const consulta = `INSERT INTO productos (id_producto, nombre, descripcion, stock, precio) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;`;
  const values = [nombre, descripcion, stock, precio];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el producto insertado
};

// Función para insertar una nueva publicación
const insertarPublicacion = async (idProducto, fecha_creacion, fecha_actualizacion, estado) => {
  const consultaPublicacion = `
    INSERT INTO publicaciones (id_producto, fecha_creacion, fecha_actualizacion, estado)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [idProducto, fecha_creacion, fecha_actualizacion, estado];
  const result = await pool.query(consultaPublicacion, values);
  return result.rows[0]; // Retorna la publicación insertada
};

// Función para insertar una imagen de producto
const insertarImagenProducto = async (idProducto, url) => {
  const consultaImagen = `
    INSERT INTO imagenes_productos (id_producto, url)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [idProducto, url];
  const result = await pool.query(consultaImagen, values);
  return result.rows[0]; // Retorna la imagen insertada
};



module.exports = { leerPublicaciones, insertarProducto, insertarPublicacion, insertarImagenProducto };



//-------------------------------------------------------------------------------------------
// async function obtenerCategorias() {
//     try {
//       const result = await pool.query("SELECT id_categoria, nombre FROM categorias");
//       return result.rows;
//     } catch (error) {
//       throw error;
//     }
//   }