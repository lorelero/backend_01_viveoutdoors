
const UserRepository = require('./user-repository.js');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { SECRET_JWT_KEY } = require('../config.js');
const { pool } = require("../conection/conection");


// Función para registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = await UserRepository.create({ username, password });
        return res.status(201).json({ id });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await UserRepository.login({ username, password });
        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_JWT_KEY,
            { expiresIn: '1h' }
        );

        res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'PRODUCTION',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 // 1 hora
            })
            .json({ user, token });
    } catch (error) {
        console.error(error);
        return res.status(401).send(error.message);
    }
};

// Función para cerrar sesión
const cerrarSesion = (req, res) => {
    return res
        .clearCookie('access_token')
        .json({ message: 'Logout successful' });
};

// Función para acceder a una ruta
