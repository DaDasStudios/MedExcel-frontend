import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import MarkdownBody from "../../../components/ui/MarkdownBody"
import Separator from "../../../components/ui/Separator"
import { useAuthContext } from "../../../context/auth/authContext"
import { useExamContext } from "../../../context/exam/examContext"
import { IQuestion, ISBAQuestion } from "../../../interface/exam"
import { submitAnswerRequest } from "../../../lib/exam.request"
import NextButton from "./ui/NextButton"

const SBAQuestion = () => {
	const { auth } = useAuthContext()
	const {
		currentQuestion,
		hasAnswered,
		questionResponse,
		setHasAnswered,
		setQuestionResponse,
		setScore,
	} = useExamContext()
	const [question, setQuestion] = useState(
		currentQuestion as IQuestion<ISBAQuestion>
	)
	const [selectedOption, setSelectedOption] = useState("")

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSelectedOption(e.target.value)
	}

	async function submitAnswer(e: FormEvent) {
		e.preventDefault()
		try {
			if (!selectedOption) return toast.error("First pick up an option")
			const payload = {
				answer: selectedOption,
			}
			const { data } = await submitAnswerRequest(
				payload,
				auth.token || ""
			)
			setHasAnswered(true)
			setQuestionResponse(data)
			setScore(data.score)

			if (data.status === "CORRECT") {
				return toast.success("Correct answer")
			}
			if (data.status === "INCORRECT") {
				return toast.error("Incorrect answer")
			}

			return toast.error("Something went wrong... Try later")
		} catch (error) {
			toast.error("Something went wrong when submitting the answer")
		}
	}

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium'>
			<span className='text-sm text-gray-300'>
				Category - <b>{question.category}</b>
			</span>
			<span className='text-sm text-gray-400 flex items-baseline gap-3'>
				<svg
					className='w-6 self-center'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
					/>
				</svg>
				<p>
					Answer the question based on the scenario presented below,
					just select an option and click on "Submit answer".
				</p>
			</span>
			<Separator />
			<MarkdownBody content={question.scenario} />
			<p className='text-gray-300'>{question.content.question}</p>
			<form onSubmit={submitAnswer}>
				<ol type='A' className='inline-flex flex-col mt-2 mb-1'>
					{question.content.options.map((option, index) => (
						<li
							className='list-[upper-latin] list-inside first:rounded-t-md last:rounded-b-md border border-gray-100/10 py-2 px-4'
							key={option + index}>
							<label
								className={`${
									hasAnswered
										? index ===
										  questionResponse.question.content
												.answer -
												1
											? "text-emerald-500"
											: "text-red-500"
										: "text-gray-300"
								}`}
								htmlFor={option + index}>
								{option}
								<input
									className={`ml-4`}
									type='radio'
									value={option}
									onChange={handleOnChange}
									id={option + index}
									name='optionSelected'
								/>
							</label>
						</li>
					))}
				</ol>
				{!hasAnswered && (
					<button
						type='submit'
						className='flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1'>
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
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

export default SBAQuestion
