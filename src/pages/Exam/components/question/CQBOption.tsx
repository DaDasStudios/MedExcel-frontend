import { useEffect, useState } from "react"
import { useExamContext } from "../../../../context/exam/examContext"
import CrossOutButton from "../ui/CrossOutButton"
import { CBQ, IQuestion } from "../../../../interface/exam"

interface IProps {
	question: IQuestion<CBQ>
	optionContent: string
	optionIndex: number
	_page: number
	selectedOptions: string[]
	handleSelectOption: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CBQOption = ({ question, optionContent, optionIndex, _page, selectedOptions, handleSelectOption }: IProps) => {
	const { page, canAnswer, answersRecords } = useExamContext()

	const [isExcluded, setIsExcluded] = useState(false)

	function toggleExcludeOption() {
		setIsExcluded(prevExcluded => !prevExcluded)
	}

	useEffect(() => {
		setIsExcluded(false)
	}, [canAnswer])

	return (
		<li
			role='listitem'
			className={`md:list-[upper-latin] list-inside first:rounded-t-md last:rounded-b-md border border-gray-100/10 py-2 px-4 group/crossout`}
		>
			<div className='inline-flex items-center w-[95%]'>
				{canAnswer && <CrossOutButton optionIndex={optionIndex} toggleExcludeOption={toggleExcludeOption} />}
				<label
					className={`grow flex items-center gap-x-3 ml-1 order-first peer-hover/crossout:line-through peer-hover/crossout:text-slate-400/80 ${
						isExcluded && "line-through text-slate-400/80"
					} ${
						!canAnswer
							? question.content[_page].options[question.content[_page].answer - 1] === optionContent
								? "text-emerald-500"
								: "text-red-500"
							: "text-gray-300"
					} ${!canAnswer && answersRecords[page][_page] === optionContent && "underline"}`}
					htmlFor={optionContent + optionIndex}
				>
					{canAnswer && !isExcluded && (
						<input
							type='radio'
							value={optionContent}
							defaultChecked={
								canAnswer
									? selectedOptions[_page] === optionContent
									: answersRecords[page][_page] === optionContent
							}
							onChange={handleSelectOption}
							id={optionContent + optionIndex}
							name='optionSelected'
							aria-label='Select option radio button'
							className='flex-none'
							title='Select option'
						/>
					)}
					{optionContent}
				</label>
			</div>
		</li>
	)
}
export default CBQOption
