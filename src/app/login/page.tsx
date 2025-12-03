'use client'; // Importante: Componente del lado del cliente

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // AQUÍ CUMPLIMOS EL REQUISITO DE LOCAL STORAGE (2 pts)
                // Guardamos datos no sensibles del usuario para usarlos en la UI
                localStorage.setItem('usuario_kiin', JSON.stringify(data.user));

                // Redirigir al inicio o dashboard
                router.push('/');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Ocurrió un error al intentar iniciar sesión.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión en Kiin</h2>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-black"
                            placeholder="tu@correo.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-black"
                            placeholder="••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}