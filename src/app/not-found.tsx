import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link 
          href="/"
          className="inline-block py-3 px-8 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transform transition-all duration-150 hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
