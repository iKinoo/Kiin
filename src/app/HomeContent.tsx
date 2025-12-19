'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

// Lazy load particles para mejorar performance inicial
const ParticlesContainer = dynamic(() => import('./components/ParticlesContainer'), {
  ssr: false, // No renderizar en el servidor
  loading: () => null, // Sin loader visible
});

const HomeContent: React.FC = () => {
  const words = useMemo(() => ['Inteligente', 'Eficiente', 'Rápida', 'Fácil', 'Visual'], []);
  const colors = useMemo(() => [
    'text-blue-500',
    'text-green-500',
    'text-purple-500',
    'text-pink-500',
    'text-yellow-500',
    'text-indigo-500',
    'text-red-500'
  ], []);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    setDisplayText('');

    // Typing animation
    const typeText = (index: number) => {
      if (index <= currentWord.length) {
        setDisplayText(currentWord.slice(0, index));
        if (index < currentWord.length) {
          timeoutId = setTimeout(() => typeText(index + 1), 150);
        } else {
          // Wait before starting to delete
          timeoutId = setTimeout(() => {
            deleteText(currentWord.length);
          }, 2000);
        }
      }
    };

    // Deleting animation
    const deleteText = (index: number) => {
      if (index >= 0) {
        setDisplayText(currentWord.slice(0, index));
        if (index > 0) {
          timeoutId = setTimeout(() => deleteText(index - 1), 75);
        } else {
          // Move to next word after a short delay
          timeoutId = setTimeout(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          }, 500);
        }
      }
    };

    // Start typing after a short delay
    timeoutId = setTimeout(() => typeText(0), 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentWordIndex, words]);

  return (
    <div className=' h-full overflow-auto flex-col'>
      <ParticlesContainer />
      <div className=" relative  h-full">
        <div className="container mx-auto flex h-full flex-col-reverse lg:flex-row items-center justify-center  gap-6 px-4">
          <div className="max-w-2xl text-center lg:text-left flex flex-col gap-10 items-center lg:items-start justify-center">
            <h1 className="text-5xl text-wrap sm:text-5xl lg:text-7xl leading-tight flex flex-col items-center sm:items-start">
              Planea tu Carga Académica de forma
              <span
                className={`
                ${colors[currentWordIndex]} 
                typewriter-text
                font-bold
                w-max
                border
              
              `}
                
              >
                {displayText}
                <span className="typewriter-cursor">
                  |
                </span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl">
              De estudiantes para estudiantes
            </p>
            <Link href={'/generador'}>
              <button className="block py-3 px-10 bg-purple-500 hover:bg-orange-700 text-white font-bold rounded-xl transform transition-transform duration-150 active:scale-110">
                Comenzar
              </button>
            </Link>
          </div>
          <div className="mx-16 flex justify-center lg:justify-start mt-6 lg:mx-0 xl:mx-0 2xl:mx-9">
            <Image
              className="max-w-full h-auto sm:h-80 sm:w-auto lg:h-5/6 lg:w-auto object-cover"
              src="/img/banner.png"
              alt="Banner de bienvenida Kiin - Planeación de carga académica"
              width={500}
              height={500}
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
            />
          </div>
        </div>
      </div>
    </div>

  );
}

// Memoizar componente para evitar re-renders innecesarios
export default React.memo(HomeContent);