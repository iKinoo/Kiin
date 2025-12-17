// app/components/SupabaseProvider.tsx
'use client'

import supabase, { isDevMode } from '@/utils/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ReactNode, useEffect, useState } from 'react';

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  const [showDevWarning, setShowDevWarning] = useState(false);

  useEffect(() => {
    if (isDevMode) {
      setShowDevWarning(true);
      // Ocultar el mensaje después de 5 segundos
      const timer = setTimeout(() => setShowDevWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {showDevWarning && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg animate-fade-in max-w-md text-center">
          ⚠️ Ambiente de desarrollo sin credenciales: La exportación a Google Calendar no estará disponible
        </div>
      )}
      {children}
    </SessionContextProvider>
  )
}
