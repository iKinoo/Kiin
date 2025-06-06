import React from "react";

type PaginationProps = {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
}) => {
  return (
    <div className="shadow-lg border-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-500 px-3 py-3 rounded-lg flex space-x-4 z-40 md:relative md:bottom-0 md:py-1">
      <button
        className={`text-white text-xl px-4 py-2 rounded-md ${isPreviousDisabled ? "text-purple-500 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        &lt;
      </button>

      <button
        className={`text-white text-xl px-4 py-2 rounded-md ${isNextDisabled ? "text-purple-500 cursor-not-allowed" : "hover:bg-purple-700"
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
