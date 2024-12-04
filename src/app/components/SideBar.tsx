import React from 'react'

/**
 * Barra lateral reutilizable
 * @param children componentes que contiene 
 * @returns Estructura de la barra lateral
 */
const SideBar = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <div className='w-1/6'>
      <aside
        id="sidebar-multi-level-sidebar"
        className="left-0 z-40 w-full h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        {children}
      </aside>
    </div>
  );
}

export default SideBar