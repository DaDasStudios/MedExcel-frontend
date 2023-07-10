import { useState } from "react"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useExamContext } from "../../../../context/exam/examContext"
import { ECQ, IQuestion, AnswerECQ } from "../../../../interface/exam"
import ShortNextButton from "../ui/ShortNextButton"
import HelpBox from "../ui/HelpBox"
import CategoryHeader from "../ui/CategoryHeader"
import NavigationButtons from "../ui/NavigationButtons"
import { toast } from "react-hot-toast"
import ECQSelect from "./ECQSelect"

interface IProps {
	question: IQuestion<ECQ>
}

const ECQQuestion = ({ question }: IProps) => {
	const { page, canAnswer, answersRecords, submitAnswer } = useExamContext()

	const [selectedOptions, setSelectedOptions] = useState<AnswerECQ>(() => {
		if (canAnswer) {
			return new Array(question.content.question.length).fill(question.content.options[0])
		} else {
			return answersRecords[page] as AnswerECQ
		}
	})

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()

		if (selectedOptions.some(singleSelectedOption => !singleSelectedOption)) {
			return toast.error("Pick up an option in each question")
		}

		submitAnswer(selectedOptions)
	}

	function handleOnChange(value: string, questionIndex: number) {
		if (!canAnswer) return

		setSelectedOptions(prevSelectedOptions =>
			prevSelectedOptions.map((selectedOption, index) => (index === questionIndex ? value : selectedOption))
		)
	}

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium relative'>
			{!canAnswer && <ShortNextButton />}
			<CategoryHeader question={question} />
			<HelpBox
				content='Each group of extenden matching questions consists of
					numbered options followed by a list of problems questions.
					For each problem question select one numbered option the
					most closely selectedOptions the question. You can use the same
					option more than once'
			/>
			<Separator />
			<p className='font-semibold'>Available options</p>
			<ul className='ml-5'>
				{question.content.options.map((option, index) => (
					<li className='list-decimal text-gray-300' key={index + option}>
						{option}
					</li>
				))}
			</ul>
			<MarkdownBody content={question.scenario} />
			<form onSubmit={onSubmit}>
				<ul className='ml-5 flex flex-col gap-3'>
					{question.content.question.map((subQuestion, i) => (
						<li key={`Question:${question._id}-subQuestion:${i}`} className='list-decimal'>
							<div className='flex flex-wrap sm:justify-between sm:items-center max-sm:flex-col gap-4'>
								<p>{subQuestion.question}</p>
								<ECQSelect
									question={question}
									subQuestion={subQuestion}
									index={i}
									selectedOption={selectedOptions[i]}
									handleOnChange={value => handleOnChange(value, i)}
								/>
							</div>
						</li>
					))}
				</ul>
				{!canAnswer && (
					<div className='mt-4'>
						<MarkdownBody content={question.content.explanation} />
					</div>
				)}
				<NavigationButtons />
			</form>
		</div>
	)
}
export default ECQQuestion
