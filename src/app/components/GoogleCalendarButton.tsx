import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React from 'react';
import type { Schedule } from '../../domain/entities/Schedule';
import Swal from 'sweetalert2';
interface GoogleCalendarButtonProps {
  schedule: Schedule;
  recurrenceStart: Date;
  recurrenceEnd: Date;
}

export default function GoogleCalendarButton({ schedule, recurrenceStart, recurrenceEnd }: GoogleCalendarButtonProps) {
  const session = useSession();
  const supabase = useSupabaseClient();

  function getNextDateOfDay(startDate: Date, dayOfWeek: string): Date {
    const daysMap: Record<string, number> = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
    };
    const result = new Date(startDate);
    const day = daysMap[dayOfWeek];
    const diff = (day + 7 - result.getDay()) % 7;
    result.setDate(result.getDate() + diff);
    return result;
  }

  async function handleClick() {
    if (!session) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar'
        }
      });
      if (error) {
        alert('Error al iniciar sesión con Google: ' + error.message);
        return;
      }
      return;
    }

    // @ts-ignore
    const providerToken = session.provider_token || (session.user && session.user.provider_token);
    // @ts-ignore
    const accessToken = providerToken || (session.user && session.user.identities && session.user.identities[0]?.access_token);
    if (!accessToken) {
      alert('No se pudo obtener el access token de Google.');
      return;
    }

    let successCount = 0;
    let errorCount = 0;
    // Mapeo de días de español a inglés
    const diasMap: Record<string, string> = {
      'Lunes': 'Monday',
      'Martes': 'Tuesday',
      'Miércoles': 'Wednesday',
      'Miercoles': 'Wednesday',
      'Jueves': 'Thursday',
      'Viernes': 'Friday',
      'Sábado': 'Saturday',
      'Sabado': 'Saturday',
      'Domingo': 'Sunday',
    };
    for (const course of schedule.courses) {
      for (const session of course.sessions) {
        // Log de datos crudos de la sesión para depuración
       
        // Mapeo de día
        const dayEn = diasMap[session.day] || session.day;
        const firstDate = getNextDateOfDay(recurrenceStart, dayEn);
        // Extracción robusta de horas/minutos usando Moment
        let startHour = 0, startMinute = 0, endHour = 0, endMinute = 0;
        if (session.startHour && typeof session.startHour.hour === 'function' && typeof session.startHour.minute === 'function') {
          startHour = session.startHour.hour();
          startMinute = session.startHour.minute();
        } else if (typeof session.startHour === 'string') {
          const parts = (session.startHour as string).split(':');
          startHour = Number(parts[0]);
          startMinute = Number(parts[1]);
        }
        if (session.endHour && typeof session.endHour.hour === 'function' && typeof session.endHour.minute === 'function') {
          endHour = session.endHour.hour();
          endMinute = session.endHour.minute();
        } else if (typeof session.endHour === 'string') {
          const parts = (session.endHour as string).split(':');
          endHour = Number(parts[0]);
          endMinute = Number(parts[1]);
        }
        // Validaciones de datos
        if (
          isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute) ||
          !firstDate || isNaN(firstDate.getTime())
        ) {
          // Mejor manejo de errores: muestra alerta amigable
          Swal.fire({
            icon: 'error',
            title: 'Error en datos de horario',
            text: `No se pudo exportar la sesión de ${course.subject.name} (${session.day} ${session.startHour} - ${session.endHour}) por datos inválidos.`
          });
          errorCount++;
          continue;
        }
        const eventStart = new Date(firstDate);
        eventStart.setHours(startHour, startMinute, 0, 0);
        const eventEnd = new Date(firstDate);
        eventEnd.setHours(endHour, endMinute, 0, 0);
        if (isNaN(eventStart.getTime()) || isNaN(eventEnd.getTime())) {
          console.error('Fecha de inicio o fin inválida para el evento:', { eventStart, eventEnd, session, course });
          errorCount++;
          continue;
        }
        const until = recurrenceEnd.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const event = {
          summary: course.subject.name,
          description: `Profesor: ${course.professor.fullName}\nAula: ${session.room}`,
          start: {
            dateTime: eventStart.toISOString(),
            timeZone: 'America/Mexico_City',
          },
          end: {
            dateTime: eventEnd.toISOString(),
            timeZone: 'America/Mexico_City',
          },
          recurrence: [
            `RRULE:FREQ=WEEKLY;UNTIL=${until}`
          ],
        };
        try {
          const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
          });
          if (!response.ok) {
            errorCount++;
            continue;
          }
          successCount++;
        } catch (err) {
          errorCount++;
        }
      }
    }
    Swal.fire({
      icon: errorCount === 0 ? 'success' : (successCount === 0 ? 'error' : 'warning'),
      title: errorCount === 0 ? '¡Éxito!' : (successCount === 0 ? 'Error' : 'Parcialmente exitoso'),
      text: `Eventos creados: ${successCount}. Errores: ${errorCount}`
    });
  }

  return (
    <button
      onClick={handleClick}
      className="mb-4 px-4 py-2 rounded-lg bg-[rgb(168,85,247)] text-white font-semibold shadow hover:bg-[rgb(139,54,232)] transition-colors duration-200"
    >
      Agregar horario a Google Calendar
    </button>
  );
}
