import React from 'react'

interface HeadSideBarProps {
  toggleSideBar: () => void;
}

const HeadSideBar: React.FC<HeadSideBarProps> = ({ toggleSideBar }) => {
  return (
    <button className="flex justify-center  ml-auto mt-2  w-full items-center p-2 bg-purple-500  rounded-lg  dark:text-white" onClick={toggleSideBar}>
        
        <svg  className='inline mr-2 dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        Fijar Materias y Profesores
      </button>
  );
}

interface SideBarProps {
  children: React.ReactNode;
  toggleSideBar: () => void;
  isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ children, toggleSideBar, isOpen }) => {
  return (
    <div className={` w-full   dark:bg-gray-800 bg-white ${isOpen ? "absolute animate-appearance-in" : "animate-appearance-out hidden "} flex flex-col h-full overflow-auto px-3`}>
      <HeadSideBar toggleSideBar={toggleSideBar} />
      <aside
        id="sidebar"
        className={`stick  flex-1 overflow-auto`}
        aria-label="Sidebar"
      >


        {children}
      </aside>
    </div>
  );
}

export default SideBar