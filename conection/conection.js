// config localhost
/* const { Pool } = require('pg'); //importa la clase Pool de la biblioteca pg

const { HOST, DATABASE, USER, PASSWORD, PORT } = process.env;  //extrae las variables de entorno necesarias para la conexión a la base de datos del archivo .env

const pool = new Pool({   //configuración de la conexión, se crea una instancia de Pool con la configuración necesaria para conectarse a la base de datos PostgreSQL.
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
    port: PORT,
    allowExitOnIdle: true,  // permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});


module.exports = { pool };
 */

//external url render
require('dotenv').config(); 

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Esto es necesario para conexiones a Render
  },
  allowExitOnIdle: true, // Permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});

module.exports = pool;
