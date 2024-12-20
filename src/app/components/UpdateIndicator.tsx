import React from 'react';

interface LiveIndicatorProps {
    isLive: boolean;
}

const LiveIndicator = (props: LiveIndicatorProps) => {
    const { isLive } = props;
    return (
        <div className="flex items-center space-x-2">
            <div
                className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-600 animate-pulse ' : 'bg-gray-400'
                    }`}
            ></div>
            {/* <span className="text-sm font-medium">
                {isLive ? 'En vivo' : 'Desconectado'}
            </span> */}
        </div>
    );
};

export default LiveIndicator;
