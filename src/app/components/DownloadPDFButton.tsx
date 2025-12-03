'use client';
import type { GrupoOferta } from '@/types/db';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
    materias: GrupoOferta[];
    alias?: string;
}

export default function DownloadPDFButton({ materias, alias }: Props) {

    const generatePDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4'); // Horizontal

        // 1. ENCABEZADO
        doc.setFontSize(18);
        doc.setTextColor(40, 40, 40);
        doc.text('Horario Académico', 14, 15);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generado con Kiin Planner | ${alias || 'Propuesta Generada'} | ${new Date().toLocaleDateString()}`, 14, 22);

        // 2. CALENDARIO VISUAL (GRILLA)
        const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const horas = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 a 20:00

        const gridData = horas.map(hora => {
            const row: string[] = [`${hora}:00`];

            diasSemana.forEach(dia => {
                const clase = materias.find(m =>
                    m.horarios.some(h => {
                        const hInicio = parseInt(h.inicio.split(':')[0]);
                        const hFin = parseInt(h.fin.split(':')[0]);
                        return h.dia === dia && hora >= hInicio && hora < hFin;
                    })
                );

                if (clase) {
                    const salon = clase.horarios.find(h => h.dia === dia)?.salon || '';
                    // Usamos un formato compacto para la celda
                    row.push(`${clase.materia}\n(${salon})`);
                } else {
                    row.push('');
                }
            });
            return row;
        });

        autoTable(doc, {
            head: [['Hora', ...diasSemana]],
            body: gridData,
            startY: 30,
            styles: { fontSize: 7, cellPadding: 1, overflow: 'linebreak', halign: 'center', valign: 'middle' },
            headStyles: { fillColor: [30, 64, 175], textColor: 255, fontStyle: 'bold' },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 15 } }, // Columna de horas
            theme: 'grid',
            didParseCell: function (data) {
                // Colorear celdas ocupadas
                if (data.section === 'body' && data.column.index > 0 && data.cell.raw) {
                    data.cell.styles.fillColor = [219, 234, 254]; // Azul muy claro (bg-blue-100)
                    data.cell.styles.textColor = [30, 58, 138]; // Azul oscuro
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        });

        // 3. TABLA DE DETALLES (Aquí estaba faltando info)
        const finalY = (doc as any).lastAutoTable.finalY + 15;

        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.text('Detalle de Asignaturas', 14, finalY);

        // Preparamos los datos completos para la tabla inferior
        const resumenData = materias.map(m => {
            // Formateamos el horario en texto legible: "Lunes 7:00-9:00 (A1) | Miercoles..."
            const horarioTexto = m.horarios
                .map(h => `${h.dia.slice(0, 3)} ${h.inicio.slice(0, 5)}-${h.fin.slice(0, 5)} (${h.salon})`)
                .join(' / ');

            return [
                m.materia,
                m.profesor,
                `${m.creditos}`,
                horarioTexto // <--- ESTO ES LO QUE FALTABA
            ];
        });

        autoTable(doc, {
            startY: finalY + 5,
            head: [['Asignatura', 'Profesor', 'Créditos', 'Horario y Salón']],
            body: resumenData,
            theme: 'striped',
            styles: { fontSize: 9, cellPadding: 3 },
            headStyles: { fillColor: [55, 65, 81] }, // Gris oscuro
            columnStyles: {
                0: { fontStyle: 'bold' }, // Asignatura en negrita
                2: { halign: 'center' }   // Créditos centrados
            }
        });

        // Pie de página con total de créditos
        const totalCreditos = materias.reduce((sum, m) => sum + (Number(m.creditos) || 0), 0);
        const finalY2 = (doc as any).lastAutoTable.finalY + 10;

        doc.setFontSize(10);
        doc.text(`Total de Créditos de la carga: ${totalCreditos}`, 14, finalY2);

        doc.save(`Horario_Kiin_${Date.now()}.pdf`);
    };

    return (
        <button
            onClick={generatePDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition transform active:scale-95"
            title="Descargar PDF con detalles"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>PDF</span>
        </button>
    );
}