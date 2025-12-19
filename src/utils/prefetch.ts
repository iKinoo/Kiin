/**
 * Utilidad para prefetch de rutas críticas
 * Mejora la navegación al precargar páginas importantes
 */

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UsePrefetchOptions {
  routes: string[];
  delay?: number;
}

/**
 * Hook para hacer prefetch de rutas importantes después de cargar la página
 * @param options - Configuración de prefetch
 */
export function usePrefetch({ routes, delay = 2000 }: UsePrefetchOptions) {
  const router = useRouter();

  useEffect(() => {
    // Esperar a que la página termine de cargar y el usuario esté idle
    const timeoutId = setTimeout(() => {
      routes.forEach((route) => {
        router.prefetch(route);
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [routes, delay, router]);
}

/**
 * Prefetch al hacer hover sobre un enlace
 */
export function prefetchOnHover(href: string) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }
}
