import React from 'react'
import FilterSelector from '@/app/presentation/components/FilterSelector'
import Calendar from '@/app/presentation/components/Calendar'

const CalendarPage = () => {
    return (
        <div className='bg-white text-black' style={{ display: 'flex', justifyContent: 'first baseline', alignItems: 'first baseline', gap: '20px', padding: '10px' }}>
            <FilterSelector />
            <Calendar />
        </div>
    )
}

export default CalendarPage