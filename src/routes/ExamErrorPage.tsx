import { useRouteError } from "react-router-dom"
import SolidButton, { themeBtns } from "../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../interface"

export default function ExamErrorPage() {
	const error = useRouteError() as any
	console.error(error)

	return (
		<div className='text-center min-h-screen tracking-tight bg-slate-900 flex items-center justify-center flex-col gap-4'>
			<h1 className='text-gray-200 font-bold text-7xl'>Oops!</h1>
			<p className='text-slate-400 text-xl font-medium max-w-xl'>
				Only users with an actived subscription plan can see their exam records more than once.
			</p>
			<SolidButton
				theme={themeBtns.greenBtn}
				as={ComponentElement.BUTTON}
				onClick={() => window.location.replace("/exam")}>
				<div className='flex items-center gap-2'>
					<svg
						className='w-5'
						fill='none'
						stroke='currentColor'
						strokeWidth={1.5}
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
						/>
					</svg>{" "}
					Start a new Exam!
				</div>
			</SolidButton>
		</div>
	)
}
