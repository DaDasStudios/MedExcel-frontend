import { useExamContext } from "../../../../context/exam/examContext"
import CrossOutButton from "./CrossOutButton"

interface IProps {
	optionContent: string
	optionIndex: number
	isExcluded: boolean
	excludedOptions: boolean[]
	selectedOption: string
	toggleExcludeOption: (optionIndex: number) => void
	handleSelectOption: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SBAOption = ({
	optionContent,
	optionIndex,
	isExcluded,
	selectedOption,
	excludedOptions,
	toggleExcludeOption,
	handleSelectOption,
}: IProps) => {
	const { hasAnswered, mode, questionResponse } = useExamContext()

	return (
		<li
			role='listitem'
			className={`md:list-[upper-latin] list-inside first:rounded-t-md last:rounded-b-md border border-gray-100/10 py-2 px-4 group/crossout`}
		>
			<div className='inline-flex items-center w-[95%]'>
				{!hasAnswered && (
					<>
						{excludedOptions.reduce((count, curr) => {
							count += Number(curr)
							return count
						}, 0) ===
						excludedOptions.length - 1 ? (
							isExcluded && (
								<CrossOutButton optionIndex={optionIndex} toggleExcludeOption={toggleExcludeOption} />
							)
						) : (
							<CrossOutButton optionIndex={optionIndex} toggleExcludeOption={toggleExcludeOption} />
						)}
					</>
				)}
				<label
					className={`grow flex items-center gap-x-3 ml-1 order-first peer-hover/crossout:line-through peer-hover/crossout:text-slate-400/80 ${
						isExcluded && "line-through text-slate-400/80"
					} ${
						hasAnswered
							? optionIndex === questionResponse.question.content.answer - 1
								? "text-emerald-500"
								: "text-red-500"
							: "text-gray-300"
					} ${hasAnswered && selectedOption === optionContent && "underline"}`}
					htmlFor={optionContent + optionIndex}
				>
					{!hasAnswered && mode !== "PREVIEW" && !isExcluded && (
						<input
							type='radio'
							value={optionContent}
							onChange={handleSelectOption}
							id={optionContent + optionIndex}
							name='optionSelected'
							aria-label='Select option radio button'
							className="flex-none"
							title='Select option'
						/>
					)}
					{optionContent}
				</label>
			</div>
		</li>
	)
}
export default SBAOption
