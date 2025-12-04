'use client';

import type { GrupoOferta } from '@/types/db';

interface Props {
    materias: GrupoOferta[];
}

const HORA_INICIO = 7;
const HORA_FIN = 21;
const ALTURA_HORA = 45;
const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const COLORES = [
    'bg-blue-200 border-blue-400 text-blue-800',
    'bg-green-200 border-green-400 text-green-800',
    'bg-yellow-200 border-yellow-400 text-yellow-800',
    'bg-purple-200 border-purple-400 text-purple-800',
    'bg-red-200 border-red-400 text-red-800',
    'bg-pink-200 border-pink-400 text-pink-800',
];

export default function CalendarioVisual({ materias }: Props) {

    const timeToDecimal = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours + minutes / 60;
    };

    return (
        <div className="flex flex-col h-full bg-white border rounded-lg shadow overflow-hidden print:shadow-none print:border-none print:h-auto print:overflow-visible">

            {/* 1. Encabezado */}
            <div className="grid grid-cols-7 border-b bg-gray-50 print:bg-white print:border-b-2 print:border-black shrink-0 z-20 relative">
                <div className="p-2 border-r text-center text-xs font-bold text-gray-400 print:text-black">Hora</div>
                {DIAS.map((dia) => (
                    <div key={dia} className="p-2 border-r text-center font-bold text-gray-700 uppercase text-xs sm:text-sm print:text-black print:border-black">
                        {dia.slice(0, 3)}
                    </div>
                ))}
            </div>

            {/* 2. Cuerpo */}
            <div className="flex-1 overflow-y-auto overflow-x-auto relative print:overflow-visible print:h-auto" style={{ height: '100%' }}>
                {/* AGREGADO: 'mt-2' para separar el inicio del horario del encabezado */}
                <div className="relative min-w-[600px] print:min-w-0 print:w-full mt-2 pb-4">

                    {/* Rejilla de fondo */}
                    {Array.from({ length: HORA_FIN - HORA_INICIO + 1 }).map((_, i) => {
                        const hora = HORA_INICIO + i;
                        return (
                            <div
                                key={hora}
                                className="grid grid-cols-7 border-b border-gray-100 text-xs text-gray-400 print:border-gray-300 print:text-black"
                                style={{ height: `${ALTURA_HORA}px` }}
                            >
                                <div className="border-r px-2 py-1 text-right -mt-2 bg-white sticky left-0 z-10 print:static print:text-black font-mono">
                                    {hora}:00
                                </div>
                                {DIAS.map((d) => <div key={d} className="border-r border-gray-50 print:border-gray-300" />)}
                            </div>
                        );
                    })}

                    {/* Bloques de Materias */}
                    {materias.map((materia, index) => {
                        const colorClase = COLORES[index % COLORES.length];

                        return materia.horarios.map((horario, hIndex) => {
                            const colIndex = DIAS.indexOf(horario.dia);
                            if (colIndex === -1) return null;

                            const start = timeToDecimal(horario.inicio);
                            const end = timeToDecimal(horario.fin);
                            const duration = end - start;
                            const topPx = (start - HORA_INICIO) * ALTURA_HORA;
                            const heightPx = duration * ALTURA_HORA;
                            const widthPercent = 100 / 7;
                            const leftPercent = (colIndex + 1) * widthPercent;

                            return (
                                <div
                                    key={`${materia.id}-${hIndex}`}
                                    className={`absolute rounded px-1.5 py-0.5 border-l-4 text-xs overflow-hidden hover:z-20 hover:shadow-lg transition-all cursor-pointer ${colorClase} print:bg-white print:border print:border-black print:text-black`}
                                    style={{
                                        top: `${topPx}px`,
                                        height: `${heightPx}px`,
                                        left: `${leftPercent}%`,
                                        width: `${widthPercent - 0.5}%`,
                                        zIndex: 10
                                    }}
                                    title={`${materia.materia} (${horario.salon})`}
                                >
                                    <p className="font-bold truncate text-[10px] sm:text-xs leading-tight">{materia.materia}</p>
                                    <p className="truncate opacity-90 text-[9px] sm:text-[10px]">{horario.salon}</p>
                                    <p className="truncate text-[9px] print:hidden">{horario.inicio.slice(0, 5)} - {horario.fin.slice(0, 5)}</p>
                                </div>
                            );
                        });
                    })}
                </div>
            </div>
        </div>
    );
}