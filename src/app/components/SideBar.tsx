import React from 'react'

interface HeadSideBarProps {
  toggleSideBar: () => void;
}

const HeadSideBar: React.FC<HeadSideBarProps> = ({ toggleSideBar }) => {
  return (
    <div className=''>

      <button className="flex justify-center  ml-auto  w-full items-center p-2 bg-gray-300  rounded-lg border-2 border-gray-500 dark:text-white bg-transparent" onClick={toggleSideBar}>
        <svg className='inline mr-2 dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" /></svg>
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
    <div className={` w-2/3   dark:bg-gray-800 bg-white ${isOpen ? "absolute" : "hidden"} flex flex-col h-full overflow-auto px-3`}>
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