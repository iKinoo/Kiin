import pool from '@/lib/db';
import { serialize } from 'cookie';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { correo, password } = await request.json();

        // 1. Buscar al usuario en la BD
        // Seleccionamos TODOS los campos para tener la info de perfil y carrera
        const [rows]: any = await pool.query(
            'SELECT * FROM USUARIOS WHERE Correo = ?',
            [correo]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 401 });
        }

        const usuario = rows[0];

        // 2. Verificar la contraseña
        // NOTA: Para este prototipo usamos comparación directa (texto plano).
        // En producción, usa: const match = await bcrypt.compare(password, usuario.Password);
        const passwordCorrecto = password === usuario.Password;

        if (!passwordCorrecto) {
            return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
        }

        // 3. Crear el Token de Sesión (JWT)
        // Este token se guarda en la cookie httpOnly (seguridad)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret_key_temporal');
        const token = await new SignJWT({
            id: usuario.ClvUsuario,
            email: usuario.Correo,
            rol: usuario.Rol,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        // 4. Serializar la Cookie
        const serialized = serialize('kiin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        // 5. Preparar la respuesta con los datos del usuario
        // Estos datos NO son sensibles (como el password) y van al LocalStorage
        const userData = {
            id: usuario.ClvUsuario,
            nombre: usuario.NomUsuario,
            correo: usuario.Correo,
            rol: usuario.Rol,
            // NUEVOS CAMPOS AGREGADOS:
            carrera: usuario.ClvCarrera, // Ej: 'LIS'
            foto: usuario.FotoPerfil     // Ej: '/uploads/foto_123.jpg'
        };

        const response = NextResponse.json({
            message: 'Login exitoso',
            user: userData
        });

        // Adjuntar la cookie a la respuesta
        response.headers.set('Set-Cookie', serialized);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}