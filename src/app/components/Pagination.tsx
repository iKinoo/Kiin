import React from "react";

/**
 * Clase para realizar cambios de paginas para observar los horarios generados
 */
type PaginationProps = {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
};

/**
 * Definicion de los componentes de cambio de pagina y sus eventos
 * @param params ordenamiento de horarios
 * @returns estructura de los botones de paginacion
 */
const Pagination: React.FC<PaginationProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
}) => {
  return (
    <div style={{width:'100px'}} className="flex justify-center items-center bg-gray-800 py-2 px-4 rounded-lg">
      <button
        className={`text-white text-xl px-4 py-2 rounded-md ${
          isPreviousDisabled ? "text-gray-500 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        &lt;
      </button>

      <button
        className={`text-white text-xl px-4 py-2 rounded-md ${
          isNextDisabled ? "text-gray-500 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
