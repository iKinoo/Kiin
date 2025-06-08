import { Schedule } from '@/domain/entities/Schedule';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';
import GoogleCalendarButton from './GoogleCalendarButton';
import Image from 'next/image';

type Props = {
    schedule: Schedule;
}



function CurrentSchedule({ schedule }: Props) {

    //Prueba de google
    const [start] = useState(new Date('2025-06-05T08:00:00'));
    const [end] = useState(new Date('2025-06-28T09:00:00'));
    const session = useSession();
    const supabase = useSupabaseClient();

    // Referencia para el popup
    const popupRef = useRef<Window | null>(null);

    async function GoogleSignIn() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar',
                redirectTo: window.location.href,
                skipBrowserRedirect: true, // Importante para obtener la URL sin redirigir
            }
        });

        if (error) {
            console.error('Error signing in:', error.message);
            alert('Error signing in: ' + error.message);
            return;
        }

        if (data?.url) {
            // Abrir el flujo de Google en un popup y guardar la referencia
            popupRef.current = window.open(data.url, 'oauthPopup', 'width=600,height=700');
        }
    }

    // Cerrar el popup cuando la sesión cambie (usuario autenticado)
    useEffect(() => {
        if (session && popupRef.current && !popupRef.current.closed) {
            popupRef.current.close();
            popupRef.current = null;
        }
    }, [session]);

    // async function GoogleSignOut() {
    //     await supabase.auth.signOut();
    // }
    //google termina

    const [showShareLink, setShowShareLink] = useState<string | null>(null);

    const colors = [
        "#AA6AFF",
        "#00B0FF",
        "#FF70E9",
        "#FFA647",
        "#6D8CFF",
        "#FF5C8A",
        "#4DFFB8",
        "#FFD94D",
        "#B570FF",
        "#4F6CFF",
    ]

    return (
        <>
            <h2 className="text-center text-xl font-bold my-4">Horario Actual</h2>

            <div className='flex flex-col mb-5 gap-2 relative '>

                <ShareLinkButton schedule={schedule} setShowShareLink={setShowShareLink} showShareLink={showShareLink} />
                {session ? (
                    <>
                        {/*<button onClick={GoogleSignOut}>Sign Out</button>*/}
                        {session && session.expires_at && session.expires_at < Date.now() / 1000 ? (
                            <div className="mb-4">
                                <button
                                    onClick={async () => {
                                        const Swal = (await import('sweetalert2')).default;
                                        await Swal.fire({
                                            icon: 'info',
                                            title: 'Sesión expirada',
                                            text: 'Tu sesión de Google ha expirado. Por favor, inicia sesión nuevamente para exportar tu horario.',
                                            confirmButtonText: 'Iniciar sesión'
                                        });
                                        await GoogleSignIn();
                                    }}
                                    className="px-4 py-2 rounded-lg bg-[rgb(168,85,247)] text-white font-semibold shadow hover:bg-[rgb(139,54,232)] transition-colors duration-200"
                                >
                                    Iniciar sesión con Google
                                </button>
                            </div>
                        ) : (
                            <GoogleCalendarButton
                                schedule={schedule}
                                recurrenceStart={start}
                                recurrenceEnd={end}
                            />
                        )}</>

                ) : (
                    <button
                        onClick={async () => {
                            const Swal = (await import('sweetalert2')).default;
                            await Swal.fire({
                                icon: 'info',
                                title: 'Acceso requerido',
                                text: 'Debes iniciar sesión con Google para exportar tu horario.',
                                confirmButtonText: 'Iniciar sesión'
                            });
                            await GoogleSignIn();
                        }}
                        className="h-full w-full flex justify-center items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-800 transition-colors duration-200"
                    >
                        <Image src={'/img/google_calendar_icon.svg'} unoptimized alt={''} width={30} height={30} className='mr-2' />


                        <span className='justify-self-center'>Agregar a Google Calendar</span>

                    </button>
                )}
            </div>

            <>

                {schedule.courses.map((course, index) => (
                    <div key={index} >
                        <div className="mb-4 border-2 p-4 rounded-lg border-gray-500 text-small">
                            <h3 className=" font-semibold">{course.subject.name}</h3>



                            <div className='h-1 my-2 rounded' style={{ backgroundColor: colors[index] }}>    
                            </div>
                            
                            <p>Grupo: {course.group}</p>
                            <p>Profesor: {course.professor.fullName}</p>
                            <p>Carrera: {course.subject.degreeResume}</p>
                            <p>Semestre: {course.subject.semestre.join(', ')}</p>
                            <p>Modalidad: {course.modality}</p>
                        </div>
                    </div>
                ))}
            </>
        </>
    )
}

// Revisa el componente GoogleCalendarButton para asegurarte de que los hooks solo se usen en el cuerpo del componente o en custom hooks.
// El error "Invalid hook call" generalmente ocurre por eso.






type ShareLinkButtonProps = {
    schedule: Schedule;
    setShowShareLink: (link: string | null) => void;
    showShareLink: string | null;
}

function ShareLinkButton({ schedule, setShowShareLink, showShareLink }: ShareLinkButtonProps) {
    const [isCopied, setIsCopied] = useState(false);
    return (
        <>

            <button
                onClick={async () => {
                    const coursesIds = schedule.courses.map(course => course.id);
                    const shareLink = `${window.location.origin}/calendar/horario?ids=${coursesIds.toString()}`;
                    setShowShareLink(shareLink);
                }}
                className="flex items-center justify-center h-full w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold  hover:bg-blue-800 transition-colors duration-200"
            >
                <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>
                Compartir
            </button>
            {showShareLink &&

                <div className="absolute w-full  animate-appearance-in  flex flex-row items-center justify-center gap-3 dark:bg-[#111] bg-white p-1.5 -mt-1 rounded-lg">
                    <div className="flex-1 text-xs dark:text-white text-black overflow-hidden truncate dark:bg-gray-800 dark:border-none border border-black  p-2 py-2.5 rounded-md">
                        {showShareLink}
                    </div>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(showShareLink);
                            setIsCopied(true);
                            setTimeout(() => {
                                setIsCopied(false);
                                setShowShareLink(null);
                            }, 1000);
                        }}
                        className="   dark:text-white text-sm "
                    >

                        {isCopied ? 'Copiado!' : <svg className='inline dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>}
                    </button>
                    <button
                        onClick={() => setShowShareLink(null)}
                        className="   text-white "
                        aria-label="Cerrar"
                    >
                        <svg className='dark:fill-white fill-black  ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
            }
        </>
    )
}

export default CurrentSchedule




