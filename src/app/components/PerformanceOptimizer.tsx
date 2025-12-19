'use client'

import { usePrefetch } from '@/utils/prefetch';
import { useWebVitals } from '@/utils/useWebVitals';
import { useEffect } from 'react';

/**
 * Componente para inicializar optimizaciones globales
 */
export function PerformanceOptimizer() {
  // Monitorear Web Vitals
  useWebVitals();

  // Prefetch de rutas importantes después de la carga inicial
  usePrefetch({
    routes: ['/generador', '/faq', '/motivation'],
    delay: 3000, // 3 segundos después de la carga
  });

  // Registrar Service Worker (si existe)
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registrado:', registration);
        })
        .catch((error) => {
          console.log('SW registro falló:', error);
        });
    }
  }, []);

  return null; // No renderiza nada
}
