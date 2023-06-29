import { useExamContext } from "../../../../context/exam/examContext"

interface IProps {
	handlePagination: (page: number) => void
	currPage: number
	cases: number
	submitAnswers: () => void
}

const CBQPaginationButtons = ({ currPage, cases, handlePagination, submitAnswers }: IProps) => {
	const { hasAnswered, mode, questionsAfterCancelling, questionNumber } = useExamContext()
	
	return (
		<div className='flex justify-between mt-4 gap-1'>
			<button
				onClick={() => {
					handlePagination(-1)
				}}
				className={`flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 ${
					currPage === 0
						? "bg-slate-700 border-gray-100/30 cursor-not-allowed"
						: "border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50"
				}`}
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
				Previous
			</button>
			<button
				onClick={() => {
					handlePagination(1)
					if (!hasAnswered && currPage === cases - 1) {
						submitAnswers()
					}
				}}
				className='flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50'
				type='button'
			>
				{currPage === cases - 1 ? (
					hasAnswered ? (
						<>
							Summary
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
						</>
					) : (
						<>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path d='M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z' />
							</svg>
							<span className='hidden sm:block'>
								{mode === "LIVE"
									? "Submit answer"
									: questionsAfterCancelling && questionNumber === questionsAfterCancelling.length - 1
									? "Leave"
									: "Submit answer"}
							</span>
							<span className='block sm:hidden'>
								{mode === "LIVE"
									? "Next"
									: questionsAfterCancelling && questionNumber === questionsAfterCancelling.length - 1
									? "Leave"
									: "Next"}
							</span>
						</>
					)
				) : (
					<>
						Next
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
					</>
				)}
			</button>
		</div>
	)
}
export default CBQPaginationButtons
