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


//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UN NUEVO PRODUCTO 

const insertarProducto = async (nombre, descripcion, stock, precio) => {
  const consulta = `INSERT INTO productos (id_producto, nombre, descripcion, stock, precio) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;`;
  const values = [nombre, descripcion, stock, precio];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el producto insertado
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA NUEVA PUBLICACIÓN

const insertarPublicacion = async (id_producto, id_usuario, estado) => {
  const consulta = `INSERT INTO publicaciones (id_publicacion, id_producto, id_usuario, estado, fecha_creacion, fecha_actualizacion) VALUES (DEFAULT, $1, $2, DEFAULT, DEFAULT) RETURNING *;`;
  const values = [id_producto, id_usuario, estado];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación insertada
};


//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA NUEVA IMAGEN DE PRODUCTO

const insertarImagenProducto = async (id_producto, url, texto_alternativo) => {
  const consulta = `INSERT INTO imagenes_productos (id_imagen, id_producto, url, texto_alternativo) VALUES (DEFAULT, $1, $2, $3) RETURNING *;`;
  const values = [id_producto, url, texto_alternativo];
  const result = await pool.query(consulta, values);
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