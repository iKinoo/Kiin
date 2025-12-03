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
  const [usuario, setUsuario] = useState<{ nombre: string; carrera: string; rol?: string } | null>(null);
  const [seleccion, setSeleccion] = useState<SeleccionMateria[]>([]);
  const [horariosGenerados, setHorariosGenerados] = useState<GrupoOferta[][]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [ofertaCompleta, setOfertaCompleta] = useState<any[]>([]);

  // --- INICIO ---
  useEffect(() => {
    const stored = localStorage.getItem('usuario_kiin');

    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUsuario(u);

        // Cargar oferta completa para poder filtrar en el frontend
        fetch('/api/oferta')
          .then(res => res.json())
          .then(data => setOfertaCompleta(data))
          .catch(err => console.error("Error cargando oferta", err));

      } catch (e) {
        console.error("Error leyendo usuario", e);
        localStorage.removeItem('usuario_kiin');
      }
    }
  }, []);

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem('usuario_kiin');
    window.location.href = '/login';
  };

  // --- MANEJO DE MATERIAS ---
  const handleToggleMateria = (clave: string, nombre: string) => {
    const existe = seleccion.find(s => s.clave === clave);
    if (existe) {
      setSeleccion(seleccion.filter(s => s.clave !== clave));
    } else {
      setSeleccion([...seleccion, { clave, nombre, grupoFijadoId: null }]);
    }
    setHorariosGenerados([]); // Limpiar resultados previos
  };

  const handleFijarGrupo = (claveMateria: string, idGrupo: string) => {
    const id = idGrupo === 'any' ? null : Number(idGrupo);
    setSeleccion(prev => prev.map(item =>
      item.clave === claveMateria ? { ...item, grupoFijadoId: id } : item
    ));
    setHorariosGenerados([]);
  };

  // --- GENERADOR ---
  const generarHorario = async () => {
    if (seleccion.length === 0) return Swal.fire('Vacío', 'Selecciona materias del menú.', 'warning');

    Swal.fire({ title: 'Generando combinaciones...', didOpen: () => Swal.showLoading() });

    try {
      const fijados: Record<string, number> = {};
      seleccion.forEach(s => {
        if (s.grupoFijadoId) fijados[s.clave] = s.grupoFijadoId;
      });

      const res = await fetch('/api/generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asignaturas: seleccion.map(s => s.clave),
          fijados
        })
      });

      const data = await res.json();

      if (data.length === 0) {
        Swal.fire('Sin solución', 'No hay combinaciones posibles sin choques. Intenta liberar grupos fijados.', 'error');
      } else {
        setHorariosGenerados(data);
        setIndiceActual(0);
        Swal.close();

        // Scroll en móvil hacia resultados
        if (window.innerWidth < 1024) {
          document.getElementById('resultados-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (e) {
      Swal.fire('Error', 'Fallo en el servidor', 'error');
    }
  };

  // --- HELPERS Y UTILIDADES ---

  const getGruposDeMateria = (clave: string) => {
    const materiaNombre = seleccion.find(s => s.clave === clave)?.nombre;
    if (!materiaNombre) return [];
    // Ordenamos por ID para consistencia
    return ofertaCompleta.filter(g => g.materia === materiaNombre).sort((a, b) => a.id - b.id);
  };

  // Genera nombre lógico "Grupo N - Profesor"
  const getNombreGrupo = (grupo: any, listaGrupos: any[]) => {
    // Filtramos solo los grupos de ESTE profesor para esta materia
    const gruposDelProfe = listaGrupos.filter(g => g.profesor === grupo.profesor);

    // Buscamos índice (base 1)
    const numeroGrupo = gruposDelProfe.findIndex(g => g.id === grupo.id) + 1;

    // Si el profe solo tiene 1 grupo, podemos omitir el número o dejarlo "Grupo 1"
    return `Grupo ${numeroGrupo} - ${grupo.profesor}`;
  };

  const totalCreditos = (lista: GrupoOferta[]) =>
    lista.reduce((sum, m) => sum + (Number(m.creditos) || 0), 0);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans h-screen overflow-hidden">

      {/* NAVBAR */}
      <nav className="bg-white shadow border-b px-6 py-3 flex justify-between items-center sticky top-0 z-50 print:hidden h-16 shrink-0">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white font-bold rounded p-1 text-sm">K</span>
          <h1 className="text-xl font-bold text-blue-900">Kiin Planner</h1>
        </div>

        {usuario ? (
          <div className="flex items-center gap-4">
            <div className="text-right leading-tight hidden sm:block">
              <span className="block text-sm text-gray-800 font-bold">{usuario.nombre}</span>
              <span className="block text-xs text-gray-500">
                {usuario.carrera || "Sin carrera"}
              </span>
            </div>

            {/* Botón Admin (Solo visible si rol es admin) */}
            {usuario.rol === 'admin' && (
              <a href="/admin" className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-black transition flex items-center gap-1">
                ⚙️ Admin
              </a>
            )}

            <a href="/perfil" className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition">
              Mi Perfil
            </a>

            <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded border border-red-200 transition">
              Salir
            </button>
          </div>
        ) : (
          <a href="/login" className="text-blue-600 font-bold text-sm hover:underline">Iniciar Sesión</a>
        )}
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden h-[calc(100vh-64px)]">

        {/* === BARRA LATERAL (Menú + Config) - 3 Columnas === */}
        <aside className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-10 print:hidden">

          {/* 1. SELECCIÓN DE MATERIAS (ACORDEÓN) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0">
            <div className="bg-gray-50 px-4 py-2 border-b font-bold text-gray-700 text-sm uppercase tracking-wide flex items-center gap-2">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
              Catálogo
            </div>
            <div className="p-0">
              {usuario?.carrera ? (
                <MenuMalla
                  carrera={usuario.carrera}
                  seleccionadas={seleccion.map(s => s.clave)}
                  onToggle={handleToggleMateria}
                />
              ) : (
                <div className="p-6 text-center">
                  {usuario ? (
                    <>
                      <p className="text-red-500 font-bold mb-2 text-xs">⚠ Datos incompletos</p>
                      <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded text-xs w-full">Reiniciar</button>
                    </>
                  ) : <p className="text-gray-400 text-xs">Cargando...</p>}
                </div>
              )}
            </div>
          </div>

          {/* 2. CONFIGURACIÓN (FIJAR GRUPOS) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0">
            <div className="bg-gray-50 px-4 py-2 border-b font-bold text-gray-700 text-sm uppercase tracking-wide flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                Configuración
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">{seleccion.length}</span>
            </div>

            <div className="p-3 space-y-3">
              {seleccion.length === 0 ? (
                <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded bg-gray-50/50">
                  <p className="text-xs">Selecciona materias arriba ⬆</p>
                </div>
              ) : (
                seleccion.map((item) => {
                  const gruposDisponibles = getGruposDeMateria(item.clave);
                  return (
                    <div key={item.clave} className="group bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm text-blue-900 leading-tight">{item.nombre}</span>
                        <button onClick={() => handleToggleMateria(item.clave, item.nombre)} className="text-gray-300 hover:text-red-500 px-1">✕</button>
                      </div>

                      {/* SELECTOR ESTILIZADO */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-xs">📌</span>
                        </div>
                        <select
                          className="w-full pl-7 pr-8 py-2 text-xs border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent appearance-none cursor-pointer transition-all truncate"
                          value={item.grupoFijadoId || 'any'}
                          onChange={(e) => handleFijarGrupo(item.clave, e.target.value)}
                        >
                          <option value="any" className="font-bold text-gray-500">✨ Cualquier Grupo (Auto)</option>
                          {gruposDisponibles.map((g: any) => (
                            <option key={g.id} value={g.id} className="text-gray-900">
                              {getNombreGrupo(g, gruposDisponibles)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="p-3 border-t bg-gray-50">
              <button
                onClick={generarHorario}
                disabled={seleccion.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow transition transform active:scale-[0.98] flex justify-center items-center gap-2"
              >
                <span>⚡</span> Generar Horario
              </button>
            </div>
          </div>
        </aside>

        {/* === CALENDARIO PRINCIPAL - 9 Columnas === */}
        <section id="resultados-section" className="lg:col-span-9 flex flex-col gap-4 h-full overflow-hidden print:col-span-12 print:overflow-visible">

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center print:hidden shrink-0">
            <div>
              <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                📅 Propuestas
                {horariosGenerados.length > 0 && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Generado</span>}
              </h2>
              <p className="text-xs text-gray-500">
                {horariosGenerados.length > 0
                  ? `Opción ${indiceActual + 1} de ${horariosGenerados.length}`
                  : 'Configura tus materias y genera opciones'}
              </p>
            </div>

            {horariosGenerados.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-right px-4 border-r hidden sm:block">
                  <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">Créditos</span>
                  <span className="block text-xl font-bold text-blue-600 leading-none">
                    {totalCreditos(horariosGenerados[indiceActual])}
                  </span>
                </div>

                <div className="flex gap-1">
                  <button onClick={() => setIndiceActual(i => Math.max(0, i - 1))} disabled={indiceActual === 0} className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded border border-gray-300 disabled:opacity-50 transition">◀</button>
                  <button onClick={() => setIndiceActual(i => Math.min(horariosGenerados.length - 1, i + 1))} disabled={indiceActual === horariosGenerados.length - 1} className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded border border-gray-300 disabled:opacity-50 transition">▶</button>
                </div>
              </div>
            )}
          </div>

          {/* Calendario */}
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] relative print:shadow-none print:border-none print:h-auto">
            {horariosGenerados.length > 0 ? (
              <CalendarioVisual materias={horariosGenerados[indiceActual]} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 print:hidden">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 opacity-50">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="font-medium text-lg text-gray-500">Tu lienzo está vacío</p>
                <p className="text-sm text-gray-400">Selecciona materias a la izquierda para empezar.</p>
              </div>
            )}
          </div>

          {/* Botones de Acción */}
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