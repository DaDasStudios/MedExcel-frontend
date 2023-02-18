import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren {
	id?: string
	animation?: string
}

const Subtitle = ({ children, animation = "fade-right", ...props }: IProps) => {
	return (
		<h6
			{...props}
			data-aos={animation}
			className='text-left font-semibold text-xl mb-4'>
			{children}
		</h6>
	)
}

export default Subtitle
