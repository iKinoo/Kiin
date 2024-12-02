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
      <div className="bg-white text-black">
        <NavBar links={links} />
        <div className="container pt-24 mx-auto flex items-start justify-center min-h-screen gap-10">
          <div className="max-w-2xl flex flex-col gap-10 items justify-center">
            <h1 className="text-7xl leading-tight">Organiza tu carga acádemica de forma fácil y visual</h1>
            <p className="text-2xl">Una herramienta de y para estudiantes</p>
            <Link href={'/calendar'}>
                <button className="block py-2 px-10 bg-gray-700 hover:bg-gray-900 text-white font-bold rounded">Comenzar</button>
            </Link>
          </div>
          <div className="img_container">
            <img src="https://images.ctfassets.net/pdf29us7flmy/50kVKgdwULKaOgvkJBRic5/68591241ae297e886978aa9f17d16e00/resized.png?w=720&q=100&fm=jpg" alt="" />
          </div>
        </div>
      </div>
    );
  }

export default HomeContent