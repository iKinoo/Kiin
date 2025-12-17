import React from 'react'

const ContactPage = () => {
    return (
        <div className=" flex-2 overflow-auto flex flex-col items-center">
            <h1 className=' text-4xl font-bold pb-10 mt-14'>Equipo</h1>
            Este proyecto es posible gracias a

            <p className='mt-10 mb-5 text-gray-500'>Core</p>

            <ul className='flex flex-col items-center'>
                <Member name='Rodrigo' description='Kino' link='https://www.linkedin.com/in/rodrigo-pacab/' />
                <Member name='Dilian' description='Harper' link='https://www.linkedin.com/in/dilian-us-cachon-591948236/' />
                <Member name='Gabriel' description='Cebolla' link='https://www.linkedin.com/in/gabriel-sanchez-peraza-21b59a248/' />
                <Member name='Pablo' description='Pablinho' link="https://www.linkedin.com/in/pablo-baeza/" />
                <Member name='Marco' description='SIUUUU' link='https://www.linkedin.com/in/marcocanchemscm/' />
                <Member name='Russel' description='Mr President' link='https://www.linkedin.com/in/russel-bonilla-688b8a26a/' />

            </ul>


            <p className='mt-10 mb-5 text-gray-500'>Otros</p>

            <ul className='flex flex-col items-center'>
                <Member name='Marcos' description='El otro Piña' link='https://www.linkedin.com/in/marcos-osorio-rodrigues-pi%C3%B1a/' />
                <Member name='Greco' description='Piña' link='https://www.linkedin.com/in/greco-gachuz/' />
                <Member name='Isaías' description='Mesías' link='https://www.linkedin.com/in/isaiasrdzc/'/>
                <Member name='Tyrone' description='King Cat' link='https://www.linkedin.com/in/tyrone-julian-johnson-143105274/'/>
                <Member name='Julio' description='Whitexican' link='https://www.linkedin.com/in/juliocalcocer011235/'/>
                <Member name='Gerardo' description='Contador sobrecalificado' link='https://www.linkedin.com/in/luis-gerardo-mendez-villanueva-44a653248/'/>
                <Member name='Breindel' description='Guapo' link='https://www.linkedin.com/in/breindel-varguez-a51013249/'/>
                <Member name='Juan' description='Táctico' link='https://www.linkedin.com/in/juanescamilla2026/'/>
                <Member name='José Luis Lara' description='Quiere ser inversionista' link='https://codeforces.com/profile/jluis' />
                <Member name='José Luis Gutiérrez' description='Fuckboy' link='https://www.instagram.com/jluisgutierrezc/'/>

            </ul>
        </div>
    )
}

export default ContactPage

interface MemberProps {
    name: string,
    description: string
    link?: string
}

const Member = (props: MemberProps) => {

    return (
        <li><a className='hover:text-blue-500' href={props.link ? props.link : "#"} target="_blank" rel="noopener noreferrer">{props.name} <span className='italic text-gray-500'>{props.description}</span></a></li>
    )
}