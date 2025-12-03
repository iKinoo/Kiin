import pool from '@/lib/db';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { correo, password } = await request.json();

        // 1. Buscar al usuario en la BD
        // Nota: Usamos 'rows: any' para evitar líos con tipos de TypeScript por ahora
        const [rows]: any = await pool.query('SELECT * FROM USUARIOS WHERE Correo = ?', [correo]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 401 });
        }

        const usuario = rows[0];

        // 2. Verificar la contraseña
        // IMPORTANTE: Como insertaste "12345" directo en SQL sin encriptar, 
        // la primera vez fallará si usamos bcrypt.compare. 
        // Para esta prueba inicial haremos comparación directa. 
        // CUANDO REGISTRES USUARIOS REALES, usa bcrypt.

        // Cambia esta línea cuando ya tengas registro con hash:
        // const passwordCorrecto = await bcrypt.compare(password, usuario.Password);

        const passwordCorrecto = password === usuario.Password; // Comparación simple para tu usuario de prueba

        if (!passwordCorrecto) {
            return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
        }

        // 3. Crear el Token de Sesión (JWT)
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expira en 24 horas
                clvUsuario: usuario.ClvUsuario,
                nombre: usuario.NomUsuario,
                rol: usuario.Rol,
            },
            'SECRET_KEY_SECRETA_CAMBIAME', // En producción, esto va en .env
        );

        // 4. Crear la Cookie de Sesión
        const serialized = serialize('kiin_session', token, {
            httpOnly: true, // Seguridad: JS no puede leerla (protección XSS)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        const response = NextResponse.json({
            message: 'Login exitoso',
            user: { nombre: usuario.NomUsuario, rol: usuario.Rol, id: usuario.ClvUsuario }
        });

        // Adjuntar la cookie a la respuesta
        response.headers.set('Set-Cookie', serialized);

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}