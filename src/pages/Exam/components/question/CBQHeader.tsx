import { themeBtns } from "../../../../components/ui/Buttons/SolidButton"
import { useExamContext } from "../../../../context/exam/examContext"
import { CBQ, IQuestion } from "../../../../interface/exam"

interface IProps {
	question: IQuestion<CBQ>
	_page: number
	cases: number
}

const CBQHeader = ({ question, _page, cases }: IProps) => {
	const { page, canAnswer, answersRecords } = useExamContext()

	return (
		<div className='flex gap-2 items-center text-sm'>
			{question.content.map((_, caseIndex) => (
				<span
					key={`question-page:${caseIndex}`}
					className={`border shadow-md rounded-lg p-1 ${caseIndex === _page && "underline"} ${
						!canAnswer
							? answersRecords[page][caseIndex] ===
							  question.content[caseIndex].options[question.content[caseIndex].answer - 1]
								? themeBtns.greenBtn
								: themeBtns.redBtn
							: caseIndex === _page
							? "bg-blue-700/50 border-blue-100/10"
							: "bg-slate-700 border-gray-100/10"
					}`}
				>
					Q{caseIndex + 1}
				</span>
			))}
			<span
				className={`border shadow-md rounded-lg p-1 ${
					_page === cases ? "bg-blue-700/50 border-blue-100/10" : "bg-slate-700 border-gray-100/10"
				}`}
			>
				Summary
			</span>
		</div>
	)
}
export default CBQHeader
