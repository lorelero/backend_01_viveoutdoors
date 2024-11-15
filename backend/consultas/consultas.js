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

module.exports = { leerPublicaciones };



//función para obtener las publicaciones y su detalle de productos
// const leerPublicaciones = async() =>{

//   const {rows} = await pool.query("SELECT ");
//   console.log("publicaciones: ", rows)
//   return rows
// }


//-------------------------------------------------------------------------------------------
// async function obtenerCategorias() {
//     try {
//       const result = await pool.query("SELECT id_categoria, nombre FROM categorias");
//       return result.rows;
//     } catch (error) {
//       throw error;
//     }
//   }