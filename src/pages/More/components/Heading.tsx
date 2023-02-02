import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren {
    id?: string
    animation?: string
}

const Heading = ({ children, animation = "fade-right", ...props }: IProps) => {
  return (
		<h4
			{...props}
			data-aos={animation}
			className='text-center font-bold text-5xl mb-8'
		>
			{children}
		</h4>
  )
}

export default Heading