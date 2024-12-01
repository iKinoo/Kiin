'use client'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
   
    return (
        <div>
            <h1>Landing Page</h1>
            <NavLink style={{backgroundColor:'blue', color:'white',borderRadius:'2rem'}} to='/calendar'>Comenzar</NavLink>
        </div>
    )
}

export default LandingPage