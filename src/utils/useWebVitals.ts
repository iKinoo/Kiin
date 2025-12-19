'use client'

import { useEffect } from 'react';
import { Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Hook personalizado para reportar Web Vitals
 * Útil para monitorear el rendimiento de la aplicación
 */
export function useWebVitals() {
  useEffect(() => {
    const reportWebVital = (metric: Metric) => {
      // En desarrollo, mostrar en consola
      if (process.env.NODE_ENV === 'development') {
        console.log(metric);
      }

      // En producción, enviar a analytics
      if (process.env.NODE_ENV === 'production') {
        // Enviar a Google Analytics, Vercel Analytics, o tu servicio preferido
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          });
        }

        // También puedes enviar a tu propio endpoint
        // fetch('/api/analytics', {
        //   method: 'POST',
        //   body: JSON.stringify(metric),
        // });
      }
    };

    // Registrar todos los Web Vitals
    // Nota: INP reemplazó a FID como métrica de interactividad
    onCLS(reportWebVital);
    onINP(reportWebVital);
    onFCP(reportWebVital);
    onLCP(reportWebVital);
    onTTFB(reportWebVital);
  }, []);
}
