// app/calendar/horario/page.tsx
import { Suspense } from 'react';
import HorarioClient from './HorarioClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando horario...</div>}>
      <HorarioClient />
    </Suspense>
  );
}
