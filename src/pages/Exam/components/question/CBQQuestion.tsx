import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import MarkdownBody from "../../../../components/ui/MarkdownBody"
import Separator from "../../../../components/ui/Separator"
import { useExamContext } from "../../../../context/exam/examContext"
import { AnswerCBQ, CBQ, IQuestion, SBAContent } from "../../../../interface/exam"
import ShortNextButton from "../ui/ShortNextButton"
import CategoryHeader from "../ui/CategoryHeader"
import HelpBox from "../ui/HelpBox"
import Header from "./CBQHeader"
import CBQOption from "./CQBOption"
import CBQPaginationButtons from "./CBQPaginationButtons"
import NavigationButtons from "../ui/NavigationButtons"

interface IProps {
	question: IQuestion<CBQ>
}

const CBQQuestion = ({ question }: IProps) => {
	const { page, canAnswer, answersRecords, currQuestion, submitAnswer } = useExamContext()
	const [_page, setPage] = useState(0)
	const currentQuestion = question.content[_page >= question.content.length ? 0 : _page]
	const cases = question.content.length

	const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
		if (canAnswer) {
			return new Array(question.content.length).fill("")
		} else {
			return answersRecords[page] as AnswerCBQ
		}
	})

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (selectedOptions.some(singleSelectedOption => !singleSelectedOption)) {
			return toast.error("Pick up an option at every case")
		}

		submitAnswer(selectedOptions)
	}

	function handleSelectOption(e: React.ChangeEvent<HTMLInputElement>) {
		setSelectedOptions(prevSelectedOptions =>
			prevSelectedOptions.map((selectionOption, index) => (index === _page ? e.target.value : selectionOption))
		)
	}

	async function handlePagination(step: number) {
		const pageIndex = _page + step

		if (pageIndex < 0) {
			return
		}

		if (canAnswer && pageIndex > cases - 1) {
			return
		}

		setPage(pageIndex)
	}

	useEffect(() => {
		setPage(0)
	}, [currQuestion])

	return (
		<div className='flex flex-col gap-3 text-gray-200 font-medium relative'>
			{!canAnswer && <ShortNextButton />}
			<CategoryHeader question={question} />
			<HelpBox
				content='Answer the questions of the current case based on the scenario that appears below. Finally submit
					your answers to continue with the next question'
			/>
			<Separator />
			<form onSubmit={onSubmit} className='my-2'>
				<Header _page={_page} cases={cases} question={question} />

				{/** EXPLANATION */}
				{_page === cases && !canAnswer ? (
					<article>
						<h3 className='text-sm font-medium mt-6 text-gray-200 mb-4'>
							Go back to see the correct answers and see thier explanations over here.
						</h3>
						{question.content.map((question: SBAContent, i: number) => (
							<div key={`Explanation:${i}`}>
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
							<MarkdownBody content={currentQuestion.question} />
						</div>

						{/** OPTIONS */}
						<ol type='A' role='list' className='flex flex-col mt-2 mb-1'>
							{currentQuestion.options.map((optionContent, optionIndex) => (
								<CBQOption
									question={question}
									key={`case:${_page}-option:${optionIndex}`}
									optionContent={optionContent}
									optionIndex={optionIndex}
									handleSelectOption={handleSelectOption}
									_page={_page}
									selectedOptions={selectedOptions}
								/>
							))}
						</ol>
					</>
				)}

				{/** PAGINATION BUTTONS */}
				<CBQPaginationButtons _page={_page} cases={cases} handlePagination={handlePagination} />
				<NavigationButtons />
			</form>
		</div>
	)
}
export default CBQQuestion
