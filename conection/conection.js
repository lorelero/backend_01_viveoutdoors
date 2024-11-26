//configura y exporta un pool de conexiones a una base de datos PostgreSQL, 
//utilizando variables de entorno para la configuración y biblioteca pg

/* const { Pool } = require('pg'); //importa la clase Pool de la biblioteca pg
require ('dotenv').config();

//const { HOST, DATABASE, USER, PASSWORD, PORT } = process.env;  //extrae las variables de entorno necesarias para la conexión a la base de datos del archivo .env

const pool = new Pool({   //configuración de la conexión, se crea una instancia de Pool con la configuración necesaria para conectarse a la base de datos PostgreSQL.
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    allowExitOnIdle: true,  // permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});



module.exports = { pool }; */

const { Pool } = require('pg');

// Usa la URL de conexión a la base de datos de Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Asegúrate de que esta variable esté en tu archivo .env
  ssl: {
    rejectUnauthorized: false // Esto es necesario para conexiones a Render
  }
});

module.exports = pool;
