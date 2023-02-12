import { useId } from "react"
import { SimpleInput, SimpleSelect, TextArea } from "./Input"
import Tooltip from "../../../../../../components/ui/Tooltip"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"

const ECQQuestion = () => {
	const id = useId()
	const {
		questionForm: { ECQContent: content, setECQContent: setContent },
	} = useExamsAdminContext()

	function addOption() {
		setContent({ ...content, options: [...content.options, ""] })
	}

	function removeOption() {
		setContent({
			...content,
			options: content.options.filter(
				(_, i) => i !== content.options.length - 1
			),
		})
	}

	function addQuestion() {
		setContent({
			...content,
			question: [...content.question, { answer: 0, question: "" }],
		})
	}

	function removeQuestion() {
		setContent({
			...content,
			question: content.question.filter(
				(_, i) => i !== content.question.length - 1
			),
		})
	}

	return (
		<>
			<TextArea
				id='explanation'
				name='explanation'
				label='Explanation'
				value={content.explanation}
				setValues={setContent}
				placeholder='Just give an explanation to show once the question is answered, can be written with Markdown'
			/>
			<div>
				<h4 className='tracking-tight mb-2'>Options</h4>
				{content.options.map((_, index) => (
					<div
						className='flex items-center gap-2'
						key={id + index}>
						<SimpleInput
							label=''
							id={id + index}
							name=''
							value={content.options[index]}
							placeholder='The option content'
							onChange={e => {
								setContent({
									...content,
									options: content.options.map((option, i) =>
										i === index ? e.target.value : option
									),
								})
							}}
						/>
					</div>
				))}

				<div className='flex justify-end'>
					<Tooltip message='Add option'>
						<button
							onClick={addOption}
							type='button'
							className='outline-none p-1 hover:bg-gray-700 text-gray-300 rounded-md'>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'>
								<path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
							</svg>
						</button>
					</Tooltip>
					{content.options.length > 2 && (
						<Tooltip message='Remove last option'>
							<button
								onClick={removeOption}
								type='button'
								className='outline-none p-1 hover:bg-gray-700 text-gray-300 rounded-md'>
								<svg
									className='w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z'
									/>
								</svg>
							</button>
						</Tooltip>
					)}
				</div>
			</div>
			<div>
				<div className='grid grid-cols-2 gap-3'>
					<h4 className='tracking-tight mb-2'>Questions</h4>
					<h4 className='tracking-tight mb-2'>Answers</h4>
				</div>
				{content.question.map((_, index) => (
					<div
						className='grid grid-cols-2 gap-3'
						key={id + index}>
						<SimpleInput
							label=''
							id={id + index}
							name=''
							value={content.question[index].question}
							placeholder='The question body'
							onChange={e => {
								setContent({
									...content,
									question: content.question.map((q, i) =>
										i !== index
											? q
											: {
													...q,
													question: e.target.value,
											  }
									),
								})
							}}
						/>
						<SimpleSelect
							id={"questionanswers" + index}
							label=''
							name={"questionanswers" + index}
							value={
								content.options[content.question[index].answer]
							}
							onChange={e => {
								const optionsIndex = content.options.findIndex(
									v => v === e.target.value
								)
								setContent({
									...content,
									question: content.question.map((q, i) =>
										i === index
											? { ...q, answer: optionsIndex }
											: q
									),
								})
							}}>
							{content.options.map((option, i) => (
								<option
									key={option + i}
									value={option}>
									{option}
								</option>
							))}
						</SimpleSelect>
					</div>
				))}
				<div className='flex justify-end'>
					<Tooltip message='Add question'>
						<button
							onClick={addQuestion}
							type='button'
							className='outline-none p-1 hover:bg-gray-700 text-gray-300 rounded-md'>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'>
								<path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
							</svg>
						</button>
					</Tooltip>
					{content.question.length > 1 && (
						<Tooltip message='Remove last question'>
							<button
								onClick={removeQuestion}
								type='button'
								className='outline-none p-1 hover:bg-gray-700 text-gray-300 rounded-md'>
								<svg
									className='w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z'
									/>
								</svg>
							</button>
						</Tooltip>
					)}
				</div>
			</div>
		</>
	)
}
export default ECQQuestion
