import Tooltip from "../../../../components/ui/Tooltip"
import { FilterSetExamType } from "../../../../interface/exam"
import { toTitle } from "../../../../utils/string"

interface IFilterRadioButtonProps {
	value: FilterSetExamType
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	description: string
}
export default function FilterRadioButton({ value, description, ...props }: IFilterRadioButtonProps) {
	return (
		<label className='inline-block' htmlFor={value}>
			<Tooltip message={description}>
				<span className='flex items-center gap-2'>
					<input className='w-4 h-4' type='radio' id={value} value={value} name='filters' {...props} />
					<p className='text-semibold'>{toTitle(value)}</p>
				</span>
			</Tooltip>
		</label>
	)
}
