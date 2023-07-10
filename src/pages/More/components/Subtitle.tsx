import { PropsWithChildren } from "react"

const Subtitle = ({ children, ...props }: PropsWithChildren) => {
	return (
		<h6 {...props} className='text-left font-semibold text-xl mb-4 animate-enter-right'>
			{children}
		</h6>
	)
}

export default Subtitle
