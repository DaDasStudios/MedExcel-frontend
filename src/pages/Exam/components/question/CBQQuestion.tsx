import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { themeBtns } from "../../../../components/ui/Buttons/SolidButton"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useAuthContext } from "../../../../context/auth/authContext"
import { useExamContext } from "../../../../context/exam/examContext"
import {
	ICBQQuestion,
	IQuestion,
	ISBAQuestion,
} from "../../../../interface/exam"
import {
	getCurrentQuestionRequest,
	submitAnswerRequest,
} from "../../../../lib/exam.request"
import { toTitle } from "../../../../utils/string"

interface IScreenState {
	page: number
	cases: number
	currentQuestion: ISBAQuestion
}

const CBQQuestion = () => {
	const {
		currentQuestion,
		hasAnswered,
		questionResponse,
		setHasAnswered,
		setQuestionResponse,
		setScore,
		setHasFinished,
		setScoresHistory,
	} = useExamContext()
	const { auth } = useAuthContext()

	const [question, setQuestion] = useState(
		currentQuestion as IQuestion<ICBQQuestion>
	)
	const [screenOptions, setScreenOptions] = useState({
		page: 0,
		cases: question.content.length,
		currentQuestion: question.content[0],
	} as IScreenState)

	const [selectedOptions, setSelectedOptions] = useState(
		question.content.map(_ => "") as string[]
	)

	async function submitAnswers() {
		if (selectedOptions.some(singleSelectedOption => !singleSelectedOption))
			return toast.error("Pick up an option at every case")

		try {
			const payload = {
				answers: selectedOptions,
			}
			const { data } = await submitAnswerRequest(
				payload,
				auth.token || ""
			)

			setHasAnswered(true)
			setQuestionResponse(data)
			setScore(data.score)

			if (data.status === "CORRECT") {
				return toast.success("Correct answers")
			}
			if (data.status === "INCORRECT") {
				return toast.error("Incorrect answers")
			}
			if (data.status === "NOT ALL CORRECT") {
				return toast.error("Some answers were correct")
			}

			return toast.error("Something went wrong... Try later")
		} catch (error) {
			toast.error("Something went wrong when submitting the answer")
		}
	}

	function handleOnChange(
		e: React.ChangeEvent<HTMLInputElement>,
		caseIndex: number
	) {
		setSelectedOptions(
			selectedOptions.map((singleSelectedOption, selectedOptionsIndex) =>
				selectedOptionsIndex === caseIndex
					? e.target.value
					: singleSelectedOption
			)
		)
	}

	async function hasFinishedExam() {
		const res = await getCurrentQuestionRequest(auth?.token || "")
		if (res.data.status && res.data.status === "FINISHED") {
			setScoresHistory(res.data.record)
			return true
		}
		return false
	}

	async function handleChangeCase(indexAdvance: number) {
		const pageIndex = screenOptions.page + indexAdvance

		if (
			!hasAnswered &&
			(pageIndex < 0 || pageIndex > screenOptions.cases - 1)
		) {
			return
		}

		if (hasAnswered && pageIndex === screenOptions.cases + 1) {
			// ? Reload to fetch next question
			if (await hasFinishedExam()) {
				setHasFinished(true)
				toast.success("Exam finished!")
			} else {
				return window.location.reload()
			}
		}

		setScreenOptions({
			...screenOptions,
			page: pageIndex,
			currentQuestion: question.content[pageIndex],
		})
	}

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium'>
			<span className='text-sm text-gray-300'>
				Category -{" "}
				{!["None", "All"].includes(question.parent) && (
					<b>{question.parent} / </b>
				)}{" "}
				<b>{question.category}</b> /{" "}
				<b>{toTitle(question.topic || "No topic")}</b>
			</span>
			<span className='text-xs sm:text-sm text-gray-400 flex items-baseline gap-3'>
				<svg
					className='hidden sm:block w-8 self-center'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
					/>
				</svg>
				<p>
					Answer the questions of the current case based on the
					scenario that appears below. Finally submit your answers to
					continue with the next question.
				</p>
			</span>
			<Separator />
			<div className='my-2'>
				<div className='flex gap-2 items-center text-sm'>
					{question.content.map((_, caseIndex) => (
						<span
							key={caseIndex + caseIndex ** 2}
							className={`border shadow-md rounded-lg p-1 ${
								hasAnswered
									? questionResponse.question.content[
											caseIndex
									  ].answer -
											1 ===
									  question.content[
											caseIndex
									  ].options.indexOf(
											selectedOptions[caseIndex]
									  )
										? themeBtns.greenBtn
										: themeBtns.redBtn
									: caseIndex === screenOptions.page
									? "bg-blue-700/50 border-blue-100/10"
									: "bg-slate-700 border-gray-100/10"
							}`}
						>
							Q{caseIndex + 1}
						</span>
					))}
					<span
						className={`border  shadow-md rounded-lg p-1 ${
							screenOptions.page === screenOptions.cases
								? "bg-blue-700/50 border-blue-100/10"
								: "bg-slate-700 border-gray-100/10"
						}`}
					>
						Summary
					</span>
				</div>

				{screenOptions.page === screenOptions.cases ? (
					<div>
						<p className='text-sm font-medium mt-6 text-gray-200'>
							Go back to see the correct answers and see thier
							explanations over here.
						</p>
						{questionResponse.question.content.map(
							(question: ISBAQuestion, i: number) => (
								<div key={i + question.explanation}>
									<div>
										<MarkdownBody
											content={question.explanation}
										/>
									</div>
								</div>
							)
						)}
					</div>
				) : (
					<>
						<MarkdownBody content={question.scenario} />
						<p className='text-gray-300 mt-4 mb-2'>
							{question.content[screenOptions.page].question}
						</p>

						<ol type='A' className='inline-flex flex-col mt-2 mb-1'>
							{question.content[screenOptions.page].options.map(
								(option, optionIndex) => (
									<li
										className='list-[upper-latin] list-inside first:rounded-t-md last:rounded-b-md border border-gray-100/10 py-2 px-4'
										key={option + optionIndex}
									>
										<label
											className={`${
												hasAnswered
													? optionIndex ===
													  questionResponse.question
															.content[
															screenOptions.page
													  ].answer -
															1
														? "text-emerald-500"
														: "text-red-500"
													: "text-gray-300"
											}`}
											htmlFor={option + optionIndex}
										>
											{option}
											<input
												className={`ml-4`}
												type='radio'
												value={option}
												checked={
													selectedOptions[
														screenOptions.page
													] === option
												}
												onChange={e =>
													handleOnChange(
														e,
														screenOptions.page
													)
												}
												id={option + optionIndex}
												name='optionSelected'
											/>
										</label>
									</li>
								)
							)}
						</ol>
					</>
				)}

				<div className='flex justify-between mt-4 gap-1'>
					<button
						onClick={() => {
							handleChangeCase(-1)
						}}
						className={`flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 ${
							screenOptions.page === 0
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
							handleChangeCase(1)
							if (
								!hasAnswered &&
								screenOptions.page === screenOptions.cases - 1
							) {
								submitAnswers()
							}
						}}
						className='flex items-center gap-2 py-2 px-3 border rounded-md mt-3 mb-1 border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50'
						type='button'
					>
						{screenOptions.page === screenOptions.cases - 1 ? (
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
									<p className='hidden sm:block'>
										Submit answer
									</p>
									<p className='block sm:hidden'>Submit</p>
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
			</div>
		</div>
	)
}
export default CBQQuestion
