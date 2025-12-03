'use client';
import { useEffect, useState } from 'react';

interface Props {
    seleccionadas: string[]; // IDs de asignaturas
    onToggle: (id: string, nombre: string) => void;
}

export default function SelectorAsignaturas({ seleccionadas, onToggle }: Props) {
    const [catalogo, setCatalogo] = useState<{ ClvAsignatura: string, NomAsignatura: string }[]>([]);

    useEffect(() => {
        // Necesitas crear un endpoint simple que devuelva solo SELECT DISTINCT Asignaturas...
        // Por ahora asumimos que /api/oferta devuelve todo y filtramos aquí (quick fix)
        fetch('/api/oferta')
            .then(res => res.json())
            .then(data => {
                // Extraer asignaturas únicas del JSON de grupos
                const unicas = new Map();
                data.forEach((g: any) => {
                    // Asumiendo que tu API /oferta devuelve el nombre y clave
                    // Ajusta según los campos reales de tu respuesta anterior
                    // Podrías necesitar un endpoint nuevo: /api/asignaturas/list
                });
                // Para avanzar rápido, te recomiendo crear /api/asignaturas/list
                // que haga: SELECT * FROM ASIGNATURAS
            });
    }, []);

    // ... (Renderizado de checkbox list)
}