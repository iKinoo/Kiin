'use client';

import type { GrupoOferta } from '@/types/db';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CalendarioVisual from './components/CalendarioVisual';
import DownloadPDFButton from './components/DownloadPDFButton';
import MenuMalla from './components/MenuMalla';
import SaveButton from './components/SaveButton';

interface SeleccionMateria {
  clave: string;
  nombre: string;
  grupoFijadoId: number | null;
}

export default function Home() {
  const [usuario, setUsuario] = useState<{ nombre: string; carrera: string } | null>(null);
  const [seleccion, setSeleccion] = useState<SeleccionMateria[]>([]);
  const [horariosGenerados, setHorariosGenerados] = useState<GrupoOferta[][]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [ofertaCompleta, setOfertaCompleta] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('usuario_kiin');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUsuario(u);
        fetch('/api/oferta')
          .then(res => res.json())
          .then(data => setOfertaCompleta(data))
          .catch(err => console.error(err));
      } catch (e) {
        localStorage.removeItem('usuario_kiin');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario_kiin');
    window.location.href = '/login';
  };

  const handleToggleMateria = (clave: string, nombre: string) => {
    const existe = seleccion.find(s => s.clave === clave);
    if (existe) {
      setSeleccion(seleccion.filter(s => s.clave !== clave));
    } else {
      setSeleccion([...seleccion, { clave, nombre, grupoFijadoId: null }]);
    }
    setHorariosGenerados([]);
  };

  const handleFijarGrupo = (claveMateria: string, idGrupo: string) => {
    const id = idGrupo === 'any' ? null : Number(idGrupo);
    setSeleccion(prev => prev.map(item =>
      item.clave === claveMateria ? { ...item, grupoFijadoId: id } : item
    ));
    setHorariosGenerados([]);
  };

  const generarHorario = async () => {
    if (seleccion.length === 0) return Swal.fire('Vacío', 'Selecciona materias del menú.', 'warning');
    Swal.fire({ title: 'Generando...', didOpen: () => Swal.showLoading() });

    try {
      const fijados: Record<string, number> = {};
      seleccion.forEach(s => {
        if (s.grupoFijadoId) fijados[s.clave] = s.grupoFijadoId;
      });

      const res = await fetch('/api/generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asignaturas: seleccion.map(s => s.clave), fijados })
      });

      const data = await res.json();

      if (data.length === 0) {
        Swal.fire('Sin solución', 'No hay combinaciones posibles.', 'error');
      } else {
        setHorariosGenerados(data);
        setIndiceActual(0);
        Swal.close();
        if (window.innerWidth < 1024) {
          document.getElementById('resultados-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (e) {
      Swal.fire('Error', 'Fallo en el servidor', 'error');
    }
  };

  const getGruposDeMateria = (clave: string) => {
    const materiaNombre = seleccion.find(s => s.clave === clave)?.nombre;
    if (!materiaNombre) return [];
    // Ordenamos por ID para que el "Grupo 1" siempre sea el mismo
    return ofertaCompleta.filter(g => g.materia === materiaNombre).sort((a, b) => a.id - b.id);
  };

  // NUEVA FUNCIÓN: Genera el nombre "Grupo N"
  const getNombreGrupo = (grupo: any, listaGrupos: any[]) => {
    // 1. Filtramos solo los grupos de ESTE profesor para esta materia
    const gruposDelProfe = listaGrupos.filter(g => g.profesor === grupo.profesor);

    // 2. Buscamos en qué posición está el grupo actual (índice base 1)
    // Como ya ordenamos listaGrupos por ID en getGruposDeMateria, el índice es consistente.
    const numeroGrupo = gruposDelProfe.findIndex(g => g.id === grupo.id) + 1;

    return `Grupo ${numeroGrupo} - ${grupo.profesor}`;
  };

  const totalCreditos = (lista: GrupoOferta[]) =>
    lista.reduce((sum, m) => sum + (Number(m.creditos) || 0), 0);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans h-screen overflow-hidden">

      <nav className="bg-white shadow border-b px-6 py-3 flex justify-between items-center z-50 print:hidden h-16 shrink-0">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white font-bold rounded p-1 text-sm">K</span>
          <h1 className="text-xl font-bold text-blue-900">Kiin Planner</h1>
        </div>
        {usuario ? (
          <div className="flex items-center gap-4">
            <div className="text-right leading-tight hidden sm:block">
              <span className="block text-sm text-gray-800 font-bold">{usuario.nombre}</span>
              <span className="block text-xs text-gray-500">{usuario.carrera || "Sin carrera"}</span>
            </div>
            <a href="/perfil" className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition">Mi Perfil</a>
            <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded border border-red-200 transition">Salir</button>
          </div>
        ) : (
          <a href="/login" className="text-blue-600 font-bold text-sm hover:underline">Iniciar Sesión</a>
        )}
      </nav>

      <div className="flex-1 w-full max-w-[1920px] mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden h-[calc(100vh-64px)]">

        <aside className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-10 print:hidden">

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0">
            <div className="bg-gray-50 px-4 py-2 border-b font-bold text-gray-700 text-sm uppercase tracking-wide">
              1. Catálogo
            </div>
            <div className="p-0">
              {usuario?.carrera ? (
                <MenuMalla carrera={usuario.carrera} seleccionadas={seleccion.map(s => s.clave)} onToggle={handleToggleMateria} />
              ) : <div className="p-4 text-center text-sm text-yellow-600">⚠ Sin carrera</div>}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0">
            <div className="bg-gray-50 px-4 py-2 border-b font-bold text-gray-700 text-sm uppercase tracking-wide flex justify-between">
              <span>2. Configuración</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 rounded-full flex items-center">{seleccion.length}</span>
            </div>

            <div className="p-3 space-y-3">
              {seleccion.length === 0 ? (
                <div className="text-center py-6 text-gray-400 bg-gray-50/50 rounded border-2 border-dashed border-gray-100">
                  <p className="text-xs">Selecciona materias arriba ⬆</p>
                </div>
              ) : (
                seleccion.map((item) => {
                  // Obtenemos los grupos disponibles para esta materia
                  const gruposDisponibles = getGruposDeMateria(item.clave);

                  return (
                    <div key={item.clave} className="group bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm text-blue-900 leading-tight">{item.nombre}</span>
                        <button
                          onClick={() => handleToggleMateria(item.clave, item.nombre)}
                          className="text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-xs">📌</span>
                        </div>

                        <select
                          className="w-full pl-8 pr-8 py-2 text-xs border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent appearance-none cursor-pointer transition-all truncate"
                          value={item.grupoFijadoId || 'any'}
                          onChange={(e) => handleFijarGrupo(item.clave, e.target.value)}
                        >
                          <option value="any" className="font-bold text-gray-500">✨ Cualquier Grupo (Automático)</option>
                          {gruposDisponibles.map((g: any) => (
                            <option key={g.id} value={g.id} className="text-gray-900">
                              {/* Usamos la nueva función para mostrar "Grupo N" */}
                              {getNombreGrupo(g, gruposDisponibles)}
                            </option>
                          ))}
                        </select>

                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="p-3 border-t bg-gray-50">
              <button onClick={generarHorario} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg transition transform active:scale-95 flex justify-center items-center gap-2">
                <span>⚡</span> Generar Horario
              </button>
            </div>
          </div>
        </aside>

        <section id="resultados-section" className="lg:col-span-9 flex flex-col gap-4 h-full overflow-hidden print:col-span-12 print:overflow-visible">

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center print:hidden shrink-0">
            <div>
              <h2 className="font-bold text-gray-800 text-lg">Propuestas</h2>
              <p className="text-xs text-gray-500">
                {horariosGenerados.length > 0 ? `Opción ${indiceActual + 1} de ${horariosGenerados.length}` : 'Esperando generación...'}
              </p>
            </div>
            {horariosGenerados.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-right px-4 border-r hidden sm:block">
                  <span className="block text-[10px] text-gray-500 uppercase font-bold">Total Créditos</span>
                  <span className="block text-xl font-bold text-blue-600">{totalCreditos(horariosGenerados[indiceActual])}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIndiceActual(i => Math.max(0, i - 1))} disabled={indiceActual === 0} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded font-bold disabled:opacity-50 border">◀</button>
                  <button onClick={() => setIndiceActual(i => Math.min(horariosGenerados.length - 1, i + 1))} disabled={indiceActual === horariosGenerados.length - 1} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded font-bold disabled:opacity-50 border">▶</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative print:shadow-none print:border-none print:h-auto">
            {horariosGenerados.length > 0 ? (
              <CalendarioVisual materias={horariosGenerados[indiceActual]} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 print:hidden">
                <span className="text-6xl mb-4 opacity-20">📅</span>
                <p className="font-medium text-lg">Tu lienzo está vacío</p>
              </div>
            )}
          </div>

          {horariosGenerados.length > 0 && (
            <div className="flex justify-end gap-3 print:hidden shrink-0 pb-2">
              <DownloadPDFButton materias={horariosGenerados[indiceActual]} />
              <SaveButton materias={horariosGenerados[indiceActual]} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}