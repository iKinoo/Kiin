'use client'
import React from 'react';
import ParticlesComponent from './Particles';

// Componente contenedor para las partículas que no se re-renderiza
const ParticlesContainer: React.FC = React.memo(() => {
    return (
        <div className='z-0 absolute inset-0 flex-'>
            <ParticlesComponent />
        </div>
    );
});

ParticlesContainer.displayName = 'ParticlesContainer';

export default ParticlesContainer;
