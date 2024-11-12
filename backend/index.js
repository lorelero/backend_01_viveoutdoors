// ¡Hola! Importamos las dependencias necesarias para nuestra aplicación
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config(); // Cargamos las variables de entorno desde el archivo .env

// Creamos una instancia de Express
const app = express();

// Configuramos el puerto en el que escuchará nuestra aplicación
const PORT = process.env.PORT || 3000;

// Usamos middleware para mejorar nuestra aplicación
app.use(cors()); // Permite que nuestra API sea accesible desde diferentes orígenes
app.use(morgan('dev')); // Registra las solicitudes en la consola para facilitar el desarrollo
app.use(express.json()); // Permite que nuestra aplicación entienda el formato JSON en las solicitudes

// Definimos nuestras rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo! Bienvenido a nuestra aplicación.'); // Respuesta amigable en la ruta raíz
});

// Añadimos una ruta adicional para mostrar un saludo
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: '¡Bienvenido a la API! Esperamos que disfrutes tu experiencia.' });
});

// Manejo de errores: si no encontramos la ruta, enviamos un mensaje amable
app.use((req, res, next) => {
    res.status(404).json({ error: 'Lo sentimos, recurso no encontrado. ¡Intenta otra vez!' });
});

// Iniciamos el servidor y mostramos un mensaje para confirmar que está funcionando
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}. ¡Gracias por usar nuestra aplicación!`);
});
