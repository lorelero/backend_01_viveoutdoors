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

// Importamos las dependencias necesarias para nuestra aplicación

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const jwt = require("jsonwebtoken");

require('dotenv').config(); // Cargamos las variables de entorno desde el archivo .env


// Configuramos el puerto en el que escuchará nuestra aplicación
const PORT = process.env.PORT_SERVER || 3000;

// Creamos una instancia de Express
const app = express(); 

// const { PORT, SECRET_JWT_KEY } = process.env; 

//importamos funciones necesarias para las rutas
const { leerPublicaciones, insertarProducto, insertarPublicacion, insertarImagenProducto} = require('./consultas/consultas.js');
const { registrarUsuario, iniciarSesion,  cerrarSesion, accesoProtegido} = require('./consultas/consultasUsuarios.js');
const { body, validationResult } = require('express-validator');



// Middleware
app.use(cors()); // Permite que nuestra API sea accesible desde diferentes orígenes
app.use(morgan('dev')); // Registra las solicitudes en la consola para facilitar el desarrollo
app.use(helmet());
app.use(express.json());// Permite que nuestra aplicación entienda el formato JSON en las solicitudes
app.use(cookieParser());
app.use(session({
    secret: SECRET_JWT_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Definimos nuestras rutas

// RUTA POST PARA REGISTRO DE NUEVOS USUARIOS
app.post('/register', 
    body('username').isString().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        registrarUsuario(req, res, next);
    }
);

//RUTA LOGIN PARA INGRESO DE USUARIOS YA REGISTRADOS
app.post('/login', 
    body('username').isString().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        iniciarSesion(req, res, next);
    }
);

app.post('/logout', cerrarSesion);
app.get('/protected', accesoProtegido);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



// Ruta para obtener publicaciones Y que se enlisten
app.get("/publicaciones", async (req, res) => {
    try {
        const obtenerPublicaciones = await leerPublicaciones();
        res.json({ obtenerPublicaciones });
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).json({ error: 'Error al obtener publicaciones' });
    }
});

// Ruta para crear una nueva publicación: la cual inserta un nuevo producto e imagen

app.post('/crearpublicacion', async (req, res) => {
    const { nombre, descripcion, stock, precio, url, texto_alternativo, id_usuario, estado } = req.body;

    try {
        // Insertar el producto y obtener su ID
        const nuevoProducto = await insertarProducto(nombre, descripcion, stock, precio);

        // Insertar la imagen del producto con el ID del nuevo producto
        const nuevaImagen = await insertarImagenProducto(nuevoProducto.id_producto, url, texto_alternativo);

        // Insertar la publicación con el ID del nuevo producto
        const nuevaPublicacion = await insertarPublicacion(nuevoProducto.id_producto, id_usuario, estado);

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

// Manejo de errores 404 
app.use((req, res, next) => { 
    res.status(404).json({ error: 'Lo sentimos, recurso no encontrado. ¡Intenta otra vez!' });
});

// Añadimos una ruta adicional para mostrar un saludo
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: '¡Bienvenido a la API! Esperamos que disfrutes tu experiencia.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
