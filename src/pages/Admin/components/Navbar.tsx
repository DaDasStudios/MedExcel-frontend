import { Link, useNavigate } from "react-router-dom"
import Tooltip from "../../../components/ui/Tooltip"
import { useAdminContext } from "../../../context/admin/adminContext"


const Navbar = () => {
	const { reset } = useAdminContext()
	const navigate = useNavigate()
	return (
		<header className='py-8 text-white bg-slate-900 border-b border-slate-100/10 text-base'>
			<nav className='max-w-4xl mx-auto flex items-center justify-center'>
				<ul className='flex items-center gap-8'>
					<Tooltip message='Users'>
						<Link to='users'>
							<li className='text-gray-200 hover:text-gray-200 hover:bg-gray-700 p-1 rounded-md cursor-pointer'>
								<svg
									className='w-8'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z'
									/>
								</svg>
							</li>
						</Link>
					</Tooltip>
					<Tooltip message='Settings'>
						<Link to='settings'>
							<li className='text-gray-200 hover:text-gray-200 hover:bg-gray-700 p-1 rounded-md cursor-pointer'>
								<svg
									className='w-8'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z'
									/>
								</svg>
							</li>
						</Link>
					</Tooltip>
					<Tooltip message='Exams'>
						<Link to='exams'>
							<li className='text-gray-200 hover:text-gray-200 hover:bg-gray-700 p-1 rounded-md cursor-pointer'>
								<svg
									className='w-8'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z'
									/>
								</svg>
							</li>
						</Link>
					</Tooltip>
					<Tooltip message='Reviews'>
						<Link to='reviews'>
							<li className='text-gray-200 hover:text-gray-200 hover:bg-gray-700 p-1 rounded-md cursor-pointer'>
								<svg
									className="w-8"
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
									/>
								</svg>
							</li>
						</Link>
					</Tooltip>
					<Tooltip message='Pricing'>
						<Link to='pricing'>
							<li className='text-gray-200 hover:text-gray-200 hover:bg-gray-700 p-1 rounded-md cursor-pointer'>
								<svg
									className='w-8'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.732 6.232a2.5 2.5 0 013.536 0 .75.75 0 101.06-1.06A4 4 0 006.5 8v.165c0 .364.034.728.1 1.085h-.35a.75.75 0 000 1.5h.737a5.25 5.25 0 01-.367 3.072l-.055.123a.75.75 0 00.848 1.037l1.272-.283a3.493 3.493 0 011.604.021 4.992 4.992 0 002.422 0l.97-.242a.75.75 0 00-.363-1.456l-.971.243a3.491 3.491 0 01-1.694 0 4.992 4.992 0 00-2.258-.038c.19-.811.227-1.651.111-2.477H9.75a.75.75 0 000-1.5H8.136A4.397 4.397 0 018 8.165V8c0-.641.244-1.28.732-1.768z'
									/>
								</svg>
							</li>
						</Link>
					</Tooltip>
					<Tooltip message='Logout'>
						<li
							onClick={() => {
								reset()
								navigate("/admin")
							}}
							className='text-gray-200 hover:text-gray-200 hover:bg-gray-700 p-1 rounded-md cursor-pointer'
						>
							<svg
								className='w-8'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z'
								/>
							</svg>
						</li>
					</Tooltip>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
