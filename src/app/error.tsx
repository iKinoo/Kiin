'use client'

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error a un servicio de monitoreo (opcional)
    console.error('Error capturado:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Ocurrió un error inesperado. Por favor, intenta de nuevo o contacta al soporte si el problema persiste.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="py-3 px-8 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transform transition-all duration-150 hover:scale-105"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="py-3 px-8 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transform transition-all duration-150 hover:scale-105"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
