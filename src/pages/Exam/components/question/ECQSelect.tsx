import { Listbox } from "@headlessui/react"
import { ECQ, IQuestion } from "../../../../interface/exam"
import { useExamContext } from "../../../../context/exam/examContext"

interface IProps {
	selectedOption: string
	index: number
	handleOnChange: (value: string) => void
	subQuestion: {
		question: string
		answer: number
	}
	question: IQuestion<ECQ>
}

export default function ECQSelect({ subQuestion, question, index, selectedOption, handleOnChange }: IProps) {
	const { canAnswer } = useExamContext()
	return (
		<Listbox value={selectedOption} onChange={handleOnChange}>
			<div className='relative'>
				<Listbox.Button
					className={`relative sm:w-full cursor-default rounded-md py-1 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm border focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 ${
						!canAnswer
							? question.content.options[subQuestion.answer - 1] === selectedOption
								? "bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100 border-emerald-100/20 focus-visible:ring-green-400/50 focus-visible:ring-opacity-75 focus-visible:ring-offset-green-600"
								: "bg-rose-700/50 hover:bg-rose-700/70 text-rose-100 border-rose-100/20 focus-visible:ring-rose-400/50 focus-visible:ring-offset-rose-600"
							: "border-gray-100/30 bg-slate-700 focus-visible:border-gray-500 focus-visible:ring-gray-300 focus-visible:ring-offset-gray-500"
					}`}
				>
					<span className='block truncate'>{selectedOption}</span>
					<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
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
								d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							/>
						</svg>
					</span>
				</Listbox.Button>
				<Listbox.Options
					className={`z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md text-base border focus:outline-none sm:text-sm bg-gray-700 ${
						!canAnswer
							? question.content.options[subQuestion.answer - 1] === selectedOption
								? " border-emerald-100/20"
								: "border-rose-100/20"
							: "border-gray-100/30"
					}`}
				>
					{question.content.options.map((option, j) => (
						<Listbox.Option
							className={({ active }) =>
								`relative cursor-default select-none py-2 px-3 pr-4
              ${
					!canAnswer
						? question.content.options[subQuestion.answer - 1] === option
							? "bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100"
							: "bg-rose-700/50 hover:bg-rose-700/70 text-rose-100"
						: active
						? "bg-slate-600"
						: "bg-slate-700"
				}`
							}
							key={`SubQuestion:${index}-Option:${j}`}
							value={option}
						>
							{({ selected }) => (
								<>
									<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
										{option}
									</span>
									{selected && (
										<span className='absolute inset-y-0 right-0 flex items-center pr-3'>
											<svg
												className='h-5 w-5'
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
										</span>
									)}
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	)
}
