export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando...</p>
      </div>
    </div>
  );
}
