'use client'
import React from 'react'
import Link from 'next/link';
import ParticlesComponent from './components/Particles';
const HomeContent: React.FC = () => {
  return (
    <div className=' h-screen flex flex-col overflow-hidden'>
      <div className='z-0 absolute inset-0'>
        <ParticlesComponent/>
      </div>
    <div className="z-10 relative">
      <div className="container mx-auto flex flex-1 flex-col-reverse lg:flex-row items-center justify-center min-h-screen gap-6 px-4">
        <div className="max-w-2xl text-center lg:text-left flex flex-col gap-10 items-center lg:items-start justify-center">
          <h1 className="text-5xl sm:text-5xl lg:text-7xl leading-tight">
            Organiza tu carga académica de forma fácil y visual
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl">
            Una herramienta de y para estudiantes
          </p>
          <Link href={'/calendar'}>
            <button className="block py-3 px-10 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-xl transform transition-transform duration-150 active:scale-110">
              Comenzar
            </button>
          </Link>
        </div>
        <div className="mx-16 flex justify-center lg:justify-start mt-6 lg:mx-0 xl:mx-0 2xl:mx-9">
          <img
            className="max-w-full h-auto sm:h-80 sm:w-auto lg:h-5/6 lg:w-auto object-cover"
            src="img/banner.png"
            alt="Img bienvenida kiin"
          />
        </div>
      </div>
    </div>
    </div>

  );
}

export default HomeContent