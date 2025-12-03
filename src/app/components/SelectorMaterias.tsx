'use client';

import type { GrupoOferta } from '@/types/db';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
    // CAMBIO AQUÍ: Definimos explícitamente el nombre del prop
    onAgregar: (grupo: GrupoOferta) => void;
}

// CAMBIO AQUÍ: Desestructuramos 'onAgregar'
export default function SelectorMaterias({ onAgregar }: Props) {
    const [oferta, setOferta] = useState<GrupoOferta[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/api/oferta')
            .then((res) => {
                if (!res.ok) throw new Error('Error en la red');
                return res.json();
            })
            .then((data) => {
                setOferta(data);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                Swal.fire('Error', 'No se pudo cargar la oferta académica.', 'error');
                setCargando(false);
            });
    }, []);

    const resultados = busqueda.length < 2
        ? []
        : oferta.filter(g =>
            g.materia.toLowerCase().includes(busqueda.toLowerCase()) ||
            g.profesor.toLowerCase().includes(busqueda.toLowerCase())
        );

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h3 className="font-bold text-gray-700 mb-2">Buscar Asignatura</h3>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Escribe el nombre de la materia o profesor..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <span className="absolute right-3 top-3 text-gray-400">🔍</span>
            </div>

            {cargando && <p className="text-sm text-gray-500 mt-2">Cargando catálogo...</p>}

            {!cargando && busqueda.length >= 2 && resultados.length === 0 && (
                <p className="text-sm text-red-500 mt-2">No se encontraron resultados.</p>
            )}

            <div className="mt-2 max-h-60 overflow-y-auto space-y-2">
                {resultados.map((grupo) => (
                    <div key={grupo.id} className="border border-gray-200 p-3 rounded hover:bg-blue-50 transition flex justify-between items-center group">
                        <div className="text-sm">
                            <p className="font-bold text-gray-800">{grupo.materia}</p>
                            <p className="text-gray-600">{grupo.profesor}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {grupo.horarios.map(h => `${h.dia} ${h.inicio.substring(0, 5)}-${h.fin.substring(0, 5)}`).join(' | ')}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                // CORRECCIÓN AQUÍ: Usamos el nombre correcto 'onAgregar'
                                onAgregar(grupo);
                                setBusqueda('');
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Agregar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}