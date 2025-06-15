import React from 'react'

interface HeadSideBarProps {
  toggleSideBar: () => void;
}

const HeadSideBar: React.FC<HeadSideBarProps> = ({ toggleSideBar }) => {
  return (
    <div className='flex justify-end'>
      
      <button className="flex justify-center  ml-auto md:hidden w-full items-center p-2 bg-gray-300 text-gray-900 rounded-lg border-2 border-gray-500 dark:text-white dark:bg-transparent" onClick={toggleSideBar}>
        <svg className='inline mr-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></svg>
        Colapsar
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
    <div className="z-40 md:w-1/6 border-large border-yellow-500">
      <aside
        id="sidebar"
        className={`border-large border-red-500 bg-gray-50 dark:bg-gray-800 fixed left-0 z-20 w-2/3 h-full transition-transform -translate-x-full md:w-1/6 md:translate-x-0 md:z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className='px-3 py-4 h-[90%] flex flex-col'>
          <HeadSideBar toggleSideBar={toggleSideBar} />
          
          {children}

        </div>
      </aside>
    </div>
  );
}

export default SideBar