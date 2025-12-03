'use client';
import type { GrupoOferta } from '@/types/db';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
    materias: GrupoOferta[];
    alias?: string; // Opcional, nombre del horario
}

export default function DownloadPDFButton({ materias, alias }: Props) {

    const generatePDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4'); // Landscape, milímetros, A4

        // Encabezado
        doc.setFontSize(18);
        doc.text('Horario Académico', 14, 15);
        doc.setFontSize(12);
        doc.text(`Generado con Kiin Planner | ${alias || 'Propuesta'}`, 14, 22);

        // Preparar datos para la tabla
        const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const horas = Array.from({ length: 14 }, (_, i) => i + 7); // 7 a 20 horas

        // Crear matriz vacía
        const tableData = horas.map(hora => {
            const row: any[] = [`${hora}:00 - ${hora + 1}:00`]; // Primera columna: Hora

            diasSemana.forEach(dia => {
                // Buscar si hay clase este día y hora
                const clase = materias.find(m =>
                    m.horarios.some(h => {
                        const hInicio = parseInt(h.inicio.split(':')[0]);
                        const hFin = parseInt(h.fin.split(':')[0]);
                        // Normalizar día (quitar acentos si hubiera)
                        return h.dia === dia && hora >= hInicio && hora < hFin;
                    })
                );

                if (clase) {
                    // Encontrar el salón específico de esa hora
                    const salon = clase.horarios.find(h => h.dia === dia)?.salon || '';
                    row.push(`${clase.materia}\n(${salon})`);
                } else {
                    row.push('');
                }
            });
            return row;
        });

        // Generar Tabla
        autoTable(doc, {
            head: [['Hora', ...diasSemana]],
            body: tableData,
            startY: 30,
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            theme: 'grid',
            // Colorear celdas con contenido
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index > 0) {
                    const text = data.cell.raw as string;
                    if (text && text.length > 0) {
                        data.cell.styles.fillColor = [220, 240, 255]; // Azul clarito
                        data.cell.styles.fontStyle = 'bold';
                    }
                }
            }
        });

        // Tabla Resumen Abajo
        const finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.text('Detalle de Asignaturas:', 14, finalY);

        const resumenData = materias.map(m => [m.materia, m.profesor, m.creditos, m.horarios.map(h => `${h.dia} ${h.inicio.slice(0, 5)}`).join(', ')]);

        autoTable(doc, {
            startY: finalY + 5,
            head: [['Materia', 'Profesor', 'Créditos', 'Horario']],
            body: resumenData,
            styles: { fontSize: 8 },
            theme: 'striped'
        });

        doc.save(`Horario_Kiin_${Date.now()}.pdf`);
    };

    return (
        <button onClick={generatePDF} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow flex items-center gap-2">
            📄 PDF
        </button>
    );
}