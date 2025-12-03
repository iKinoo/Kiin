'use client';

import type { GrupoOferta } from '@/types/db';

interface Props {
    materias: GrupoOferta[];
}

// Configuración del calendario
const HORA_INICIO = 7; // 7:00 AM
const HORA_FIN = 21;   // 9:00 PM
const ALTURA_HORA = 60; // Píxeles por hora (ajusta si quieres más zoom)

const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const COLORES = [
    'bg-blue-200 border-blue-400 text-blue-800',
    'bg-green-200 border-green-400 text-green-800',
    'bg-yellow-200 border-yellow-400 text-yellow-800',
    'bg-purple-200 border-purple-400 text-purple-800',
    'bg-red-200 border-red-400 text-red-800',
    'bg-indigo-200 border-indigo-400 text-indigo-800',
    'bg-pink-200 border-pink-400 text-pink-800',
];

export default function CalendarioVisual({ materias }: Props) {

    // Función auxiliar: Convierte "09:30:00" a número decimal 9.5
    const timeToDecimal = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours + minutes / 60;
    };

    return (
        <div className="flex flex-col h-full bg-white border rounded-lg shadow overflow-hidden print:shadow-none print:border-none">

            {/* 1. Encabezado de Días */}
            <div className="grid grid-cols-7 border-b bg-gray-50">
                <div className="p-2 border-r text-center text-xs font-bold text-gray-400">Hora</div>
                {DIAS.map((dia) => (
                    <div key={dia} className="p-2 border-r text-center font-bold text-gray-700 uppercase text-sm">
                        {dia}
                    </div>
                ))}
            </div>

            {/* 2. Cuerpo del Calendario (Scrollable) */}
            <div className="flex-1 overflow-y-auto relative" style={{ height: '600px' }}>
                <div className="relative min-w-[600px]">

                    {/* Rejilla de fondo (Líneas de horas) */}
                    {Array.from({ length: HORA_FIN - HORA_INICIO + 1 }).map((_, i) => {
                        const hora = HORA_INICIO + i;
                        return (
                            <div
                                key={hora}
                                className="grid grid-cols-7 border-b border-gray-100 text-xs text-gray-400"
                                style={{ height: `${ALTURA_HORA}px` }}
                            >
                                <div className="border-r px-2 py-1 text-right -mt-2 bg-white sticky left-0">
                                    {hora}:00
                                </div>
                                {/* Columnas vacías para la cuadrícula */}
                                {DIAS.map((d) => <div key={d} className="border-r border-gray-50" />)}
                            </div>
                        );
                    })}

                    {/* 3. Renderizado de Bloques de Materias */}
                    {materias.map((materia, index) => {
                        // Asignar un color consistente basado en el índice
                        const colorClase = COLORES[index % COLORES.length];

                        return materia.horarios.map((horario, hIndex) => {
                            // Validar que el día exista en nuestro array
                            const colIndex = DIAS.indexOf(horario.dia);
                            if (colIndex === -1) return null;

                            // Calcular posición y altura
                            const start = timeToDecimal(horario.inicio);
                            const end = timeToDecimal(horario.fin);
                            const duration = end - start;

                            // Top: (HoraInicio - 7) * 60px
                            const topPx = (start - HORA_INICIO) * ALTURA_HORA;
                            const heightPx = duration * ALTURA_HORA;

                            // Left: 1 columna de offset (horas) + índice del día
                            // Usamos porcentajes para la anchura: 100% / 7 columnas
                            const widthPercent = 100 / 7;
                            const leftPercent = (colIndex + 1) * widthPercent;

                            return (
                                <div
                                    key={`${materia.id}-${hIndex}`}
                                    className={`absolute rounded px-2 py-1 border-l-4 text-xs overflow-hidden hover:z-10 hover:shadow-lg transition-all cursor-pointer ${colorClase}`}
                                    style={{
                                        top: `${topPx}px`,
                                        height: `${heightPx}px`,
                                        left: `${leftPercent}%`,
                                        width: `${widthPercent - 0.5}%`, // Un poco menos para margen
                                        zIndex: 1
                                    }}
                                    title={`${materia.materia} (${horario.inicio} - ${horario.fin})`}
                                >
                                    <p className="font-bold truncate">{materia.materia}</p>
                                    <p className="truncate opacity-90">{horario.salon}</p>
                                    <p className="truncate text-[10px]">{horario.inicio.slice(0, 5)} - {horario.fin.slice(0, 5)}</p>
                                </div>
                            );
                        });
                    })}

                </div>
            </div>
        </div>
    );
}