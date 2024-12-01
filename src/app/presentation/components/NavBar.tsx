'use client'
import React from 'react'
import { NavLink } from 'react-router-dom'

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
                            <NavLink to={`/${link.route}`}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NavBar