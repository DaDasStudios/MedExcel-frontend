import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useAuthContext } from "../../../../context/auth/authContext"
import { useExamContext } from "../../../../context/exam/examContext"
import { ISBAQuestion } from "../../../../interface/exam"
import { submitAnswerRequest } from "../../../../lib/exam.request"
import NextButton from "../ui/NextButton"
import ShortNextButton from "../ui/ShortNextButton"
import useExpiredPlanToast from "../../hooks/useExpiredPlanToast"
import SBAOption from "../ui/SBAOption"
import CategoryHeader from "../ui/CategoryHeader"
import HelpBox from "../ui/HelpBox"
import SubmitButton from "../ui/SubmitButton"

const SBAQuestion = () => {
	const { auth } = useAuthContext()
	const { useCurrentQuestion, hasAnswered, questionResponse, setHasAnswered, setQuestionResponse, setScore, mode } =
		useExamContext()
	const question = useCurrentQuestion<ISBAQuestion>()

	const [selectedOption, setSelectedOption] = useState("")
	const [excludedOptions, setExcludedOptions] = useState<Array<boolean>>(
		new Array(question.content.options.length).fill(false)
	)

	function handleSelectOption(e: React.ChangeEvent<HTMLInputElement>) {
		setSelectedOption(e.target.value)
	}

	function toggleExcludeOption(index: number) {
		setExcludedOptions(prevExcludedOptions => prevExcludedOptions.map((value, i) => (i === index ? !value : value)))
	}

	async function submitAnswer(e: FormEvent) {
		e.preventDefault()
		try {
			if (!selectedOption) return toast.error("First pick up an option")
			const payload = {
				answer: selectedOption,
			}
			const { data } = await submitAnswerRequest(payload, auth.token || "")
			setHasAnswered(true)
			setQuestionResponse(data)
			setScore(data.score)
			setExcludedOptions(excludedOptions.fill(false))

			if (data.status === "CORRECT") {
				return toast.success("Correct answer")
			}
			if (data.status === "INCORRECT") {
				return toast.error("Incorrect answer")
			}

			return toast.error("Something went wrong... Try later")
		} catch (error: any) {
			if (error.response.status === 401) {
				useExpiredPlanToast()
			}

			toast.error("Something went wrong when submitting the answer")
		}
	}

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium relative'>
			{hasAnswered && <ShortNextButton />}
			<CategoryHeader question={question} />
			<HelpBox
				content='Answer the question based on the scenario presented below, just select an option and click on
					"Submit answer"'
			/>
			<Separator />
			<MarkdownBody content={question.scenario} />
			<MarkdownBody content={question.content.question} />
			<form onSubmit={submitAnswer}>
				<ol type='A' role='list' className='flex flex-col mt-2 mb-1 '>
					{question.content.options.map((option, index) => (
						<SBAOption
							key={`option:${index}`}
							optionIndex={index}
							optionContent={option}
							isExcluded={excludedOptions[index]}
							excludedOptions={excludedOptions}
							selectedOption={selectedOption}
							toggleExcludeOption={toggleExcludeOption}
							handleSelectOption={handleSelectOption}
						/>
					))}
				</ol>
				{!hasAnswered && <SubmitButton />}
			</form>
			{hasAnswered && (
				<>
					<MarkdownBody content={questionResponse.question.content.explanation} />
					<NextButton />
				</>
			)}
		</div>
	)
}

export default SBAQuestion
