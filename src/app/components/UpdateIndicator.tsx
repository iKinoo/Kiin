import { useEffect, useState } from 'react';

interface LiveIndicatorProps {
    isLive: boolean;
}

const LiveIndicator = (props: LiveIndicatorProps) => {
    const { isLive } = props;
    const [updateDate, setUpdateDate] = useState<string>('Cargando...');

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch('/api/version');
                const version = await response.json();

                // Extraer la fecha del formato "1.1_DD.MM.YYYY"
                const datePart = version.split('_')[1];
                if (datePart) {
                    const [day, month, year] = datePart.split('.');
                    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

                    // Formatear la fecha en español
                    const formattedDate = date.toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });

                    setUpdateDate(formattedDate);
                } else {
                    setUpdateDate('Fecha no disponible');
                }
            } catch (error) {
                console.error('Error fetching version:', error);
                setUpdateDate('Error al cargar fecha');
            }
        };

        fetchVersion();
    }, []);

    return (
        <div className="flex items-center space-x-2">
            <div
                className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-600 animate-pulse ' : 'bg-gray-400'
                    }`}
            ></div>
            <div className='ml-2'> </div>
            {updateDate}
        </div>
    );
};

export default LiveIndicator;
