import { toTitle } from "../../../../utils/string"

interface ICategoryCheckboxProps {
	category: string
	id?: string | number
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked?: boolean
}
export default function CategoryCheckbox({ category, id, onChange, checked }: ICategoryCheckboxProps) {
	return (
		<label className='flex gap-3 items-center text-sm sm:text-base' htmlFor={category + id}>
			<input
				className='hidden w-3.5 h-3.5 rounded-sm appearance-none border border-gray-100/10 bg-slate-200 focus:outline-offset-2 focus:outline focus:outline-2 focus:outline-slate-400 checked:bg-blue-600 p-1.5'
				checked={checked}
				onChange={e => {
					if (onChange) onChange(e)
				}}
				type='checkbox'
				value={category}
				name={category + id}
				id={category + id}
			/>
			<span
				className={`rounded-sm w-4 h-4 overflow-hidden flex items-center justify-center ${
					!checked && "bg-slate-200"
				}`}
			>
				{checked && (
					<svg
						className='w-5 bg-blue-600'
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
				)}
			</span>
			{toTitle(category)}
		</label>
	)
}
