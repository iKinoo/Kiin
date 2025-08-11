import { Course } from '@/domain/entities/Course';
import { Schedule } from '@/domain/entities/Schedule';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';
import Pivot from '../../domain/entities/Pivot';
import GoogleCalendarButton from '../components/GoogleCalendarButton';

type Props = {
    schedule: Schedule;
    pivots?: Pivot[];
    pinnedSubjects?: number[];
    label: string
}



function CurrentSchedule({ schedule, pivots, label, pinnedSubjects }: Props) {

    //Prueba de google
    const [start] = useState(new Date('2025-08-13T08:00:00'));
    const [end] = useState(new Date('2025-12-06T09:00:00'));
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



    return schedule ?
        <div className='md:h-full  overflow-auto p-2 md:pb-2 pb-32  top-0 relative'>


            <div className='relative flex flex-row mb-5 gap-2  items-center md:sticky md:top-0'>
                <div className='absolute h-full w-full  -z-20 backdrop-blur-sm'></div>
                <h2 className="text-center text-lg p-2 font-bold  bg-black rounded-full text-white dark:bg-white dark:text-black">{label}</h2>

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
                                title: 'Acceso Requerido',
                                text: 'Debes iniciar sesión con Google para exportar tu horario. Nos encontramos en proceso de validación de Google pero tranquil@, no mordemos.',

                                confirmButtonText: 'Iniciar sesión'
                                
                            });
                            await GoogleSignIn();
                        }}
                        className=" bg-blue-700  p-2 rounded-full items-center justify-center"
                    >
                        <svg className='-m-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 48 48">
                            <rect width="22" height="22" x="13" y="13" fill="#fff"></rect><polygon fill="#1e88e5" points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"></polygon><path fill="#1e88e5" d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"></path><polygon fill="#fbc02d" points="34,42 14,42 13,38 14,34 34,34 35,38"></polygon><polygon fill="#4caf50" points="38,35 42,34 42,14 38,13 34,14 34,34"></polygon><path fill="#1e88e5" d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z"></path><polygon fill="#e53935" points="34,34 34,42 42,34"></polygon><path fill="#1565c0" d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z"></path><path fill="#1565c0" d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z"></path>
                        </svg>




                    </button>
                )}
                <div className={`flex flex-col items-center`}>
                    Materias
                    <div className=' text-white  bg-black dark:bg-white dark:text-black px-2 rounded-full' style={{ lineHeight: 1.5 }}>
                        {schedule?.subjects.length ?? 0}
                    </div>
                </div>
            </div>

            <div className=''>
                {schedule.courses.map((course, index) => (
                    <div key={index} >
                        {CourseCard(course, colors, pivots ?? [], pinnedSubjects ?? [])}
                    </div>
                ))}
            </div>
        </div>
        :
        <div className="px-10">

            <p className="text-center mt-10">Prueba con otras materias y/o profesores</p>


        </div>
}

// Revisa el componente GoogleCalendarButton para asegurarte de que los hooks solo se usen en el cuerpo del componente o en custom hooks.
// El error "Invalid hook call" generalmente ocurre por eso.






type ShareLinkButtonProps = {
    schedule: Schedule;
    setShowShareLink: (link: string | null) => void;
    showShareLink: string | null;
}

function CourseCard(course: Course, colors: string[], pivots: Pivot[], pinnedSubjects: number[]) {

    const isProfessorPinned = pivots?.some(
        selectedPivot => (
            selectedPivot.idProfessor === course.professor.id && selectedPivot.idSubject == course.subject.id
        )
    );
    const isSubjectPinned = pinnedSubjects.includes(course.subject.id);

    return <div className="mb-4 border-2 p-4 pl-2 rounded-lg border-gray-500 text-small flex flex-row">

        <div className='w-1 mr-1  rounded' style={{ backgroundColor: colors[course.subject.id % colors.length] }}></div>
        <div className='w-full'>
            <div className=" font-semibold flex flex-row items-center w-full">

                <div className='flex-1'>
                    {course.subject.name}
                </div>
                {isSubjectPinned ? <div className='rounded-large bg-purple-900 inline h-max ml-2 my-1'>
                    <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg>
                </div>
                    : ""}




            </div>

            Grupo {course.group}



            <div className='flex flex-row items-center '>
                {isProfessorPinned ? <div className='rounded-large bg-purple-900 inline h-max mr-2 my-1'>
                    <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg>
                </div>
                    : ""}

                <svg className='mr-2 dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-240q-56 0-107 17.5T280-170v10h400v-10q-42-35-93-52.5T480-240Zm0-80q69 0 129 21t111 59v-560H240v560q51-38 111-59t129-21Zm0-160q-25 0-42.5-17.5T420-540q0-25 17.5-42.5T480-600q25 0 42.5 17.5T540-540q0 25-17.5 42.5T480-480ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm240-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-140Z" /></svg>

                {course.professor.fullName}
            </div>
        </div>


    </div>;
}

function ShareLinkButton({ schedule, setShowShareLink, showShareLink }: ShareLinkButtonProps) {
    const [isCopied, setIsCopied] = useState(false);
    return (
        <>

            <button
                onClick={async () => {
                    const coursesIds = schedule.courses.map(course => course.id);
                    const shareLink = `${window.location.href}/horario?ids=${coursesIds.toString()}`;
                    setShowShareLink(shareLink);
                }}
                className="bg-blue-700  p-2 rounded-full flex items-center justify-center"
            >
                <svg className='' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>

            </button>
            {showShareLink &&

                <div className="absolute w-full animate-appearance-in  flex flex-row items-center justify-center gap-3 dark:bg-[#111] bg-white p-1.5  rounded-lg">
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




