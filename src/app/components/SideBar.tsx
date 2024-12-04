import React from 'react'
const SideBar = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <div className='w-1/6'>
      <aside
        id="sidebar-multi-level-sidebar"
        className="left-0 z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        {children}
      </aside>
    </div>
  );
}

export default SideBar