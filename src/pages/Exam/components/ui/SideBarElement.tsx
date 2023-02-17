import { PropsWithChildren } from "react"

const SideBarElement = ({ children }: PropsWithChildren) => {
	return (
		<span className='flex gap-2 items-center mb-2'>
			{children}
		</span>
	)
}
export default SideBarElement
