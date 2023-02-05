import { useRouteError } from "react-router-dom"
import SolidButton, { themeBtns } from "../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../interface"

export default function ErrorPage() {
	const error = useRouteError() as any
	console.error(error)

	return (
		<div className='text-center min-h-screen tracking-tight bg-slate-900 flex items-center justify-center flex-col gap-4'>
			<h1 className='text-gray-200 font-bold text-7xl'>Oops!</h1>
			<p className='text-slate-400 text-xl font-medium max-w-xl'>
				Sorry, an unexpected error has occurred. If the error persists,
				contact
				<span className='underline'> excelatmedicine@gmail.com</span>
			</p>
			<p className='text-rose-500 text-nlg font-medium underline'>
				<i>{error.statusText || error.message}</i>
			</p>
			<SolidButton
				theme={themeBtns.blueBtn}
				as={ComponentElement.A}
				href='/'
			>
				<div className='flex items-center gap-2'>
					<svg
						className='w-5'
						fill='none'
						stroke='currentColor'
						strokeWidth={1.5}
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
						/>
					</svg>{" "}
					Go to home
				</div>
			</SolidButton>
		</div>
	)
}
