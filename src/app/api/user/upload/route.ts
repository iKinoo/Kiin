import pool from '@/lib/db';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const idUsuario = data.get('idUsuario');

        if (!file || !idUsuario) {
            return NextResponse.json({ message: 'Falta archivo o usuario' }, { status: 400 });
        }

        // 1. Validar que sea imagen
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ message: 'El archivo debe ser una imagen' }, { status: 400 });
        }

        // 2. Convertir a Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 3. Generar nombre único (id_timestamp.ext)
        const ext = path.extname(file.name);
        const fileName = `user_${idUsuario}_${Date.now()}${ext}`;

        // 4. Guardar en carpeta pública (public/uploads)
        // Asegúrate de crear la carpeta 'uploads' dentro de 'public'
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // 5. Actualizar Base de Datos
        // Guardamos la ruta relativa para accederla desde el navegador
        const publicPath = `/uploads/${fileName}`;

        await pool.query('UPDATE USUARIOS SET FotoPerfil = ? WHERE ClvUsuario = ?', [publicPath, idUsuario]);

        return NextResponse.json({
            message: 'Foto actualizada',
            path: publicPath
        });

    } catch (error) {
        console.error('Error subiendo foto:', error);
        return NextResponse.json({ message: 'Error interno' }, { status: 500 });
    }
}