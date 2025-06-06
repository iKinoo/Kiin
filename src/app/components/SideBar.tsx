import React from 'react'

interface HeadSideBarProps {
  toggleSideBar: () => void;
}

const HeadSideBar: React.FC<HeadSideBarProps> = ({ toggleSideBar }) => {
  return (
    <div className='flex items-center p-3 bg-gray-300 text-gray-900 rounded-lg mb-3 dark:text-white dark:bg-gray-800'>

      <div className='flex flex-col'>

        <span className="ms-2 font-semibold">Selecciona tus materias</span>
        <br />
        <span className='ms-2  text-gray-500'>
          
          Primero <span className='font-bold'>Carrera</span>, luego <span className='font-bold'>Semestre</span> y por último <span className='font-bold'>Materias</span></span>
      </div>

      <button className="self-end ml-auto md:hidden" onClick={toggleSideBar}>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>

    </div>
  );
}

interface SideBarProps {
  children: React.ReactNode;
  toggleSideBar: () => void;
  isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ children, toggleSideBar, isOpen }) => {
  return (
    <div className="z-40 md:w-1/6">
      <aside
        id="sidebar"
        className={`bg-gray-50 dark:bg-gray-800 fixed left-0 z-20 w-1/2 h-full transition-transform -translate-x-full md:w-1/6 md:translate-x-0 md:z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className='px-3 py-4 h-5/6'>
          <HeadSideBar toggleSideBar={toggleSideBar} />
          {children}

        </div>
      </aside>
    </div>
  );
}

export default SideBar