import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import Separator from "../../../../../../components/ui/Separator"
import {
	ICBQQuestion,
	IECQQuestion,
	IQuestion,
	ISBAQuestion,
	QuestionType,
} from "../../../../../../interface/exam"
import remarkGfm from "remark-gfm"
import CBQQuestion from "./CBQQuestion"

interface IProps {
	type: QuestionType
	question: unknown
}

const QuestionPreview = ({ question, type }: IProps) => {
	switch (type) {
		case "SBA": {
			let data: IQuestion<ISBAQuestion> =
				question as IQuestion<ISBAQuestion>
			return (
				<>
					<span className='text-sm text-gray-300'>
						Category - <b>{data.category}</b>
					</span>
					<Separator />
					<div>
						<ReactMarkdown
							children={data.scenario}
							remarkPlugins={[remarkGfm]}
						/>
					</div>
					<p className='text-gray-300'>{data.content.question}</p>
					<form>
						<div className='inline-flex flex-col mt-2 mb-1'>
							{data.content.options.map((option, index) => (
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
									d='M18 5.25a2.25 2.25 0 00-2.012-2.238A2.25 2.25 0 0013.75 1h-1.5a2.25 2.25 0 00-2.238 2.012c-.875.092-1.6.686-1.884 1.488H11A2.5 2.5 0 0113.5 7v7h2.25A2.25 2.25 0 0018 11.75v-6.5zM12.25 2.5a.75.75 0 00-.75.75v.25h3v-.25a.75.75 0 00-.75-.75h-1.5z'
								/>
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									d='M3 6a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1H3zm6.874 4.166a.75.75 0 10-1.248-.832l-2.493 3.739-.853-.853a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.154-.114l3-4.5z'
								/>
							</svg>
							Answer
						</button>
					</form>
					<h5 className='text-sm text-blue-500 mt-2'>
						Explanation after answering
					</h5>
					<div>
						<ReactMarkdown
							children={data.content.explanation}
							remarkPlugins={[remarkGfm]}
						/>
					</div>
				</>
			)
		}

		case "ECQ": {
			let data: IQuestion<IECQQuestion> =
				question as IQuestion<IECQQuestion>
			return (
				<>
					<span className='text-sm text-gray-300'>
						Category - <b>{data.category}</b>
					</span>
					<span className='text-sm text-gray-400 flex items-baseline gap-3'>
						<svg
							className='w-12 self-center'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
							/>
						</svg>
						<p>
							Each group of extenden matching questions consists
							of numbered options followed by a list of problems
							questions. For each problem question select one
							numbered option the most closely answers the
							question. You can use the same option more than
							once.
						</p>
					</span>
					<Separator />
					<p>Available options</p>
					<ul className='ml-5'>
						{data.content.options.map((option, index) => (
							<li
								className='list-decimal text-gray-300'
								key={index + option}>
								{option}
							</li>
						))}
					</ul>
					<div className='mt-2'>
						<ReactMarkdown
							children={data.scenario}
							remarkPlugins={[remarkGfm]}
						/>
					</div>
					<form>
						<ul className='ml-5 flex flex-col gap-2'>
							{data.content.question.map((question, i) => (
								<li key={question.question + i} className='list-decimal'>
									<div className='flex gap-2'>
										<p className=''>{question.question}</p>
										<label
											key={question.question + i}
											className=''
											htmlFor={question.question + i}>
											<select
												className='bg-slate-700 rounded-md outline-none border border-gray-100/10 text-slate-300'
												name={"question " + i}
												id={question.question + i}>
												{data.content.options.map(
													(option, j) => (
														<option
															key={option + j}
															value={j + 1}>
															{option}
														</option>
													)
												)}
											</select>
										</label>
									</div>
								</li>
							))}
						</ul>
						<button
							className='flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-3 mb-1'
							type='button'>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'>
								<path d='M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z' />
							</svg>
							Check
						</button>
					</form>
					<h5 className='text-sm text-blue-500 mt-2'>
						Explanation after answering
					</h5>
					<div>
						<ReactMarkdown
							children={data.content.explanation}
							remarkPlugins={[remarkGfm]}
						/>
					</div>
				</>
			)
		}

		case "CBQ": {
			let data: IQuestion<ICBQQuestion> =
				question as IQuestion<ICBQQuestion>

			return (
				<>
					<span className='text-sm text-gray-300'>
						Category - <b>{data.category}</b>
					</span>
					<span className='text-sm text-gray-400 flex items-baseline gap-3'>
						<svg
							className='w-6 self-center'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
							/>
						</svg>
						<p>
							Answer the question based on the below scenario,
							once you answer the asked question then you can
							continue with the next one.
						</p>
					</span>
					<Separator />
					<div className='mt-2'>
						<ReactMarkdown
							children={data.scenario}
							remarkPlugins={[remarkGfm]}
						/>
					</div>
					<CBQQuestion data={data}/>
				</>
			)
		}
		default:
			return <div className='text-red-500'>Unknown question content</div>
	}
}
export default QuestionPreview
