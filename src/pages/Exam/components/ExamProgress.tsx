import { useState, Fragment } from "react"
import { useAuthContext } from "../../../context/auth/authContext"
import { themeBtns } from "../../../components/ui/Buttons/SolidButton"

const PAGE_BREAK = 10

const QuestionMarker = ({ id, index }: { id: string; index: number }) => {
	const {
		auth: { user },
	} = useAuthContext()

	if (!user) {
		throw new Error("User is not logged in")
	}

	return (
		<span
			className={`flex items-center justify-center rounded-full border text-center w-8 h-8 ${
				index === user.exam.current
					? "border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"
					: user.exam.correctAnswers.includes(id) && index < user.exam.current
					? "border-emerald-100/20 bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100"
					: index < user.exam.current
					? "border-rose-100/20 bg-rose-700/50 hover:bg-rose-700/70 text-rose-100"
					: "border-slate-100/10 bg-slate-800 hover:bg-slate-700 text-slate-200"
			}
							`}
		>
			{index + 1}
		</span>
	)
}

const ExamProgress = () => {
	const {
		auth: { user },
	} = useAuthContext()

	const [isClosed, setIsClosed] = useState(true)

	if (!user) {
		throw new Error("User is not logged in")
	}

	const numberQuestions: string[] = user.exam.questions

	return (
		<>
			<div className={`grid grid-cols-6 gap-2.5 mb-4`}>
				{numberQuestions.map((questionID, index) => (
					<Fragment key={`Question:${index}:ID:${questionID}`}>
						{isClosed ? (
							<>
								{index >= user.exam.current - PAGE_BREAK && index <= user.exam.current + PAGE_BREAK && (
									<QuestionMarker id={questionID} index={index} />
								)}
							</>
						) : (
							<QuestionMarker id={questionID} index={index} />
						)}
					</Fragment>
				))}
			</div>

			{user && user?.exam.questions.length >= 2 * PAGE_BREAK && (
				<button
					onClick={() => setIsClosed(closed => !closed)}
					className={
						themeBtns.neutralBtn +
						` flex items-center gap-x-2 justify-center rounded-md px-3 py-2 mb-4 w-full`
					}
					type='button'
				>
					<p>{isClosed ? "Show all questions" : "Show fewer questions"}</p>
					{isClosed ? (
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
								d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							/>
						</svg>
					) : (
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
								d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
							/>
						</svg>
					)}
				</button>
			)}
		</>
	)
}
export default ExamProgress
