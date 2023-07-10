import { PropsWithChildren } from "react"

const Paragraph = ({ children }: PropsWithChildren) => {
	return <p className='text-slate-200 mb-4 leading-7 animate-enter-right'>{children}</p>
}

export default Paragraph
