import Spin from "../../../../components/ui/Spin"
import { useExamContext } from "../../../../context/exam/examContext"

export default function NavigationButtons() {
	const { amount, page, lastPage, canAnswer, submitting, answersRecords, handleNavigation, terminateExam } =
		useExamContext()

	const isLastQuestion = lastPage === amount
	const hasAnswered = Boolean(answersRecords[page])

	return (
		<div className='flex flex-wrap items-start md:items-center justify-between gap-x-4'>
			<button
				type='button'
				className={`flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50
			rounded-md mt-6 mb-1 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:border-gray-100/30`}
				disabled={page === 0}
				onClick={() => handleNavigation(-1)}
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

			<div className='flex-1 flex flex-wrap items-center min-[400px]:justify-end gap-x-4'>
				{hasAnswered && page < amount - 1 && (
					<button
						type='button'
						className={`flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1`}
						onClick={() => handleNavigation(1)}
					>
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path d='M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z' />
						</svg>
						Continue
					</button>
				)}

				{canAnswer && (
					<button
						type='submit'
						className='flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1'
						disabled={submitting}
					>
						<span>{submitting ? "Submitting" : "Submit"}</span>
						{submitting ? (
							<Spin />
						) : (
							<svg
								className="w-5"
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path d='M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z' />
							</svg>
						)}
					</button>
				)}

				{isLastQuestion && (
					<button
						type='button'
						className={`flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50
			rounded-md mt-6 mb-1 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:border-gray-100/30`}
						onClick={terminateExam}
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
								d='M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0V8.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 9.74a.75.75 0 101.1 1.02l1.95-2.1v4.59z'
							/>
						</svg>
						Finish
					</button>
				)}
			</div>
		</div>
	)
}
