import { themeBtns } from "../../../../components/ui/Buttons/SolidButton"
import { useExamContext } from "../../../../context/exam/examContext"
import { ICBQQuestion, IQuestion } from "../../../../interface/exam"

interface IProps {
    question: IQuestion<ICBQQuestion>
    currPage: number
    cases: number
    selectedOptions: string[]
}

const CBQPagination = ({ question, currPage, cases, selectedOptions }: IProps) => {
	const { hasAnswered, questionResponse } = useExamContext()
	return (
		<div className='flex gap-2 items-center text-sm'>
			{question.content.map((_, caseIndex) => (
				<span
					key={`question-page:${caseIndex}`}
					className={`border shadow-md rounded-lg p-1 ${caseIndex === currPage && "underline"} ${
						hasAnswered
							? questionResponse.question.content[caseIndex].answer - 1 ===
							  question.content[caseIndex].options.indexOf(selectedOptions[caseIndex])
								? themeBtns.greenBtn
								: themeBtns.redBtn
							: caseIndex === currPage
							? "bg-blue-700/50 border-blue-100/10"
							: "bg-slate-700 border-gray-100/10"
					}`}
				>
					Q{caseIndex + 1}
				</span>
			))}
			<span
				className={`border  shadow-md rounded-lg p-1 ${
					currPage === cases ? "bg-blue-700/50 border-blue-100/10" : "bg-slate-700 border-gray-100/10"
				}`}
			>
				Summary
			</span>
		</div>
	)
}
export default CBQPagination