// user-repository.js
import { pool } from './consultas.js';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

export class UserRepository {
    static async create({ username, password }) {
        // Verificar si el usuario ya existe
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            throw new Error('Username already exists');
        }

        // Generar un ID único para el nuevo usuario
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10); // Puedes ajustar el número de saltos

        // Insertar el nuevo usuario en la base de datos
        await pool.query('INSERT INTO users (id, username, password) VALUES ($1, $2, $3)', [id, username, hashedPassword]);

        return id;
    }

    static async login({ username, password }) {
        // Buscar el usuario por nombre de usuario
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Username does not exist');
        }

        // Verificar la contraseña
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Password is invalid');
        }

        // Retornar el usuario sin la contraseña
        const { password: _, ...publicUser } = user;
        return publicUser;
    }
}
