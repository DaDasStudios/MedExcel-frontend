import { useEffect } from "react"
import { useQuestionReviewContext } from "../../../../context/admin/reviewsContext"
import Spin from "../../../../components/ui/Spin"
import { toTitle } from "../../../../utils/string"
import { formatDate } from "../../../../utils/date"

interface IProps {
	id: string
}

const QuestionInfo = ({ id }: IProps) => {
	const { question, fetchQuestion } = useQuestionReviewContext()

	useEffect(() => {
		fetchQuestion(id)
	}, [])

	if (question === undefined) {
		return (
			<div className='flex flex-col items-center gap-y-3'>
				<h3>Loading question...</h3>
				<Spin></Spin>
			</div>
		)
	}

	if (question === null) {
		return (
			<div className='flex flex-col items-center gap-y-3 text-center'>
				<h3 className='text-gray-300'>
					Ups... Something went wrong{" "}
					<svg
						className='inline ml-1 w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 16zm-3.536-3.475a.75.75 0 001.061 0 3.5 3.5 0 014.95 0 .75.75 0 101.06-1.06 5 5 0 00-7.07 0 .75.75 0 000 1.06zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z'
						/>
					</svg>
				</h3>
				<p className='text-gray-400'>
					The question identified with the{" "}
					<span className='text-gray-300 font-semibold'>{id}</span> ID
					couldn't be fetched
				</p>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-3'>
			<h1 className='font-semibold text-gray-200 text-center text-lg'>
				Question information
			</h1>
			<p>ID: {question._id}</p>
			<p>Type: {question.topic}</p>
			<p>
				Parent category:{" "}
				<span className='font-semibold'>
					{toTitle(question.parent)}
				</span>
			</p>
			<p>
				Category:{" "}
				<span className='font-semibold'>
					{toTitle(question.category)}
				</span>
			</p>
			<p>
				Topic:{" "}
				<span className='font-semibold'>
					{toTitle(question.topic ? question.topic : "No topic")}
				</span>
			</p>
			<p>Created at: {formatDate.format(new Date(question.createdAt))}</p>
			<p>Updated at: {formatDate.format(new Date(question.updatedAt))}</p>
		</div>
	)
}
export default QuestionInfo
