import {
	ICBQQuestion,
	IECQQuestion,
	ISBAQuestion,
	QuestionType,
} from "../../../../../../interface/exam"
import DropdownQuestion from "./DropdownQuestion"
import ViewButton from "../ViewButton"

interface IProps {
	type: QuestionType
	content: unknown
}

function QuestionContent({ content, type }: IProps) {
	switch (type) {
		case "SBA": {
			let data: ISBAQuestion = content as ISBAQuestion

			return (
				<article className='flex flex-col gap-2 text-sm'>
					<h5>{data.question}</h5>
					<ul className='ml-5'>
						{data.options.map((option, index) => (
							<li
								className={`text-sm text-gray-400 list-disc ${
									index === data.answer - 1 &&
									"text-emerald-600 flex gap-1 items-center"
								}`}
								key={option + index}>
								{index === data.answer - 1 && (
									<svg
										className='w-4 text-emerald-600 -ml-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'>
										<path
											clipRule='evenodd'
											fillRule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
										/>
									</svg>
								)}
								{option}
							</li>
						))}
					</ul>
					<h6>Explanation</h6>
					<ViewButton content={data.explanation} />
				</article>
			)
		}

		case "CBQ": {
			let data: ICBQQuestion = content as ICBQQuestion

			return (
				<article className='flex flex-col gap-2 text-sm'>
					<h6>Questions</h6>
					<ul>
						{data.map(question => (
							<li key={question.answer + question.question}>
								<DropdownQuestion header={question.question}>
									<div className='flex flex-col gap-1'>
										<h6 className='text-gray-300'>
											{question.question}
										</h6>
										<ul className='ml-5'>
											{question.options.map(
												(option, index) => (
													<li
														className={`text-sm text-gray-400 list-disc ${
															index ===
																question.answer -
																	1 &&
															"text-emerald-600 flex gap-1 items-center"
														}`}
														key={option}>
														{index ===
															question.answer -
																1 && (
															<svg
																className='w-4 text-emerald-600 -ml-5'
																fill='currentColor'
																viewBox='0 0 20 20'
																xmlns='http://www.w3.org/2000/svg'
																aria-hidden='true'>
																<path
																	clipRule='evenodd'
																	fillRule='evenodd'
																	d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
																/>
															</svg>
														)}
														{option}
													</li>
												)
											)}
										</ul>
										<h6 className='mt-1'>Explanation</h6>
										<ViewButton
											content={question.explanation}
										/>
										<span className='mb-2'></span>
									</div>
								</DropdownQuestion>
							</li>
						))}
					</ul>
					<span className='flex items-center gap-2 text-sm text-gray-400'>
						<svg
							className='w-5'
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
							These questions are formed by <b>SBA Questions</b>
						</p>
					</span>
				</article>
			)
		}

		case "ECQ": {
			let data: IECQQuestion = content as IECQQuestion

			return (
				<article className='flex flex-col gap-2 text-sm'>
					<h6>Options</h6>
					<ul className='ml-5'>
						{data.options.map(option => (
							<li
								className={`text-sm text-gray-400 list-disc`}
								key={option}>
								{option}
							</li>
						))}
					</ul>
					<h6>Questions</h6>
					<ul className='flex flex-col gap-1.5'>
						{data.question.map(question => (
							<li key={question.answer + question.question}>
								<DropdownQuestion header={question.question}>
									<div className='flex flex-col'>
										<h6 className='text-gray-300'>
											{question.question}
										</h6>
										<p className='text-emerald-600 flex items-center gap-2'>
											<svg
												className='w-4'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'>
												<path
													clipRule='evenodd'
													fillRule='evenodd'
													d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
												/>
											</svg>
											{data.options[question.answer - 1]}
										</p>
									</div>
								</DropdownQuestion>
							</li>
						))}
					</ul>
					<h6>Explanation</h6>
					<ViewButton content={data.explanation} />
				</article>
			)
		}

		default:
			return <div className='text-red-500'>Unknown question content</div>
	}
}
export default QuestionContent
