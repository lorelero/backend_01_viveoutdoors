// npm init --yes
// npm i express
// npm i express-fileupload
// npm i pg
// npm i jsonwebtoken
// npm i nodemon -D
// npm i morgan
// npm i dotenv
// crear .env
// crear .gitignore
// abrir psql y crear database y table

// Importaciones
//const expressFileUpload = require("express-fileupload");
//const secretKey = "blog";
// const dotenv = require("dotenv");
//dotenv.config();

// Importamos las dependencias necesarias para nuestra aplicación
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { leerPublicaciones } = require('./consultas/consultas.js');
require('dotenv').config(); // Cargamos las variables de entorno desde el archivo .env

// Creamos una instancia de Express
const app = express();

// Configuramos el puerto en el que escuchará nuestra aplicación
const PORT = process.env.PORT_SERVER || 3000;

// Usamos middleware para mejorar nuestra aplicación
app.use(cors()); // Permite que nuestra API sea accesible desde diferentes orígenes
app.use(morgan('dev')); // Registra las solicitudes en la consola para facilitar el desarrollo
app.use(express.json()); // Permite que nuestra aplicación entienda el formato JSON en las solicitudes

// Definimos nuestras rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo! Bienvenido a nuestra aplicación.'); // Respuesta amigable en la ruta raíz
});

app.get("/publicaciones", async (req, res) => {
    const obtenerPublicaciones = await leerPublicaciones();
    res.json({obtenerPublicaciones});
});


// Ruta para crear un nuevo producto, imagen y publicación
app.post('/crearpublicacion', async (req, res) => {
    const { nombre, descripcion, stock, precio, url_imagen, fecha_creacion, fecha_actualizacion, estado } = req.body;
  
    try {
      // Insertar el producto
      const nuevoProducto = await insertarProducto(nombre, descripcion, stock, precio);
  
      // Insertar la imagen del producto con el ID del nuevo producto
      const nuevaImagen = await insertarImagenProducto(nuevoProducto.id_producto, url_imagen);
  
      // Insertar la publicación con el ID del nuevo producto
      const nuevaPublicacion = await insertarPublicacion(nuevoProducto.id_producto, fecha_creacion, fecha_actualizacion, estado);
  
      res.status(201).json({
        mensaje: 'Publicación creada exitosamente',
        producto: nuevoProducto,
        imagen: nuevaImagen,
        publicacion: nuevaPublicacion
      });
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      res.status(500).json({ error: 'Error al crear la publicación' });
    }
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

