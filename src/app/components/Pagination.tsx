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
    <div className="flex justify-center items-center bg-gray-800 px-0 rounded-lg">
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
