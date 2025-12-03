'use client';
import { useEffect, useState } from 'react';

interface AsignaturaMalla {
    ClvAsignatura: string;
    NomAsignatura: string;
    GruposDisponibles: number;
}

interface Props {
    carrera: string;
    seleccionadas: string[]; // IDs de asignaturas ya seleccionadas
    onToggle: (clv: string, nombre: string) => void;
}

export default function MenuMalla({ carrera, seleccionadas, onToggle }: Props) {
    const [malla, setMalla] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [semestreAbierto, setSemestreAbierto] = useState<number | string>(1);

    useEffect(() => {
        if (!carrera) return;
        fetch(`/api/malla?carrera=${carrera}`)
            .then(res => res.json())
            .then(data => {
                setMalla(data);
                setLoading(false);
            });
    }, [carrera]);

    if (loading) return <div className="p-4 text-gray-500 animate-pulse">Cargando plan de estudios...</div>;

    const Seccion = ({ titulo, materias, id }: { titulo: string, materias: AsignaturaMalla[], id: number | string }) => (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setSemestreAbierto(semestreAbierto === id ? -1 : id)}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 text-left transition"
            >
                <span className="font-bold text-gray-700">{titulo}</span>
                <span className={`transform transition ${semestreAbierto === id ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {semestreAbierto === id && (
                <div className="p-2 bg-white space-y-1">
                    {materias && materias.length > 0 ? materias.map((m) => {
                        const isSelected = seleccionadas.includes(m.ClvAsignatura);
                        const sinOferta = m.GruposDisponibles === 0;

                        return (
                            <div
                                key={m.ClvAsignatura}
                                onClick={() => !sinOferta && onToggle(m.ClvAsignatura, m.NomAsignatura)}
                                className={`
                  p-2 rounded cursor-pointer border flex justify-between items-center text-sm
                  ${sinOferta ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-blue-50'}
                  ${isSelected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200'}
                `}
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{m.NomAsignatura}</p>
                                    <p className="text-xs text-gray-400">{m.ClvAsignatura}</p>
                                </div>
                                {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                                {sinOferta && <span className="text-xs text-red-400">Sin grupos</span>}
                            </div>
                        );
                    }) : <p className="text-xs text-gray-400 p-2">No hay materias en esta categoría.</p>}
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-blue-900 text-white p-3 font-bold text-center">
                Plan de Estudios ({carrera})
            </div>
            <div className="max-h-[500px] overflow-y-auto">
                {/* Semestres */}
                {Object.keys(malla.semestres).map((sem) => (
                    <Seccion
                        key={sem}
                        id={Number(sem)}
                        titulo={`Semestre ${sem}`}
                        materias={malla.semestres[sem]}
                    />
                ))}
                {/* Optativas y Libres */}
                <Seccion id="opt" titulo="Optativas" materias={malla.optativas} />
                <Seccion id="lib" titulo="Libres" materias={malla.libres} />
            </div>
        </div>
    );
}