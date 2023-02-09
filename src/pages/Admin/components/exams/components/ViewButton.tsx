import Tooltip from "../../../../../components/ui/Tooltip"
import { useExamsAdminContext } from "../../../../../context/admin/examsContext"

interface IProps {
	content: string
}

const ViewButton = ({ content }: IProps) => {
	const { visualizerModal: { openModal} } = useExamsAdminContext()
	return (
		<div className='flex gap-1.5 items-center text-gray-400 '>
			<button className='hover:text-gray-200 cursor-pointer outline-none' onClick={() => openModal(content)}>
				<Tooltip message='View'>
					<svg
						className='w-4'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path d='M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' />
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
						/>
					</svg>
				</Tooltip>
			</button>
			<p className='truncate text-sm '>{content}</p>
		</div>
	)
}
export default ViewButton
