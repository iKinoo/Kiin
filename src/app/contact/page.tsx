import React from 'react'

const ContactPage = () => {
    return (
        <div className="bg-slate-50 text-black h-screen flex flex-col items-center justify-center">
            <h1 className=' text-3xl font-bold pb-10'>Equipo</h1>
            Este proyecto es posible gracias a

            <p className='pt-10 self-start ms-56 text-gray-500'>Equipo actual</p>

            <ul className=''>
                <li><span className='text-red-700'>R</span>odrigo <span className='italic text-gray-500'>Narcisista</span></li>
                <li><span className='text-red-700'>G</span>abriel <span className='italic text-gray-500'>Campechano</span></li>
                <li>Pablo <span className='italic text-gray-500'>Pablinho</span></li>
                <li><span className='text-red-700'>G</span>erardo <span className='italic text-gray-500'>El las tortas</span></li>
                <li>Dylian <span className='italic text-gray-500'>Harper</span></li>
                <li>Russel <span className='italic text-gray-500'> El Gober</span></li>
            </ul>
            <p className='pt-10 self-start ms-56 text-gray-500'>Primer equipo</p>

            <ul className=''>
                <li><span className='text-red-700'>B</span>reindel <span className='italic text-gray-500'>Nombre raro</span></li>
                <li><span className='text-red-700'>J</span>uan <span className='italic text-gray-500'>Otro campechano</span></li>
                <li><span className='text-red-700'>J</span>osé Luis <span className='italic text-gray-500'></span></li>
            </ul>
        </div>
    )
}

export default ContactPage