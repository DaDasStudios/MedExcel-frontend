import { useExamContext } from "../../../../context/exam/examContext"

interface IProps {
	handlePagination: (page: number) => void
	_page: number
	cases: number
}

const CBQPaginationButtons = ({ _page, cases, handlePagination }: IProps) => {
	const { canAnswer } = useExamContext()

	return (
		<div className='flex justify-between mt-4 gap-1'>
			<button
				onClick={() => handlePagination(-1)}
				disabled={_page === 0}
				className='flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 disabled:bg-slate-700 disabled:border-gray-100/30 disabled:cursor-not-allowed'
				type='button'
			>
				<svg
					className='w-5'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z'
					/>
				</svg>
				Prev Case
			</button>

			{_page === cases - 1 && (
				<button
					onClick={() => handlePagination(1)}
					className='flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 disabled:bg-slate-700 disabled:border-gray-100/30 disabled:cursor-not-allowed'
					type='button'
					disabled={canAnswer && _page === cases - 1}
				>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
						/>
					</svg>
					<span>Summary</span>
				</button>
			)}

			{_page < cases - 1 && (
				<button
					onClick={() => handlePagination(1)}
					className='flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50'
					type='button'
				>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
						/>
					</svg>
					<span>Next</span>
				</button>
			)}
		</div>
	)
}
export default CBQPaginationButtons
