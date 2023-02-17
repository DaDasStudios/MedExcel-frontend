import {
	ICBQQuestion,
	IQuestion,
	ISBAQuestion,
} from "../../../../../../interface/exam"
import { useState } from "react"
import MarkdownBody from "../../../../../../components/ui/MarkdownBody"

interface IProps {
	data: IQuestion<ICBQQuestion>
}

const CBQQuestion = ({ data }: IProps) => {
	const [current, setCurrent] = useState(0)

	const currentQuestion = data.content.find(
		(_, index) => index === current
	) as ISBAQuestion

	return (
		<>
			<div className='my-2'>
				<div className='flex gap-2 items-center text-sm'>
					{data.content.map((_, i) => (
						<span
							key={i + i**2}
							className={` border shadow-md rounded-lg p-1 ${
								i === current
									? "bg-blue-700/50 border-blue-100/10"
									: "bg-slate-700 border-gray-100/10"
							}`}>
							Q{i + 1}
						</span>
					))}
					<span
						className={`border  shadow-md rounded-lg p-1 ${
							current === data.content.length
								? "bg-blue-700/50 border-blue-100/10"
								: "bg-slate-700 border-gray-100/10"
						}`}>
						Summary
					</span>
				</div>
			</div>
			{current === data.content.length ? (
				<div>
                    <p className="text-sm text-gray-400">Here's going to be shown up which questions were answered correctly or wrong  </p>
					{data.content.map((question, i) => (
						<div key={i + question.explanation}>
							<h5 className='text-sm text-blue-500 mt-4 mb-3'>
								Explanation of the <span className="text-blue-500">question {i + 1}</span>
							</h5>
							<div>
								<MarkdownBody content={question.explanation}/>
							</div>
						</div>
					))}
				</div>
			) : (
				<div>
					<p className='text-gray-100'>{currentQuestion.question}</p>
					<div className='inline-flex flex-col mt-4 mb-1'>
						{currentQuestion.options.map((option, index) => (
							<label
								key={option + index}
								className='first:rounded-t-md last:rounded-b-md border border-gray-100/10 py-2 text-gray-300 px-4'
								htmlFor={option + index}>
								<input
									className='mr-4'
									type='radio'
									value={index + 1}
									id={option + index}
									name='answer'
								/>
								{option}
							</label>
						))}
					</div>
					<button
						onClick={() => {
							if (current === data.content.length) {
								// * Submit question
							}
							setCurrent(current + 1)
						}}
						className='flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-3 mb-1'
						type='button'>
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
							/>
						</svg>
						Next
					</button>
				</div>
			)}
		</>
	)
}
export default CBQQuestion
