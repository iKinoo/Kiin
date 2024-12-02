'use client'
import React from 'react'
import Calendar from '@/app/components/Calendar'
import SideBar from '../components/SideBar'

const CalendarPage = () => {
    return (
        <div className='bg-white text-black' style={{ display: 'flex', justifyContent: 'first baseline', alignItems: 'first baseline', gap: '20px', padding: '10px' }}>
            <SideBar />
            <Calendar />
        </div>
    )
}

export default CalendarPage