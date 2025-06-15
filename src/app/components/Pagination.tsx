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
    <div className="shadow-lg  fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-purple-500  rounded-lg flex  items-center z-40 md:relative md:bottom-0 md:py-1">
      <button
        className={`text-white text-xl px-3 ml-2 py-2 rounded-md ${isPreviousDisabled ? "text-purple-500 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
      
      </button>

      <button
        className={`text-white text-xl px-3 mr-2 py-2 rounded-md ${isNextDisabled ? "text-purple-500 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
      </button>
    </div>
  );
};

export default Pagination;
