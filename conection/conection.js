const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false // Esto es necesario para conexiones a Render
  },
  allowExitOnIdle: true, // Permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});

module.exports = pool;
