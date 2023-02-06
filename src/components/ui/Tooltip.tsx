import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren {
	message: string
}

const Tooltip = ({ children, message }: IProps) => {
	return (
		<div className='relative group'>
			<span
				className={`p-2 rounded-md text-gray-200 bg-slate-800 border border-gray-100/10 text-center absolute h-fit w-fit whitespace-nowrap group-hover:block hidden left-1/2 right-1/2 -translate-x-1/2 -bottom-12`}>
				{message}
			</span>
			{children}
		</div>
	)
}

export default Tooltip
