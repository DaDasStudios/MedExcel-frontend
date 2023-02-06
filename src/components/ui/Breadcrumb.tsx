import { useId } from "react"

interface IProps {
	elements: JSX.Element[]
}

const Breadcrumb = ({ elements }: IProps) => {
    const id = useId()
	return (
		<div>
			<ol className='flex items-center'>
				{elements.map((element, index) => (
					<li key={`breadcrumb ${index} id`} className="flex items-center">
						{element}
						{index !== elements.length - 1 && (
							<svg
								className='w-6 mx-3 text-gray-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'>
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
								/>
							</svg>
						)}
					</li>
				))}
			</ol>
		</div>
	)
}

export default Breadcrumb
