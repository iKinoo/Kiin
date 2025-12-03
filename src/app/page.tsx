'use client';

import type { GrupoOferta } from '@/types/db';
import { useEffect, useState } from 'react';
import CalendarioVisual from './components/CalendarioVisual';
import SaveButton from './components/SaveButton';
import SelectorMaterias from './components/SelectorMaterias';

export default function Home() {
  // Estado principal: Lista de materias que el alumno ha seleccionado
  const [misMaterias, setMisMaterias] = useState<GrupoOferta[]>([]);

  // Estado de usuario para mostrar el saludo
  const [usuario, setUsuario] = useState<{ nombre: string; rol: string } | null>(null);

  // 1. Cargar usuario desde LocalStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('usuario_kiin');
    if (stored) {
      try {
        setUsuario(JSON.parse(stored));
      } catch (e) {
        console.error("Error al leer usuario", e);
      }
    }
  }, []);

  // 2. Función para agregar materia (con Validaciones)
  const handleAgregar = (nuevoGrupo: GrupoOferta) => {

    // A) Validación: ¿Ya agregaste esta misma materia (aunque sea otro grupo)?
    // Evita meter "Matemáticas" dos veces.
    const yaExisteMateria = misMaterias.some(m => m.materia === nuevoGrupo.materia);
    if (yaExisteMateria) {
      alert(`⚠️ Ya has agregado la asignatura: "${nuevoGrupo.materia}". \nSi quieres cambiar de grupo, primero elimina la anterior.`);
      return;
    }

    // B) Validación: Choque de Horarios (Puntos Extra)
    // Comparamos los horarios del nuevo grupo contra TODOS los horarios que ya tienes.
    for (const materiaActual of misMaterias) {
      for (const horarioActual of materiaActual.horarios) {
        for (const horarioNuevo of nuevoGrupo.horarios) {
          // Si es el mismo día...
          if (horarioActual.dia === horarioNuevo.dia) {
            // ...verificamos si las horas se traslapan
            // Lógica: (InicioA < FinB) Y (InicioB < FinA)
            if (horarioNuevo.inicio < horarioActual.fin && horarioNuevo.fin > horarioActual.inicio) {
              alert(
                `⛔ ¡Conflicto de Horario!\n\n` +
                `"${nuevoGrupo.materia}" choca con "${materiaActual.materia}"\n` +
                `Día: ${horarioNuevo.dia} a las ${horarioNuevo.inicio.slice(0, 5)}`
              );
              return; // Cancelar operación
            }
          }
        }
      }
    }

    // Si pasa todas las validaciones, lo agregamos al estado
    setMisMaterias([...misMaterias, nuevoGrupo]);
  };

  // 3. Función para quitar materia
  const handleRemover = (idGrupo: number) => {
    setMisMaterias(misMaterias.filter(m => m.id !== idGrupo));
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">

      {/* --- ENCABEZADO (NAVBAR) --- */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo o Icono Kiin */}
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Kiin <span className="text-blue-600">Planner</span></h1>
          </div>

          <div className="flex items-center gap-4">
            {usuario ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="hidden sm:inline text-gray-500">Hola,</span>
                <span className="font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {usuario.nombre}
                </span>
                <button
                  onClick={() => { localStorage.removeItem('usuario_kiin'); window.location.reload(); }}
                  className="text-xs text-red-500 hover:underline ml-2"
                >
                  Salir
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                Iniciar Sesión
              </a>
            )}
          </div>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* === COLUMNA IZQUIERDA: BUSCADOR Y LISTA (4/12) === */}
        <aside className="lg:col-span-4 flex flex-col gap-6 print:hidden">

          {/* Componente Buscador (Conectado a MySQL) */}
          <SelectorMaterias onAgregar={handleAgregar} />

          {/* Lista Resumen (Para borrar rápido) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex-1">
            <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">Materias Seleccionadas</h3>

            {misMaterias.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                No has seleccionado materias.
              </p>
            ) : (
              <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {misMaterias.map((m) => (
                  <li key={m.id} className="group flex justify-between items-start bg-gray-50 hover:bg-red-50 p-3 rounded-lg border border-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{m.materia}</p>
                      <p className="text-xs text-gray-500">{m.profesor}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {m.horarios.map((h, i) => (
                          <span key={i} className="text-[10px] bg-white border px-1 rounded text-gray-500">
                            {h.dia.slice(0, 3)} {h.inicio.slice(0, 5)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemover(m.id)}
                      className="text-gray-300 group-hover:text-red-500 hover:bg-white p-1 rounded-full transition"
                      title="Eliminar materia"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Instrucciones Rápidas */}
          <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100">
            <strong>Tip:</strong> Busca por nombre de materia o profesor. El sistema te avisará si hay choques de horario.
          </div>
        </aside>


        {/* === COLUMNA DERECHA: CALENDARIO VISUAL (8/12) === */}
        <section className="lg:col-span-8 flex flex-col gap-4">

          {/* Título de sección (Visible en web e impresión) */}
          <div className="flex justify-between items-end pb-2 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Horario Semanal</h2>
              <p className="text-sm text-gray-500">Planificación del Semestre</p>
            </div>
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-600 print:hidden">
              {misMaterias.length} materias / {misMaterias.reduce((acc, m) => acc + m.creditos, 0)} créditos
            </span>
          </div>

          {/* Componente Calendario (Dinámico) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] relative">
            {misMaterias.length > 0 ? (
              <CalendarioVisual materias={misMaterias} />
            ) : (
              // Estado Vacío (Placeholder bonito)
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 opacity-50">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-600">Tu horario está vacío</h3>
                <p className="text-sm text-gray-400">Usa el buscador de la izquierda para agregar clases.</p>
              </div>
            )}
          </div>

          {/* Barra de Acciones (Solo visible en web) */}
          <div className="flex justify-end pt-2 print:hidden">
            <SaveButton materias={misMaterias} />
          </div>

        </section>

      </div>
    </main>
  );
}