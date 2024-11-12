const { Pool } = require('pg');

const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'tu_base_de_datos',
    password: 'tu_contraseña',
    port: 5432,
});

// Ejemplo de consulta
pool.query('SELECT * FROM nombre de tabla', (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
});
