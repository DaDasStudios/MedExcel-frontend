import { useId } from "react"
import { SimpleInput, TextArea } from "./Input"
import Tooltip from "../../../../../../components/ui/Tooltip"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"

const SBAQuetion = () => {
	const {
		questionForm: { SBAContent: content, setSBAContent: setContent },
	} = useExamsAdminContext()
	const id = useId()

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

	return (
		<>
			<SimpleInput
				id='question'
				label='Question'
				name='question'
				placeholder='The question body'
				value={content.question}
				onChange={e =>
					setContent({ ...content, question: e.target.value })
				}
			/>
			<TextArea
				id='explanation'
				name='explanation'
				label='Explanation'
				value={content.explanation}
				setValues={setContent}
				placeholder='Just give an explanation to show once the question is answered, can be written with Markdown'
			/>
			<h4 className='tracking-tight mb-2'>Options</h4>
			{content.options.map((_, index) => (
				<div
					className='flex items-center gap-2'
					key={id + index}>
					<Tooltip message='Alternate'>
						<button
							type='button'
							className={`p-1 rounded-md hover:bg-gray-700 ${
								content.answer === index
									? "text-emerald-500"
									: "text-red-500"
							}`}
							onClick={() => {
								setContent({ ...content, answer: index })
							}}>
							{content.answer === index ? (
								<svg
									className='w-5'
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
							) : (
								<svg
									className='w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
								</svg>
							)}
						</button>
					</Tooltip>
					<SimpleInput
						label=''
						id={id + index}
						name=''
						className='w-[250px]'
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
		</>
	)
}
export default SBAQuetion
