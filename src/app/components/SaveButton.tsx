import type { GrupoOferta } from '@/types/db'; // Importamos la interfaz que definimos en el paso anterior
import { useState } from 'react';
import Swal from 'sweetalert2';

interface SaveButtonProps {
    materias: GrupoOferta[]; // Ahora recibe el array simple de la BD
}

export default function SaveButton({ materias }: SaveButtonProps) {
    const [isSaving, setIsSaving] = useState(false);

    async function handleSave() {
        // 1. VALIDACIÓN PREVIA
        if (materias.length === 0) {
            Swal.fire('Atención', 'No has seleccionado ninguna materia para guardar.', 'warning');
            return;
        }

        // 2. RECUPERAR USUARIO DE LOCALSTORAGE
        const usuarioStored = localStorage.getItem('usuario_kiin');

        if (!usuarioStored) {
            Swal.fire({
                icon: 'warning',
                title: 'Inicia Sesión',
                text: 'Necesitas iniciar sesión para guardar tu horario.',
                confirmButtonText: 'Ir al Login',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
            return;
        }

        const usuario = JSON.parse(usuarioStored);

        // 3. CONFIRMACIÓN
        const confirm = await Swal.fire({
            icon: 'question',
            title: '¿Guardar Horario?',
            text: `Se guardarán ${materias.length} materias en tu cuenta.`,
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#10b981',
        });

        if (!confirm.isConfirmed) return;

        setIsSaving(true);
        let successCount = 0;
        let errorCount = 0;

        // Feedback de carga
        Swal.fire({
            title: 'Guardando...',
            html: 'Procesando tu inscripción en la base de datos.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // 4. BUCLE DE GUARDADO (AJAX)
        for (const materia of materias) {
            try {
                const response = await fetch('/api/schedule/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUsuario: usuario.id,    // ID del usuario logueado
                        idGrupo: materia.id       // ID directo del GrupoOferta (ClvGrupo)
                    }),
                });

                if (response.ok) {
                    successCount++;
                } else {
                    // Si falla (ej. duplicado), lo contamos silenciosamente o imprimimos en consola
                    const errorData = await response.json();
                    console.warn(`No se pudo guardar ${materia.materia}: ${errorData.message}`);

                    // Opcional: Si el error es "ya existe" (409), no lo cuentes como error fatal
                    if (response.status !== 409) errorCount++;
                }
            } catch (err) {
                console.error(err);
                errorCount++;
            }
        }

        setIsSaving(false);
        Swal.close();

        // 5. REPORTE FINAL
        Swal.fire({
            icon: errorCount === 0 ? 'success' : 'warning',
            title: errorCount === 0 ? '¡Éxito Total!' : 'Guardado Parcial',
            text: `Se guardaron ${successCount} materias correctamente. ${errorCount > 0 ? `Hubo ${errorCount} errores.` : ''}`,
            confirmButtonColor: '#10b981'
        });
    }

    return (
        <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all transform hover:-translate-y-1
        ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'}
      `}
        >
            {isSaving ? (
                <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Guardando...</span>
                </>
            ) : (
                <>
                    {/* Icono de Nube / Guardar */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Guardar Mi Horario</span>
                </>
            )}
        </button>
    );
}