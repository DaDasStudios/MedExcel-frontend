import { toast } from "react-hot-toast"
import { themeBtns } from "../../../components/ui/Buttons/SolidButton"
import DecitionToast from "../../../components/ui/DecitionToast"
import { useAuthContext } from "../../../context/auth/authContext"
import { useExamContext } from "../../../context/exam/examContext"
import { cancelExamRequest } from "../../../lib/exam.request"
import { formatDate } from "../../../utils/date"
import SideBarElement from "./ui/SideBarElement"
import { useState } from "react"

const Sidebar = () => {
	const { auth, refreshUser } = useAuthContext()
	const { score, mode, setMode, advanceNextQuestionAfterCancelling, setQuestionsAfterCancelling } =
		useExamContext()
	const { user } = auth
	const [isClosed, setIsClosed] = useState(true)

	function previewLastQuestion(indexQuestion: number) {
		if (user && indexQuestion < user?.exam.current) {
		}
	}

	async function cancelExam() {
		toast.custom(t => (
			<DecitionToast
				t={t}
				text='Are you sure you want to cancel this exam?'
				afirmativeCallback={async () => {
					try {
						const { data } = await cancelExamRequest(
							auth.token || ""
						)

						if (data.statusCode === 204) {
							if (data.incorrectQuestions.length === 0) {
								return refreshUser()
							}

							toast.success(
								"Take a look of the incorrect answers",
								{
									id: t.id,
								}
							)
							setMode("PREVIEW")
							advanceNextQuestionAfterCancelling(
								data.incorrectQuestions
							)
						}
					} catch (error) {
						toast.error("Something went wrong... Try later", {
							id: t.id,
						})
					}
				}}
			/>
		))
	}

	return (
		<div className='py-6 px-5 sm:p-5 bg-slate-900/80 h-fit rounded-md border border-gray-100/10 shadow-md mb-6'>
			<div className='font-medium text-gray-300 text-normal'>
				<div className={`grid grid-cols-6 gap-2.5 mb-4`}>
					{user?.exam.questions.map((questionID, index) => (
						<>
							{isClosed ? (
								index > user.exam.current - 10 &&
								index < user.exam.current + 10 && (
									<span
										key={`Question:${index}:ID:${questionID}`}
										className={`flex items-center justify-center rounded-full border text-center w-8 h-8 ${
											index === user.exam.current
												? "border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"
												: user.exam.correctAnswers.includes(
														questionID
												  )
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
							) : (
								<button
									onClick={() => previewLastQuestion(index)}
									type='button'
									key={`Question:${index}:ID:${questionID}`}
									className={`flex items-center justify-center rounded-full border text-center w-8 h-8 ${
										index === user.exam.current
											? "border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"
											: user.exam.correctAnswers.includes(
													questionID
											  )
											? "border-emerald-100/20 bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100"
											: index < user.exam.current
											? "border-rose-100/20 bg-rose-700/50 hover:bg-rose-700/70 text-rose-100"
											: "border-slate-100/10 bg-slate-800 hover:bg-slate-700 text-slate-200"
									}
							`}
								>
									{index + 1}
								</button>
							)}
						</>
					))}
				</div>
				{user && user?.exam.questions.length > 19 && (
					<button
						onClick={() => setIsClosed(closed => !closed)}
						className={
							themeBtns.neutralBtn +
							` flex items-center gap-x-2 justify-center rounded-md px-3 py-2 mb-4 w-full`
						}
						type='button'
					>
						<p>
							{isClosed
								? "Show all questions"
								: "Show fewer questions"}
						</p>
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

				<SideBarElement>
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
							d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
						/>
					</svg>
					<h4>
						Correct questions{" "}
						<b>
							{score
								? score.toFixed(0)
								: user?.exam.score.toFixed(0)}
						</b>
						%
					</h4>
				</SideBarElement>
				<SideBarElement>
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
							d='M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z'
						/>
						<path d='M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z' />
					</svg>
					<p>
						Question <b>{(user?.exam.current || 0) + 1}</b> of{" "}
						<b>{user?.exam.questions.length}</b>
					</p>
				</SideBarElement>
				<SideBarElement>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path d='M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z' />
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z'
						/>
					</svg>
					<p>
						Started at{" "}
						<b>
							{formatDate.format(
								new Date(user?.exam.startedAt || "")
							)}
						</b>
					</p>
				</SideBarElement>
			</div>
			{mode === "LIVE" && (
				<button
					className={`flex justify-center items-center gap-2 py-2 px-3 border rounded-md mt-6 mb-1 w-full ${themeBtns.redBtn}`}
					type='button'
					onClick={cancelExam}
				>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path d='M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z' />
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zm5.22 1.72a.75.75 0 011.06 0L10 10.94l1.72-1.72a.75.75 0 111.06 1.06L11.06 12l1.72 1.72a.75.75 0 11-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 01-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 010-1.06z'
						/>
					</svg>
					End and review
				</button>
			)}
		</div>
	)
}
export default Sidebar
