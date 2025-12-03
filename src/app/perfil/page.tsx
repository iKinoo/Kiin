'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DownloadPDFButton from '../components/DownloadPDFButton';

// Interfaces
interface MateriaDB {
    ClvGrupo: number;
    NomAsignatura: string;
    NomProfesor: string;
    NumCreditos: number;
    Dia: string;
    HoraEntrada: string;
    HoraSalida: string;
    Salon: string;
}

interface HorarioGuardado {
    id: number;
    alias: string;
    fecha: string;
    materias: MateriaDB[];
}

export default function PerfilPage() {
    const [usuario, setUsuario] = useState<any>(null);
    const [horariosGuardados, setHorariosGuardados] = useState<HorarioGuardado[]>([]);
    const [loadingHorarios, setLoadingHorarios] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState('/img/default-avatar.png');

    useEffect(() => {
        // 1. Cargar Usuario
        const stored = localStorage.getItem('usuario_kiin');
        if (stored) {
            const userObj = JSON.parse(stored);
            setUsuario(userObj);
            if (userObj.foto) setPreview(userObj.foto);

            // 2. Cargar Horarios Guardados
            if (userObj.id) {
                fetch(`/api/schedule/list?idUsuario=${userObj.id}`)
                    .then(res => res.json())
                    .then(data => {
                        setHorariosGuardados(data);
                        setLoadingHorarios(false);
                    })
                    .catch(err => {
                        console.error(err);
                        setLoadingHorarios(false);
                    });
            }
        } else {
            window.location.href = '/login';
        }
    }, []);

    // Función para subir foto
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));

        const result = await Swal.fire({
            title: '¿Cambiar foto?',
            text: 'Se actualizará tu imagen de perfil.',
            imageUrl: URL.createObjectURL(file),
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Preview',
            showCancelButton: true,
            confirmButtonText: 'Sí, subir',
            confirmButtonColor: '#2563eb',
        });

        if (result.isConfirmed) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('idUsuario', usuario.id);

            try {
                const res = await fetch('/api/user/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();

                if (res.ok) {
                    const updatedUser = { ...usuario, foto: data.path };
                    localStorage.setItem('usuario_kiin', JSON.stringify(updatedUser));
                    setUsuario(updatedUser);
                    Swal.fire('¡Listo!', 'Foto actualizada.', 'success');
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo subir la imagen.', 'error');
            } finally {
                setUploading(false);
            }
        }
    };

    // Función para eliminar horario
    const handleDelete = async (idLista: number) => {
        const result = await Swal.fire({
            title: '¿Eliminar horario?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch('/api/schedule/delete', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idLista })
                });

                if (res.ok) {
                    setHorariosGuardados(prev => prev.filter(h => h.id !== idLista));
                    Swal.fire('Eliminado', 'El horario ha sido borrado.', 'success');
                } else {
                    throw new Error('Error al eliminar');
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
            }
        }
    };

    // Helper para convertir datos planos de BD a estructura jerárquica para el PDF
    const transformarParaPDF = (materiasDB: MateriaDB[]) => {
        const mapa = new Map();

        materiasDB.forEach(m => {
            if (!mapa.has(m.ClvGrupo)) {
                mapa.set(m.ClvGrupo, {
                    id: m.ClvGrupo,
                    materia: m.NomAsignatura,
                    profesor: m.NomProfesor || 'Sin asignar', // Asegurar campo
                    creditos: m.NumCreditos || 0,
                    horarios: []
                });
            }
            mapa.get(m.ClvGrupo).horarios.push({
                dia: m.Dia,
                inicio: m.HoraEntrada,
                fin: m.HoraSalida,
                salon: m.Salon
            });
        });

        return Array.from(mapa.values());
    };

    if (!usuario) return <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando perfil...</div>;

    return (
        <main className="min-h-screen bg-gray-50 font-sans pb-10">

            {/* Navbar */}
            <nav className="bg-white shadow border-b px-6 py-3 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white font-bold rounded p-1 text-sm">K</span>
                    <h1 className="text-xl font-bold text-blue-900">Kiin Perfil</h1>
                </div>
                <a href="/" className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition">
                    ← Volver al Planificador
                </a>
            </nav>

            <div className="max-w-5xl mx-auto p-6 space-y-8">

                {/* === TARJETA DE USUARIO === */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                    <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12">

                        {/* Foto */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-md">
                                <img src={usuario.foto || preview} alt="Perfil" className="w-full h-full object-cover" />
                            </div>
                            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white font-bold text-xs">
                                <span>CAMBIAR</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                            </label>
                        </div>

                        {/* Datos */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-gray-800">{usuario.nombre}</h1>
                            <p className="text-gray-500 font-medium">{usuario.carrera || 'Sin carrera asignada'}</p>
                            <p className="text-sm text-gray-400">{usuario.correo}</p>
                        </div>
                    </div>
                </div>

                {/* === LISTA DE HORARIOS === */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            📂 Mis Horarios Guardados
                        </h2>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                            {horariosGuardados.length}
                        </span>
                    </div>

                    {loadingHorarios ? (
                        <div className="py-10 text-center text-gray-400">Cargando...</div>
                    ) : horariosGuardados.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 font-medium">No has guardado horarios.</p>
                            <a href="/" className="mt-2 inline-block text-blue-600 font-semibold hover:underline">Crear uno ahora</a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {horariosGuardados.map((h) => (
                                <div key={h.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-gray-50/30 hover:bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                                    {/* Info del Horario */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-blue-900 text-lg">{h.alias}</h3>
                                            <span className="text-xs text-gray-400 border px-2 rounded">
                                                {new Date(h.fecha).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {/* Tags de materias */}
                                        <div className="flex flex-wrap gap-2">
                                            {[...new Set(h.materias.map(m => m.NomAsignatura))].map((nombre, i) => (
                                                <span key={i} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded text-gray-600">
                                                    {nombre}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Botones de Acción */}
                                    <div className="flex gap-2">
                                        {/* Botón PDF (Ahora funciona porque transformamos los datos) */}
                                        <DownloadPDFButton
                                            materias={transformarParaPDF(h.materias) as any}
                                            alias={h.alias}
                                        />

                                        {/* Botón Eliminar */}
                                        <button
                                            onClick={() => handleDelete(h.id)}
                                            className="bg-white border border-red-200 text-red-500 hover:bg-red-50 px-3 py-2 rounded shadow-sm flex items-center gap-2 transition"
                                            title="Eliminar permanentemente"
                                        >
                                            🗑
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}