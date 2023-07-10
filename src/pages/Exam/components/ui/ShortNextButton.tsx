import { useExamContext } from "../../../../context/exam/examContext"

const ShortNextButton = () => {
	const { handleNavigation, page, lastPage } = useExamContext()

	return lastPage === page ? null : (
		<div className='absolute right-0 top-0'>
			<button
				onClick={() => handleNavigation(1)}
				type='submit'
				aria-label='Next question button'
				title='Next question'
				className='flex items-center gap-2 py-1.5 px-3 rounded-md -m-2 hover:bg-slate-500/20 transition-colors'
			>
				<svg
					className='w-6'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z'
					/>
				</svg>
			</button>
		</div>
	)
}
export default ShortNextButton
