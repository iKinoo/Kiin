// app/components/SupabaseProvider.tsx
'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ReactNode } from 'react'
import supabase from '@/utils/supabaseClient'

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
