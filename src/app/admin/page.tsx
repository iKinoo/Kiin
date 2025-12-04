'use client';

import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

// Catálogos
const modalidadesDisponibles = [
    'Ordinario', 'Recursamiento', 'Regular',
    'Acompañamiento', 'Regular/Acompañamiento',
    'Ordinario/Recursamiento', 'Recursamiento/Acompañamiento'
];
const periodosDisponibles = ['Ene-Jun 2026', 'Ago-Dic 2025']; // Ajusta según tu BD
const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const carrerasDisponibles = ['LIS', 'LCC', 'LIC', 'LA', 'LM', 'LEM'];
const semestresDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Estilos
const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm";
const labelClass = "block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide";

export default function AdminPage() {
    const [grupos, setGrupos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filtros
    const [periodo, setPeriodo] = useState('Ene-Jun 2026');
    const [modalidad, setModalidad] = useState('todos');
    const [carrera, setCarrera] = useState('todos');
    const [semestre, setSemestre] = useState('todos');
    const [busqueda, setBusqueda] = useState('');

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Estado Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [formData, setFormData] = useState<any>({
        id: 0,
        profesor: '',
        asignatura: '',
        nombreProfesor: '',
        nombreAsignatura: '',
        modalidad: 'Regular',
        periodo: 'Ene-Jun 2026',
        horarios: []
    });

    // 1. CARGAR DATOS
    const fetchGrupos = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (periodo) params.append('periodo', periodo);
        if (modalidad) params.append('modalidad', modalidad);
        if (carrera) params.append('carrera', carrera);
        if (semestre) params.append('semestre', semestre);
        if (busqueda) params.append('busqueda', busqueda);

        try {
            const res = await fetch(`/api/admin/grupos?${params.toString()}`);
            if (!res.ok) throw new Error('Error al cargar');
            const data = await res.json();
            setGrupos(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setSelectedIds([]);
        }
    }, [periodo, modalidad, carrera, semestre, busqueda]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchGrupos();
        }, 500);
        return () => clearTimeout(timer);
    }, [fetchGrupos]);

    useEffect(() => {
        const stored = localStorage.getItem('usuario_kiin');
        if (!stored || JSON.parse(stored).rol !== 'admin') {
            window.location.href = '/';
        }
    }, []);

    // Handlers
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIds(e.target.checked ? grupos.map(g => g.ClvGrupo) : []);
    };

    const handleSelectRow = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        const confirm = await Swal.fire({
            title: `¿Eliminar ${selectedIds.length} grupos?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });
        if (confirm.isConfirmed) {
            await fetch('/api/admin/grupos', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: selectedIds })
            });
            fetchGrupos();
            Swal.fire('Eliminado', '', 'success');
        }
    };

    // Modals
    const openCreateModal = () => {
        setModalMode('create');
        setFormData({
            id: 0, profesor: '', asignatura: '', nombreProfesor: '', nombreAsignatura: '',
            modalidad: 'Regular', periodo: periodo !== 'todos' ? periodo : 'Ene-Jun 2026',
            horarios: [{ Dia: 'Lunes', Salon: '', HoraEntrada: '07:00:00', HoraSalida: '09:00:00' }]
        });
        setIsModalOpen(true);
    };

    const openEditModal = (grupo: any) => {
        setModalMode('edit');
        setFormData({
            id: grupo.ClvGrupo,
            profesor: grupo.ClvProfesor,
            asignatura: grupo.ClvAsignatura,
            nombreProfesor: grupo.NomProfesor,
            nombreAsignatura: grupo.NomAsignatura,
            modalidad: grupo.Modalidad,
            periodo: grupo.Periodo,
            horarios: grupo.horarios ? JSON.parse(JSON.stringify(grupo.horarios)) : []
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.periodo || !formData.modalidad) return Swal.fire('Error', 'Faltan datos', 'error');

        try {
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const payload = {
                id: formData.id,
                profesor: formData.profesor || 1,
                asignatura: formData.asignatura || 'MAT01',
                modalidad: formData.modalidad,
                periodo: formData.periodo,
                horarios: formData.horarios
            };

            const res = await fetch('/api/admin/grupos', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsModalOpen(false);
                Swal.fire('Éxito', 'Operación completada', 'success');
                fetchGrupos();
            } else {
                throw new Error();
            }
        } catch (e) {
            Swal.fire('Error', 'No se pudo guardar', 'error');
        }
    };

    // Horarios
    const updateHorario = (index: number, field: string, value: string) => {
        const nuevos = [...formData.horarios];
        nuevos[index] = { ...nuevos[index], [field]: value };
        setFormData({ ...formData, horarios: nuevos });
    };

    const addHorario = () => setFormData({ ...formData, horarios: [...formData.horarios, { Dia: 'Lunes', Salon: '', HoraEntrada: '07:00:00', HoraSalida: '09:00:00' }] });
    const removeHorario = (index: number) => setFormData({ ...formData, horarios: formData.horarios.filter((_: any, i: number) => i !== index) });

    const getBadgeColor = (mod: string) => {
        if (mod.includes('Recursamiento')) return 'bg-orange-100 text-orange-800 border-orange-200';
        if (mod.includes('Acompañamiento')) return 'bg-purple-100 text-purple-800 border-purple-200';
        if (mod === 'Ordinario') return 'bg-blue-100 text-blue-800 border-blue-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    return (
        <main className="min-h-screen bg-gray-100 font-sans pb-20">

            <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white font-bold rounded px-2 py-1 text-xs">ADMIN</span>
                    <h1 className="text-xl font-bold">Panel de Control</h1>
                </div>
                <a href="/" className="text-sm text-gray-300 hover:text-white transition">← Volver al Sitio</a>
            </nav>

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* BARRA DE FILTROS AMPLIADA */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className={labelClass}>Periodo</label>
                            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={inputClass}>
                                {periodosDisponibles.map(p => <option key={p} value={p}>{p}</option>)}
                                <option value="todos">Todos</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Carrera</label>
                            <select value={carrera} onChange={(e) => setCarrera(e.target.value)} className={inputClass}>
                                <option value="todos">Todas</option>
                                {carrerasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Semestre</label>
                            <select value={semestre} onChange={(e) => setSemestre(e.target.value)} className={inputClass}>
                                <option value="todos">Todos</option>
                                {semestresDisponibles.map(s => <option key={s} value={s}>{s}º Semestre</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Modalidad</label>
                            <select value={modalidad} onChange={(e) => setModalidad(e.target.value)} className={inputClass}>
                                <option value="todos">Todas</option>
                                {modalidadesDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Buscador Full Width */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por profesor, asignatura..."
                            className={`${inputClass} pl-10`}
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        {busqueda && (
                            <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">✕</button>
                        )}
                    </div>
                </div>

                {/* TABLA DE RESULTADOS */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h2 className="font-bold text-gray-800 text-lg">Resultados</h2>
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{grupos.length}</span>
                        </div>
                        <div className="flex gap-2">
                            {selectedIds.length > 0 && (
                                <button onClick={handleBulkDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-red-700 animate-pulse">
                                    🗑 Eliminar ({selectedIds.length})
                                </button>
                            )}
                            <button onClick={openCreateModal} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-green-700 flex items-center gap-2 transition transform active:scale-95">
                                <span>+</span> Nuevo
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4 w-10"><input type="checkbox" onChange={handleSelectAll} checked={grupos.length > 0 && selectedIds.length === grupos.length} className="cursor-pointer" /></th>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Asignatura</th>
                                    <th className="px-6 py-4">Profesor</th>
                                    <th className="px-6 py-4">Modalidad</th>
                                    <th className="px-6 py-4">Periodo</th>
                                    <th className="px-6 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? <tr><td colSpan={7} className="text-center py-12 text-gray-400">Cargando...</td></tr> : grupos.map((g) => (
                                    <tr key={g.ClvGrupo} className={`hover:bg-blue-50/50 transition ${selectedIds.includes(g.ClvGrupo) ? 'bg-blue-50' : ''}`}>
                                        <td className="px-6 py-4"><input type="checkbox" checked={selectedIds.includes(g.ClvGrupo)} onChange={() => handleSelectRow(g.ClvGrupo)} className="cursor-pointer" /></td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-400">{g.ClvGrupo}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{g.NomAsignatura}</td>
                                        <td className="px-6 py-4 text-gray-600">{g.NomProfesor}</td>
                                        <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getBadgeColor(g.Modalidad)}`}>{g.Modalidad}</span></td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">{g.Periodo}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => openEditModal(g)} className="text-blue-600 bg-blue-50 p-2 rounded hover:bg-blue-100">✎</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL DE EDICIÓN / CREACIÓN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-in-up my-auto border border-gray-200">
                        <div className="bg-gray-50 p-4 border-b flex justify-between items-center sticky top-0 z-10">
                            <h3 className="font-bold text-gray-800 text-lg">
                                {modalMode === 'create' ? '✨ Nuevo Grupo' : `✏️ Editar Grupo #${formData.id}`}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 font-bold p-2 transition">✕</button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelClass}>Asignatura (ID o Nombre)</label>
                                    <input
                                        type="text"
                                        value={formData.nombreAsignatura || formData.asignatura}
                                        onChange={(e) => modalMode === 'create' && setFormData({ ...formData, asignatura: e.target.value })}
                                        disabled={modalMode === 'edit'}
                                        className={`${inputClass} ${modalMode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Ej: MAT01"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelClass}>Profesor (ID o Nombre)</label>
                                    <input
                                        type="text"
                                        value={formData.nombreProfesor || formData.profesor}
                                        onChange={(e) => modalMode === 'create' && setFormData({ ...formData, profesor: e.target.value })}
                                        disabled={modalMode === 'edit'}
                                        className={`${inputClass} ${modalMode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Ej: 15"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Modalidad</label>
                                    <select value={formData.modalidad} onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })} className={inputClass}>
                                        {modalidadesDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Periodo</label>
                                    <select value={formData.periodo} onChange={(e) => setFormData({ ...formData, periodo: e.target.value })} className={inputClass}>
                                        {periodosDisponibles.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="border-t pt-5 mt-2">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">Horarios y Salones</label>
                                    <button onClick={addHorario} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 border border-blue-200 font-bold transition flex items-center gap-1">
                                        <span>+</span> Agregar Sesión
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.horarios.map((h: any, i: number) => (
                                        <div key={i} className="flex flex-wrap md:flex-nowrap gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors shadow-sm">
                                            <div className="w-1/3 md:w-32">
                                                <label className="text-[10px] text-gray-400 block mb-0.5 font-bold">DÍA</label>
                                                <select value={h.Dia} onChange={(e) => updateHorario(i, 'Dia', e.target.value)} className={`${inputClass} py-1.5`}>
                                                    {diasSemana.map(d => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <label className="text-[10px] text-gray-400 block mb-0.5 font-bold">ENTRADA</label>
                                                    <input type="time" value={h.HoraEntrada} onChange={(e) => updateHorario(i, 'HoraEntrada', e.target.value)} className={`${inputClass} py-1.5 w-28`} />
                                                </div>
                                                <span className="text-gray-400 mt-4">-</span>
                                                <div>
                                                    <label className="text-[10px] text-gray-400 block mb-0.5 font-bold">SALIDA</label>
                                                    <input type="time" value={h.HoraSalida} onChange={(e) => updateHorario(i, 'HoraSalida', e.target.value)} className={`${inputClass} py-1.5 w-28`} />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[120px]">
                                                <label className="text-[10px] text-gray-400 block mb-0.5 font-bold">SALÓN</label>
                                                <input type="text" placeholder="Ej: Lab-1" value={h.Salon} onChange={(e) => updateHorario(i, 'Salon', e.target.value)} className={`${inputClass} py-1.5`} />
                                            </div>
                                            <button onClick={() => removeHorario(i)} className="text-gray-400 hover:text-red-500 p-2 mt-4 hover:bg-red-50 rounded transition" title="Quitar sesión">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3 sticky bottom-0 z-10">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium text-sm transition">Cancelar</button>
                            <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold shadow text-sm transition transform active:scale-95 flex items-center gap-2">
                                <span>{modalMode === 'create' ? '✨ Crear Grupo' : '💾 Guardar Cambios'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}