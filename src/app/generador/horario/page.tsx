// app/calendar/horario/page.tsx
import { Suspense } from 'react';
import HorarioClient from './HorarioClient';

export default function Page() {
  return (
    <div className=' flex-1 overflow-auto'>
      <Suspense fallback={<div>Cargando horario...</div>}>

        <div className='h-full 0'>
          <HorarioClient />
        </div>

      </Suspense>
    </div>
  );
}
