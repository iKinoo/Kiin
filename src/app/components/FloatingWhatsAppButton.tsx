'use client'
import React, { useEffect, useState } from 'react'

const FloatingWhatsAppButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)

    // Auto-ocultar después de 10 segundos en la primera visita
    useEffect(() => {
        const hasSeenButton = localStorage.getItem('whatsapp-button-seen')
        if (!hasSeenButton) {
            const timer = setTimeout(() => {
                setIsVisible(false)
                localStorage.setItem('whatsapp-button-seen', 'true')
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleToggleVisibility = React.useCallback(() => {
        setIsVisible(prev => !prev)
        setIsExpanded(false)
    }, [])

    const handleWhatsAppClick = React.useCallback(() => {
        window.open('https://chat.whatsapp.com/FE1i4DqAYE3DzsOTtRlRag?mode=ac_t', '_blank', 'noopener,noreferrer')
    }, [])

    return (
        <>
            {/* Botón principal flotante */}
            <div
                className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
            >
                <div className="relative">
                    {/* Mensaje expandido */}
                    {isExpanded && (
                        <div className="absolute bottom-16 right-0 mb-2 w-80 max-w-[80vw] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-in slide-in-from-bottom-2 duration-200">
                            <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                <strong className="text-gray-900 dark:text-white">¿Encontraste algún error o necesitas ayuda?</strong>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                Únete a nuestro grupo de WhatsApp para reportar errores, hacer preguntas o recibir soporte rápido.
                            </p>
                            <button
                                onClick={handleWhatsAppClick}
                                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.371-.26.297-.99.967-.99 2.357 0 1.39 1.013 2.732 1.155 2.921.142.188 2.007 3.069 4.861 4.304.677.292 1.205.467 1.616.597.679.215 1.297.184 1.785.112.545-.082 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                                </svg>
                                Abrir WhatsApp
                            </button>

                            {/* Flecha apuntando al botón */}
                            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
                        </div>
                    )}

                    {/* Botón principal */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group"
                        aria-label="Ayuda de WhatsApp"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.371-.26.297-.99.967-.99 2.357 0 1.39 1.013 2.732 1.155 2.921.142.188 2.007 3.069 4.861 4.304.677.292 1.205.467 1.616.597.679.215 1.297.184 1.785.112.545-.082 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                        </svg>

                        {/* Pulso de animación */}
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                    </button>
                </div>
            </div>

            {/* Botón pequeño para mostrar de nuevo */}
            {!isVisible && (
                <button
                    onClick={handleToggleVisibility}
                    className="fixed bottom-6 right-6 z-50 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-50 hover:opacity-100"
                    aria-label="Mostrar ayuda"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            )}

            {/* Botón de cerrar cuando está expandido */}
            {isVisible && (
                <button
                    onClick={handleToggleVisibility}
                    className="fixed bottom-20 right-6 z-50 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-75 hover:opacity-100"
                    aria-label="Ocultar ayuda"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </>
    )
}

export default FloatingWhatsAppButton
