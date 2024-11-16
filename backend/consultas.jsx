const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "viveoutdoors",
});


/* traer productos */
const getProductos = async () => {
  const { rows: productos } = await pool.query("SELECT * FROM productos");
  return productos;
};

/* traer producto por categorías */


  module.exports{getProductos}