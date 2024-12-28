import React from 'react'

interface HeadSideBarProps {
  toggleSideBar: () => void;
}

const HeadSideBar: React.FC<HeadSideBarProps> = ({ toggleSideBar }) => {
  return (
    <div className='block flex border-b-2 border-gray-400 items-center p-3 text-gray-900 rounded-tr-lg dark:text-white bg-gray-100 dark:bg-gray-800'>
      <span className="ms-3">Filtrar por</span>
      <button className="self-end ml-auto" onClick={toggleSideBar}>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
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
    <div className="fixed mt-2 sm:w-1/6 z-40">
      <aside
        id="sidebar"
        className={`fixed left-0 z-20 w-1/2 h-full transition-transform -translate-x-full sm:w-1/6 sm:translate-x-0 sm:z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <HeadSideBar toggleSideBar={toggleSideBar} />
        {children}
      </aside>
    </div>
  );
}

export default SideBar