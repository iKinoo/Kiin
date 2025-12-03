import type { GrupoOferta } from '@/types/db';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface SaveButtonProps {
    materias: GrupoOferta[];
}

export default function SaveButton({ materias }: SaveButtonProps) {
    const [isSaving, setIsSaving] = useState(false);

    async function handleSave() {
        if (materias.length === 0) {
            Swal.fire('Atención', 'No hay materias para guardar', 'warning');
            return;
        }

        const stored = localStorage.getItem('usuario_kiin');
        if (!stored) {
            Swal.fire('Error', 'Debes iniciar sesión', 'error');
            return;
        }
        const usuario = JSON.parse(stored);

        // 1. Pedir el ALIAS (Nombre del horario)
        const { value: alias } = await Swal.fire({
            title: 'Guardar Horario',
            input: 'text',
            inputLabel: 'Asigna un nombre a esta combinación',
            inputPlaceholder: 'Ej: Opción A - Sin huecos',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            inputValidator: (value) => {
                if (!value) return '¡Necesitas escribir un nombre!';
            }
        });

        if (!alias) return; // Si canceló

        setIsSaving(true);

        try {
            // 2. Enviar todo junto al nuevo endpoint transaccional
            const response = await fetch('/api/schedule/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUsuario: usuario.id,
                    alias: alias,
                    grupos: materias.map(m => m.id) // Enviamos array de IDs
                }),
            });

            if (response.ok) {
                Swal.fire('¡Guardado!', `El horario "${alias}" se guardó en tu perfil.`, 'success');
            } else {
                throw new Error('Error en el servidor');
            }

        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar el horario.', 'error');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition"
        >
            {isSaving ? 'Guardando...' : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Guardar Horario
                </>
            )}
        </button>
    );
}