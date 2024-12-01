'use client'
import React from 'react'
import LandingPage from "@/app/presentation/pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '@/app/presentation/components/NavBar';
import Calendar from "@/app/presentation/components/Calendar";
import FilterSelector from "@/app/presentation/pages/FilterSelector";
const RoutesIndex = () => {
    const links = [
        { label: 'Inicio', route: '' },
        { label: 'Contacto', route: 'contact' },
        { label: 'Nosotros', route: 'about' }
    ]

    return (
        <Router>
            <NavBar links={links} />

            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/contact' element={<h1>Contact Page</h1>} />
                <Route path='/about' element={<h1>About Page</h1>} />
                <Route path='/calendar' element={<div style={{display:'flex', justifyContent:'first baseline', alignItems: 'first baseline', gap:'20px', padding: '10px'}}>
                    <FilterSelector />
                    <Calendar />
                    </div>} />
        
            </Routes>

        </Router>
    )
}

export default RoutesIndex