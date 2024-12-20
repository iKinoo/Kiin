import React from 'react'

const ContactPage = () => {
    return (
        <div className="bg-slate-50 text-black h-screen flex flex-col items-center justify-center">
            <h1 className=' text-3xl font-bold pb-10'>Equipo</h1>
            Este proyecto es posible gracias a

            <p className='pt-10 self-start ms-56 text-gray-500'>Actual</p>

            <ul className='flex flex-col items-center'>
                <Member name='Rodrigo' description='Kino' />
                <Member name='Gabriel' description='Cebolla' />
                <Member name='Pablo' description='Pablinho' />
                <Member name='Gerardo' description='Contador sobrecalificado' />
                <Member name='Dilian' description='Harper' />
                <Member name='Russel' description='El Gober' />

            </ul>
            <p className='pt-10 self-start ms-56 text-gray-500'>Los primeros</p>

            <ul className='flex flex-col items-center'>
                <Member name='Breindel' description='Guapo' />
                <Member name='Juan' description='Táctico' />
                <Member name='José Luis' description='Fuckboy' />
            </ul>
        </div>
    )
}

export default ContactPage

interface MemberProps {
    name: string,
    description: string
}

const Member = (props: MemberProps) => {

    return (
        <li>{props.name} <span className='italic text-gray-500'>{props.description}</span></li>
    )
}