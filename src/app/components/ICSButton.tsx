import { Course } from '@/domain/entities/Course';
import { Schedule } from '@/domain/entities/Schedule';
import { Session } from '@/domain/entities/Session';

interface ICSButtonProps {
    schedule?: Schedule;
    semesterStart?: Date;
    semesterEnd?: Date;
}

function ICSButton({ schedule, semesterStart, semesterEnd }: ICSButtonProps) {
    const defaultStart = new Date('2025-01-12');
    const defaultEnd = new Date('2025-30-05');

    const start = semesterStart || defaultStart;
    const end = semesterEnd || defaultEnd;

    const generateICS = (schedule: Schedule): string => {
        const dayMap: { [key: string]: number } = {
            'lunes': 1,     // Monday
            'martes': 2,    // Tuesday
            'miercoles': 3, // Wednesday
            'miércoles': 3, // Wednesday (with accent)
            'jueves': 4,    // Thursday
            'viernes': 5,   // Friday
            'sabado': 6,    // Saturday
            'sábado': 6,    // Saturday (with accent)
            'domingo': 0    // Sunday
        };

        let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kiin//Horario Académico//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Horario Académico
X-WR-TIMEZONE:America/Bogota
X-WR-CALDESC:Horario generado desde Kiin
`;

        schedule.courses.forEach((course: Course) => {
            course.sessions.forEach((session: Session) => {
                const dayName = session.day.toLowerCase().trim();
                const dayOfWeek = dayMap[dayName];

                if (dayOfWeek === undefined) {
                    console.warn(`Day not recognized: ${session.day}`);
                    return;
                }

                // Find the first occurrence of this day of week within the semester
                const firstOccurrence = new Date(start);
                const daysUntilTarget = (dayOfWeek - firstOccurrence.getDay() + 7) % 7;
                firstOccurrence.setDate(firstOccurrence.getDate() + daysUntilTarget);

                // Make sure it's within the semester
                if (firstOccurrence > end) return;

                const startTime = session.startHour;
                const endTime = session.endHour;

                // Create the start and end datetime for the first occurrence
                const eventStart = new Date(firstOccurrence);
                eventStart.setHours(startTime.hours(), startTime.minutes(), 0, 0);

                const eventEnd = new Date(firstOccurrence);
                eventEnd.setHours(endTime.hours(), endTime.minutes(), 0, 0);

                // Format dates for ICS (YYYYMMDDTHHMMSS)
                const formatDateTime = (date: Date): string => {
                    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                };

                // Calculate the last occurrence within the semester
                const lastOccurrence = new Date(end);
                while (lastOccurrence.getDay() !== dayOfWeek && lastOccurrence >= firstOccurrence) {
                    lastOccurrence.setDate(lastOccurrence.getDate() - 1);
                }

                const uid = `${course.id}-${session.day}-${session.startHour.format('HHmm')}-kiin@horario.com`;
                const summary = `${course.subject.name} - Grupo ${course.group}`;
                const description = `Profesor: ${course.professor.fullName}\\nGrupo: ${course.group}\\nModalidad: ${course.modality}`;
                const location = session.room || '';

                icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDateTime(new Date())}
DTSTART:${formatDateTime(eventStart)}
DTEND:${formatDateTime(eventEnd)}
RRULE:FREQ=WEEKLY;UNTIL=${formatDateTime(new Date(lastOccurrence.getTime() + 24 * 60 * 60 * 1000))}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
`;
            });
        });

        icsContent += 'END:VCALENDAR';
        return icsContent;
    };

    const downloadICS = () => {
        if (!schedule || schedule.courses.length === 0) {
            alert('No hay horario disponible para descargar');
            return;
        }

        try {
            const icsData = generateICS(schedule);
            const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'horario-academico.ics';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating ICS file:', error);
            alert('Error al generar el archivo de calendario');
        }
    };

    return (
        <button
            onClick={downloadICS}
            className="bg-green-600 hover:bg-green-700 p-2 rounded-full flex items-center justify-center transition-colors duration-200"
            title="Descargar horario como archivo ICS"
        >
            <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
            >
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
        </button>
    );
}

export default ICSButton;