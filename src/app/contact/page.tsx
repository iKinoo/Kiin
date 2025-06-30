import React from 'react'

const ContactPage = () => {
    return (
        <div className=" flex-2 overflow-auto flex flex-col items-center">
            <h1 className=' text-4xl font-bold pb-10 mt-14'>Equipo</h1>
            Este proyecto es posible gracias a

            <p className='mt-10 mb-5 text-gray-500'>Core</p>

            <ul className='flex flex-col items-center'>
                <Member name='Rodrigo' description='Kino' />
                <Member name='Dilian' description='Harper' />
                <Member name='Gabriel' description='Cebolla' />
                <Member name='Pablo' description='Pablinho' />
                <Member name='Gerardo' description='Contador sobrecalificado' />
                <Member name='Russel' description='Conoce a todos' />

            </ul>

            
            <p className='mt-10 mb-5 text-gray-500'>Otros</p>

            <ul className='flex flex-col items-center'>
                <Member name='Isaías' description='Mesías' />
                <Member name='Tyrone' description='King Cat' />
                <Member name='Julio' description='Whitexican' />
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