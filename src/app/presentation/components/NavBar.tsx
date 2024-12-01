'use client'
import Link from 'next/link'
import React from 'react'
interface NavBarProps {
    darkTheme?: boolean,
    links: {label: string, route: string}[]
}

const NavBar: React.FC<NavBarProps> = ({ darkTheme = false, links }) => {
    return (
        <div className={`navbar-container ${darkTheme ? 'dark' : ''}`}>
            <p className='navbar-name'>Kiin</p>
            <ul className='navbar-links'>
                {
                    links.map((link, index) => (
                        <li key={index}>
                            <Link href={`/${link.route}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NavBar