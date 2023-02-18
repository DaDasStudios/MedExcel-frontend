import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren {
	animation?: string
}

const List = ({ children, animation = "fade-right", ...props }: IProps) => {
	return (
		<li
			data-aos={animation}
			{...props}
			className='list-inside list-disc text-slate-200 mb-2 leading-7'>
			{children}
		</li>
	)
}
export default List
