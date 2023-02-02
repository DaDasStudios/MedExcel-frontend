import { PropsWithChildren } from "react"

const Paragraph = ({ children }: PropsWithChildren) => {
  return (
		<p data-aos="fade-right" className='text-slate-200 mb-4 leading-7'>
			{children}
		</p>
  )
}

export default Paragraph