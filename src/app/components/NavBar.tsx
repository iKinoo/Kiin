'use client'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
interface NavBarProps {
    links: { label: string, route: string }[]
}

const navBarItem = (link: { label: string, route: string }, index: number) => {
    return (
        <li key={index} className="flex items-center justify-center">
            <Link
                href={link.route}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
            >
                {link.label}
            </Link>
        </li>
    )
}

const AppLogo = () => {
    return (
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center h-8 w-8 logo">
                    {/*Logo para tema claro*/}
                    <img src="/img/logo/color_black.png" alt=""
                    className="dark:hidden" 
                    />
                    {/*Logo para tema oscuro*/}
                    <img src="/img/logo/color_white.png" alt=""
                    className="hidden dark:block" 
                    />    
                
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kiin</span>
        </Link>
    )
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (

        <nav className=" dark:bg-gray-900 sticky z-10" >
            <div className="container flex flex-wrap items-center justify-between mx-auto py-4 px-4 lg:py-0">
                <AppLogo />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Abrir menú</span>
                    {isOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    )}
                </button>
                <div
                    className={`${isOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                >
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {links.map((link, index) => navBarItem(link, index))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default NavBar