import react from 'react'
import Link from 'next/link'
interface ScheduleItemProps{
	title: string
}



export const ScheduleItem: React.FC<ScheduleItemProps> = ({ title }) => {
	return (
		<li className='w-full h-10'>
			<button className='w-full h-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
				<Link href="">
					<h2>{title}</h2>
				</Link>
			</button>
			
		</li>
	);
}