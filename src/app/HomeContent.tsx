'use client'
import React from 'react'
import NavBar from './components/NavBar';
import Link from 'next/link';

const HomeContent: React.FC = () => {
    const links = [
      { label: 'Inicio', route: '' },
      { label: 'Contacto', route: 'contact' },
      { label: 'Nosotros', route: 'about' }
    ]
    return (
      <div className="bg-white text-black min-h-screen">
        <NavBar links={links} />
        <div className="container mx-auto flex items-center justify-center min-h-screen gap-1">
          <div className="max-w-2xl flex flex-col gap-10 items justify-center">
            <h1 className="text-7xl leading-tight">Organiza tu carga acádemica de forma fácil y visual</h1>
            <p className="text-2xl">Una herramienta de y para estudiantes</p>
            <Link href={'/calendar'}>
                <button className="block py-2 px-10 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded">Comenzar</button>
            </Link>
          </div>
          <div className="m-1 h-[45vh] w-[45vh] rounded-full rounded-br-none border-2 bg-gray-900 img_container">
            <img className="mt-7 ml-7 object-cover h-5/6 w-5/6 rounded-full"
            src="https://images.ctfassets.net/pdf29us7flmy/50kVKgdwULKaOgvkJBRic5/68591241ae297e886978aa9f17d16e00/resized.png?w=720&q=100&fm=jpg" alt="Img bienvenida kiin" />
          </div>
        </div>
      </div>
    );
  }

export default HomeContent