import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren {
	id?: string
}

const Heading = ({ children, ...props }: IProps) => {
	return (
		<h4 {...props} className='text-center font-bold text-5xl mb-8 animate-enter-right'>
			{children}
		</h4>
	)
}

export default Heading
