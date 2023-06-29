import { IQuestion } from "../../../../interface/exam"

interface IProps {
	question: IQuestion
}

const CategoryHeader = ({ question }: IProps) => {
	return (
		<span className='text-sm text-gray-300'>
			Category - {!["None", "All"].includes(question.parent) ? <b>{question.parent}</b> : question.category}
		</span>
	)
}

export default CategoryHeader
