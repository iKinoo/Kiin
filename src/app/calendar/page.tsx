'use client'
import React from 'react'
import Calendar from '@/app/components/Calendar'
import SideBar from '../components/SideBar'

const CalendarPage = () => {
    return (
        <div className='bg-white text-black' style={{ display: 'flex', justifyContent: 'first baseline', alignItems: 'first baseline', gap: '20px', padding: '10px' }}>
            <div className='w-1/6'>
                <SideBar />
            </div>

            <div className='w-5/6 h-screen'>
                <Calendar />
            </div>
        </div>
    )
}

export default CalendarPage