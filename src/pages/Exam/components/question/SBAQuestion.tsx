import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useExamContext } from "../../../../context/exam/examContext"
import { IQuestion, SBA } from "../../../../interface/exam"
import ShortNextButton from "../ui/ShortNextButton"
import SBAOption from "./SBAOption"
import CategoryHeader from "../ui/CategoryHeader"
import HelpBox from "../ui/HelpBox"
import NavigationButtons from "../ui/NavigationButtons"

interface IProps {
	question: IQuestion<SBA>
}

const SBAQuestion = ({ question }: IProps) => {
	const { canAnswer, submitAnswer } = useExamContext()

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

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		if (!selectedOption) return toast.error("First pick up an option")

		submitAnswer(selectedOption)
		setExcludedOptions(excludedOptions.fill(false))
	}

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium relative'>
			{!canAnswer && <ShortNextButton />}
			<CategoryHeader question={question} />
			<HelpBox
				content='Answer the question based on the scenario presented below, just select an option and click on
					"Submit answer"'
			/>
			<Separator />
			<MarkdownBody content={question.scenario} />
			<MarkdownBody content={question.content.question} />
			<form onSubmit={onSubmit}>
				<ol type='A' role='list' className='flex flex-col mt-2 mb-1 '>
					{question.content.options.map((option, index) => (
						<SBAOption
							key={`option:${index}`}
							optionIndex={index}
							optionContent={option}
							isExcluded={excludedOptions[index]}
							excludedOptions={excludedOptions}
							toggleExcludeOption={toggleExcludeOption}
							handleSelectOption={handleSelectOption}
							question={question}
						/>
					))}
				</ol>
				{!canAnswer && <MarkdownBody content={question.content.explanation} />}
				<NavigationButtons />
			</form>
		</div>
	)
}

export default SBAQuestion
