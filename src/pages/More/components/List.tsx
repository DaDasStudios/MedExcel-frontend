import { PropsWithChildren } from "react"

const List = ({ children, ...props }: PropsWithChildren) => {
	return (
		<li {...props} className='list-inside list-disc text-slate-200 mb-2 leading-7 animate-enter-right'>
			{children}
		</li>
	)
}
export default List
