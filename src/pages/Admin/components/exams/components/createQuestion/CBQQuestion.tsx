import { useId } from "react"
import { SimpleInput, TextArea } from "./Input"
import Tooltip from "../../../../../../components/ui/Tooltip"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import { SBAContent } from "../../../../../../interface/exam"
import SolidButton, { themeBtns } from "../../../../../../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../../../../../../interface"

const CBQQUestion = () => {
	const {
		questionForm: { CBQContent: content, setCBQContent: setContent },
	} = useExamsAdminContext()
	const id = useId()

	function addCase() {
		setContent([
			...content,
			{
				answer: 0,
				explanation: "",
				options: ["", ""],
				question: "",
			},
		])
	}

	function removeCase() {
		setContent(content.filter((_, index) => index === content.length - 1))
	}

	function setQuestionExplanation(
		stateAction: (value: any) => SBAContent,
		index: number
	) {
		const res = stateAction(content[index])
		setContent(content.map((q, i) => (i === index ? res : q)))
	}

	function addOption(caseIndex: number) {
		const newOptions = [...content[caseIndex].options, ""]
		setContent(
			content.map((c, i) =>
				i === caseIndex ? { ...c, options: newOptions } : c
			)
		)
	}

	function removeOption(caseIndex: number) {
        const newOptions = content[caseIndex].options.filter((_, i) => i !== content[caseIndex].options.length - 1)
        setContent(
			content.map((c, i) =>
				i === caseIndex ? { ...c, options: newOptions } : c
			)
		)
    }

	return (
		<>
			<div className='max-h-[500px] overflow-y-auto pr-3'>
				{content.map((_, index) => (
					<div key={id + index}>
						<TextArea
							id={"question" + index}
							label={`Case ${index + 1} - Question`}
							name={"question" + index}
							placeholder='The question body, support for markdown syntax'
							value={content[index].question}
							onChange={e =>
								setContent(
									content.map((c, i) =>
										i !== index
											? c
											: { ...c, question: e.target.value }
									)
								)
							}
						/>
						<TextArea
							id={"explanation" + index}
							name='explanation'
							label='Explanation'
							value={content[index].explanation}
							setValues={values =>
								setQuestionExplanation(values, index)
							}
							placeholder='Just give an explanation to show once the question is answered, can be written with Markdown'
						/>
						<h4 className='tracking-tight mb-2'>Options</h4>
						{content[index].options.map((_, i) => (
							<div
								className='flex items-center gap-2'
								key={id + i}
							>
								<Tooltip message='Alternate'>
									<button
										type='button'
										className={`p-1 rounded-md hover:bg-gray-700 ${
											content[index].answer === i
												? "text-emerald-500"
												: "text-red-500"
										}`}
										onClick={() => {
											setContent(
												content.map((c, j) =>
													j === index
														? { ...c, answer: i }
														: c
												)
											)
										}}
									>
										{content[index].answer === i ? (
											<svg
												className='w-5'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
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
												aria-hidden='true'
											>
												<path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
											</svg>
										)}
									</button>
								</Tooltip>
								<SimpleInput
									label=''
									id={id + index + i}
									name=''
									className='w-[230px]'
									value={content[index].options[i]}
									placeholder='The option content'
									onChange={e => {
										const options = content[
											index
										].options.map((option, j) =>
											j === i ? e.target.value : option
										)

										setContent(
											content.map((c, j) =>
												j !== index
													? c
													: { ...c, options }
											)
										)
									}}
								/>
							</div>
						))}
						<div className='flex justify-end'>
							<Tooltip message='Add option'>
								<button
									onClick={() => addOption(index)}
									type='button'
									className='outline-none p-1 hover:bg-gray-700 text-gray-300 rounded-md'
								>
									<svg
										className='w-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
									</svg>
								</button>
							</Tooltip>
							{content[index].options.length > 2 && (
								<Tooltip message='Remove last option'>
									<button
										onClick={() => removeOption(index)}
										type='button'
										className='outline-none p-1 hover:bg-gray-700 text-gray-300 rounded-md'
									>
										<svg
											className='w-5'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'
										>
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
				))}
				<div className='flex gap-3 items-center justify-center mt-6'>
					<SolidButton
						as={ComponentElement.BUTTON}
						submit={false}
						theme={themeBtns.blueBtn}
						onClick={addCase}
					>
						<div className='flex gap-2 items-center'>
							<svg
								className='w-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
							</svg>
							New Case
						</div>
					</SolidButton>
					{content.length > 2 && (
						<SolidButton
							as={ComponentElement.BUTTON}
							submit={false}
							theme={themeBtns.redBtn}
							onClick={removeCase}
						>
							<div className='flex gap-2 items-center'>
								<svg
									className='w-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z'
									/>
								</svg>
								Delete
							</div>
						</SolidButton>
					)}
				</div>
			</div>
		</>
	)
}
export default CBQQUestion
