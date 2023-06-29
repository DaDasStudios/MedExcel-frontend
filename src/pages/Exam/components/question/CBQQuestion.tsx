import { useState } from "react"
import { toast } from "react-hot-toast"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useAuthContext } from "../../../../context/auth/authContext"
import { useExamContext } from "../../../../context/exam/examContext"
import { ICBQQuestion, ISBAQuestion } from "../../../../interface/exam"
import { getCurrentQuestionRequest, submitAnswerRequest } from "../../../../lib/exam.request"
import ShortNextButton from "../ui/ShortNextButton"
import useExpiredPlanToast from "../../hooks/useExpiredPlanToast"
import CategoryHeader from "../ui/CategoryHeader"
import HelpBox from "../ui/HelpBox"
import CBQPagination from "../ui/CBQPagination"
import CBQOption from "../ui/CQBOption"
import CBQPaginationButtons from "./CBQPaginationButtons"

interface IScreenState {
	page: number
	cases: number
	currentQuestion: ISBAQuestion
}

const CBQQuestion = () => {
	const {
		useCurrentQuestion,
		hasAnswered,
		questionResponse,
		setHasAnswered,
		setQuestionResponse,
		setScore,
		setHasFinished,
		setScoresHistory,
		mode,
		advanceNextQuestionAfterCancelling,
	} = useExamContext()
	const { auth } = useAuthContext()

	const question = useCurrentQuestion<ICBQQuestion>()
	const [pageContent, setPageContent] = useState({
		page: 0,
		cases: question.content.length,
		currentQuestion: question.content[0],
	} as IScreenState)
	const [selectedOptions, setSelectedOptions] = useState<string[]>(new Array(question.content.length).fill(""))

	async function submitAnswers() {
		if (selectedOptions.some(singleSelectedOption => !singleSelectedOption))
			return toast.error("Pick up an option at every case")

		try {
			const payload = {
				answers: selectedOptions,
			}
			const { data } = await submitAnswerRequest(payload, auth.token || "")

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
		} catch (error: any) {
			if (error.response.status === 401) {
				useExpiredPlanToast()
			}

			toast.error("Something went wrong when submitting the answer")
		}
	}

	function handleSelectOption(e: React.ChangeEvent<HTMLInputElement>) {
		setSelectedOptions(prevSelectedOptions =>
			prevSelectedOptions.map((singleSelectedOption, selectedOptionsIndex) =>
				selectedOptionsIndex === pageContent.page ? e.target.value : singleSelectedOption
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

	async function handlePagination(indexAdvance: number) {
		const pageIndex = pageContent.page + indexAdvance

		if (pageIndex < 0) {
			return
		}

		if (!hasAnswered && pageIndex > pageContent.cases - 1) {
			return
		}

		if (hasAnswered && pageIndex === pageContent.cases + 1) {
			// ? Reload to fetch next question
			if (mode === "PREVIEW") {
				return advanceNextQuestionAfterCancelling()
			}
			if (await hasFinishedExam()) {
				setHasFinished(true)
				toast.success("Exam finished!")
			} else {
				return window.location.reload()
			}
		}

		setPageContent({
			...pageContent,
			page: pageIndex,
			currentQuestion: question.content[pageIndex],
		})
	}

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium relative'>
			{hasAnswered && <ShortNextButton />}
			<CategoryHeader question={question} />
			<HelpBox
				content='Answer the questions of the current case based on the scenario that appears below. Finally submit
					your answers to continue with the next question'
			/>
			<Separator />
			<div className='my-2'>
				<CBQPagination
					currPage={pageContent.page}
					cases={pageContent.cases}
					question={question}
					selectedOptions={selectedOptions}
				/>

				{/** EXPLANATION */}
				{pageContent.page === pageContent.cases ? (
					<article>
						<h3 className='text-sm font-medium mt-6 text-gray-200'>
							Go back to see the correct answers and see thier explanations over here.
						</h3>
						{questionResponse.question.content.map((question: ISBAQuestion, i: number) => (
							<div key={i + question.explanation}>
								<MarkdownBody content={question.explanation} />
							</div>
						))}
					</article>
				) : (
					<>
						{/** QUESTION CONTENT */}
						<div className='mt-4'>
							<MarkdownBody content={question.scenario} />
						</div>

						<div className='text-gray-300 mt-4 mb-2'>
							<MarkdownBody content={pageContent.currentQuestion.question} />
						</div>

						{/** OPTIONS */}
						<ol type='A' role='list' className='flex flex-col mt-2 mb-1'>
							{pageContent.currentQuestion.options.map((optionContent, optionIndex) => (
								<CBQOption
									key={`case:${pageContent.page}-option:${optionIndex}`}
									optionContent={optionContent}
									optionIndex={optionIndex}
									handleSelectOption={handleSelectOption}
									selectedOption={selectedOptions[pageContent.page]}
									currPage={pageContent.page}
								/>
							))}
						</ol>
					</>
				)}

				{/** PAGINATION BUTTONS */}
				<CBQPaginationButtons
					currPage={pageContent.page}
					cases={pageContent.cases}
					handlePagination={handlePagination}
					submitAnswers={submitAnswers}
				/>
			</div>
		</div>
	)
}
export default CBQQuestion
