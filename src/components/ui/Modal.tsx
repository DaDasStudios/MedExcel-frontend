
interface IProps extends React.PropsWithChildren {
    rendered: boolean
    closeModal: () => void
	darkBackground?: boolean
}

const Modal = ({ children, rendered, closeModal, darkBackground = true }: IProps) => {

	if (rendered) return (
		<section
			className={`${
				darkBackground && "bg-slate-900/60 "
			} fixed inset-0 flex items-center justify-center z-50`}
		>
			<div className='rounded-md border-gray-100/10 border shadow-md bg-slate-800 p-8 relative overflow-y-auto max-h-[75%] max-w-[80%] overflow-x-auto'>
				<span className='absolute top-0 right-0'>
					<button
						onClick={closeModal}
						className='text-gray-300 hover:bg-gray-700 rounded-md m-3'
					>
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
						</svg>
					</button>
				</span>
				{children}
			</div>
		</section>
	)

    return <span></span>
}

export default Modal
