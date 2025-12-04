'use client';
import { useEffect, useState } from 'react';

interface AsignaturaMalla {
    ClvAsignatura: string;
    NomAsignatura: string;
    GruposDisponibles: number; // 0 = Sin oferta
}

interface Props {
    carrera: string;
    seleccionadas: string[];
    onToggle: (clv: string, nombre: string) => void;
}

export default function MenuMalla({ carrera, seleccionadas, onToggle }: Props) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Control de acordeón: Puede haber múltiples abiertos o uno solo. 
    // Usamos un array para permitir múltiples o un número para uno solo.
    // Para UX académica, suele ser mejor ver un semestre a la vez o todos.
    const [semestreAbierto, setSemestreAbierto] = useState<string | number>(1);

    useEffect(() => {
        if (!carrera) return;
        fetch(`/api/malla?carrera=${carrera}`)
            .then(res => res.json())
            .then(result => {
                setData(result); // { periodo: '...', estructura: {...} }
                setLoading(false);
            });
    }, [carrera]);

    if (loading) return (
        <div className="p-8 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-xs text-gray-400">Cargando plan de estudios...</p>
        </div>
    );

    const malla = data.estructura;

    // Componente de Sección (Semestre)
    const Seccion = ({ titulo, materias, id }: { titulo: string, materias: AsignaturaMalla[], id: number | string }) => {
        const isOpen = semestreAbierto === id;
        const hayMaterias = materias && materias.length > 0;

        // Contamos cuántas tienen oferta real
        const ofertaActiva = materias?.filter(m => m.GruposDisponibles > 0).length || 0;

        return (
            <div className="border-b border-gray-100 last:border-0">
                <button
                    onClick={() => setSemestreAbierto(isOpen ? -1 : id)}
                    className={`w-full flex justify-between items-center px-4 py-3 text-left transition-colors ${isOpen ? 'bg-blue-50 text-blue-800' : 'bg-white hover:bg-gray-50 text-gray-700'}`}
                >
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">{titulo}</span>
                        {/* Subtítulo informativo */}
                        <span className="text-[10px] text-gray-400 font-normal">
                            {hayMaterias ? `${ofertaActiva} disponibles` : 'Sin asignaturas'}
                        </span>
                    </div>
                    <span className={`transform transition-transform duration-200 text-xs text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {/* Contenido del Acordeón */}
                {isOpen && (
                    <div className="bg-gray-50/50 p-2 space-y-1 shadow-inner">
                        {hayMaterias ? materias.map((m) => {
                            const isSelected = seleccionadas.includes(m.ClvAsignatura);
                            const sinOferta = m.GruposDisponibles === 0;

                            return (
                                <div
                                    key={m.ClvAsignatura}
                                    onClick={() => !sinOferta && onToggle(m.ClvAsignatura, m.NomAsignatura)}
                                    className={`
                    relative p-2 rounded-lg border text-sm transition-all duration-200 group
                    ${sinOferta
                                            ? 'opacity-60 bg-gray-100 border-gray-200 cursor-not-allowed'
                                            : 'cursor-pointer hover:shadow-sm border-white bg-white hover:border-blue-200'
                                        }
                    ${isSelected ? '!bg-blue-100 !border-blue-300 ring-1 ring-blue-300 z-10' : ''}
                  `}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 pr-2">
                                            <p className={`font-medium leading-tight ${sinOferta ? 'text-gray-500' : 'text-gray-800'}`}>
                                                {m.NomAsignatura}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{m.ClvAsignatura}</p>
                                        </div>

                                        {/* Indicadores */}
                                        {isSelected && (
                                            <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm">✓</div>
                                        )}
                                    </div>

                                    {/* Badge de Sin Oferta */}
                                    {sinOferta && (
                                        <div className="mt-2 inline-block px-1.5 py-0.5 bg-red-100 text-red-600 text-[9px] rounded font-bold uppercase tracking-wide border border-red-100">
                                            Sin oferta
                                        </div>
                                    )}
                                </div>
                            );
                        }) : (
                            <div className="p-4 text-center border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-400 italic">No hay materias registradas para este semestre.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header del Menú */}
            <div className="p-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-sm shrink-0">
                <h3 className="font-bold text-sm text-center tracking-wide">PLAN DE ESTUDIOS {carrera}</h3>
                <p className="text-[10px] text-center text-blue-200 mt-0.5 opacity-80">Periodo: {data.periodo}</p>
            </div>

            {/* Lista Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Generamos los semestres dinámicamente */}
                {Object.keys(malla.semestres).map((sem) => (
                    <Seccion
                        key={sem}
                        id={Number(sem)}
                        titulo={`Semestre ${sem}`}
                        materias={malla.semestres[sem]}
                    />
                ))}

                {/* Secciones Fijas */}
                <div className="border-t-4 border-gray-100 mt-2"></div>
                <Seccion id="opt" titulo="Optativas" materias={malla.optativas} />
                <Seccion id="lib" titulo="Libres" materias={malla.libres} />
            </div>
        </div>
    );
}