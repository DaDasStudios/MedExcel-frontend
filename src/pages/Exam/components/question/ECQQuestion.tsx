import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { themeBtns } from "../../../../components/ui/Buttons/SolidButton"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useAuthContext } from "../../../../context/auth/authContext"
import { useExamContext } from "../../../../context/exam/examContext"
import { IECQQuestion, IQuestion } from "../../../../interface/exam"
import { submitAnswerRequest } from "../../../../lib/exam.request"
import NextButton from "../ui/NextButton"
import ShortNextButton from "../ui/ShortNextButton"

const ECQQuestion = () => {
	const { auth } = useAuthContext()
	const {
		useCurrentQuestion,
		questionResponse,
		setQuestionResponse,
		setScore,
		hasAnswered,
		setHasAnswered,
	} = useExamContext()

	const question = useCurrentQuestion<IECQQuestion>()
	const [answers, setAnswers] = useState([] as (number | string)[])

	async function submitAnswer(e: React.FormEvent) {
		e.preventDefault()
		try {
			const payload = {
				answers: answers.map(
					answerIndex =>
						question.content.options[answerIndex as number]
				),
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
		selectIndex: number,
		e: React.ChangeEvent<HTMLSelectElement>
	) {
		setAnswers(
			answers.map((answer, answerIndex) =>
				selectIndex === answerIndex ? e.target.value : answer
			)
		)
	}

	useEffect(() => {
		const tempAnswers = []
		for (let i = 0; i < question.content.question.length; i++) {
			tempAnswers.push(i)
		}
		setAnswers(tempAnswers)
	}, [question])

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium relative'>
			{hasAnswered && <ShortNextButton />}
			<span className='text-sm text-gray-300'>
				Category -{" "}
				{!["None", "All"].includes(question.parent) ? (
					<b>{question.parent}</b>
				) : (
					question.category
				)}
			</span>
			<span className='text-xs sm:text-sm text-gray-400 flex items-baseline gap-3'>
				<svg
					className='hidden sm:block w-12 self-center'
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
					Each group of extenden matching questions consists of
					numbered options followed by a list of problems questions.
					For each problem question select one numbered option the
					most closely answers the question. You can use the same
					option more than once.
				</p>
			</span>
			<Separator />
			<p className='font-semibold'>Available options</p>
			<ul className='ml-5'>
				{question.content.options.map((option, index) => (
					<li
						className='list-decimal text-gray-300'
						key={index + option}
					>
						{option}
					</li>
				))}
			</ul>
			<MarkdownBody content={question.scenario} />
			<form onSubmit={submitAnswer}>
				<ul className='ml-5 flex flex-col gap-3'>
					{question.content.question.map((eachSubQuestion, i) => (
						<li
							key={eachSubQuestion.question + i}
							className='list-decimal'
						>
							<div className='flex max-sm:flex-col gap-4'>
								<p>{eachSubQuestion.question}</p>
								<label
									key={eachSubQuestion.question + i}
									className={`${hasAnswered && "correct"}`}
									htmlFor={eachSubQuestion.question + i}
								>
									<select
										onChange={e => handleOnChange(i, e)}
										value={answers[i]}
										className={`rounded-md max-w-min outline-none border ${
											hasAnswered
												? answers[i] ==
												  questionResponse.question
														.content.question[i]
														.answer -
														1
													? themeBtns.greenBtn
													: themeBtns.redBtn
												: "border-gray-100/10 bg-slate-700"
										}`}
										name={"question " + i}
										id={eachSubQuestion.question + i}
									>
										{question.content.options.map(
											(option, j) => (
												<option
													key={option + j}
													value={j}
												>
													{option}
												</option>
											)
										)}
									</select>
								</label>
							</div>
						</li>
					))}
				</ul>
				{!hasAnswered && (
					<button
						type='submit'
						className='flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1 max-sm:mx-auto'
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
						Submit answer
					</button>
				)}
			</form>
			{hasAnswered && (
				<>
					<MarkdownBody
						content={questionResponse.question.content.explanation}
					/>
					<NextButton />
				</>
			)}
		</div>
	)
}
export default ECQQuestion
