import { PropsWithChildren, useState } from "react"

interface IProps extends PropsWithChildren {
	header: string
}

const DropdownQuestion = ({ children, header }: IProps ) => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	return (
		<div className={`flex gap-1 items-center`}>
			<button
				className="outline-none place-self-start"
				onClick={() => setIsCollapsed(!isCollapsed)}>
				<span>
					{isCollapsed ? (
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							/>
						</svg>
					) : (
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
							/>
						</svg>
					)}
				</span>
			</button>
			{!isCollapsed && (
				<h6 className="truncate text-gray-400">{header}</h6>
			)}

			<div className={`overflow-hidden ${isCollapsed ? "block" : "hidden"}`}>
				{children}
			</div>
		</div>
	)
}
export default DropdownQuestion
