import { PropsWithChildren, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSiteContext } from "../../context/site/siteContext"
import Spin from "../ui/Spin"
import { useAuthContext } from "../../context/auth/authContext"

interface Props extends PropsWithChildren {
	elements: {
		displayTitle: string
		href: string
	}[]
}

const Navbar = ({ elements }: Props) => {
	const { image, name } = useSiteContext()
	const { auth, reset } = useAuthContext()
	const navigate = useNavigate()
	const [activeCollapse, setActiveCollapse] = useState(false)

	return (
		<header className='py-6 text-white bg-slate-900/80 border-b border-slate-50/10 text-base fixed left-0 right-0 top-0 shadow-2xl z-30'>
			<nav className='max-w-4xl mx-auto flex gap-x-7 items-center justify-between px-8'>
				<Link className='block' to='/'>
					{image.url ? (
						<>
							<img
								className='rounded-full w-36 hidden sm:block'
								src={image.url}
								alt={name}
							/>
							<img
								src='/img/compact-logo.png'
								className='w-12 block sm:hidden'
								alt={name}
							/>
						</>
					) : (
						<Spin />
					)}
				</Link>
				<button
					className='block sm:hidden'
					onClick={() => setActiveCollapse(!activeCollapse)}
				>
					<svg
						className='w-6'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z'
						/>
					</svg>
				</button>
				<ul className='items-center gap-8 hidden sm:flex'>
					{elements.map((e, i) => (
						<li
							key={e.displayTitle + i}
							className='text-sky-100 hover:text-sky-200'
						>
							<Link to={e.href}>{e.displayTitle}</Link>
						</li>
					))}
					{auth.user && (
						<>
							<li className='text-sky-100 hover:text-sky-200 cursor-pointer'>
								<Link to='/account'>
									{" "}
									<svg
										className='w-6'
										fill='none'
										stroke='currentColor'
										strokeWidth={1.5}
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</Link>
							</li>
							<li
								onClick={() => {
									reset()
									navigate("/")
								}}
								className='text-sky-100 hover:text-sky-200 cursor-pointer'
							>
								<svg
									className='w-6'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
									/>
								</svg>
							</li>
						</>
					)}
				</ul>
			</nav>
			{/* Responsive box with the links */}
			{activeCollapse && (
				<div onClick={() => setActiveCollapse(false)}>
					<ul className='flex flex-col items-center gap-y-5'>
						{elements.map((e, i) => (
							<li
								key={e.displayTitle + i}
								className='text-sky-100 hover:text-sky-200'
							>
								<Link to={e.href}>{e.displayTitle}</Link>
							</li>
						))}
						{auth.user && (
							<>
								<li className='text-sky-100 hover:text-sky-200 cursor-pointer'>
									<Link to='/account'>
										{" "}
										<svg
											className='w-6'
											fill='none'
											stroke='currentColor'
											strokeWidth={1.5}
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									</Link>
								</li>
								<li
									onClick={() => {
										reset()
										navigate("/")
									}}
									className='text-sky-100 hover:text-sky-200 cursor-pointer'
								>
									<svg
										className='w-6'
										fill='none'
										stroke='currentColor'
										strokeWidth={1.5}
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
										/>
									</svg>
								</li>
							</>
						)}
					</ul>
				</div>
			)}
		</header>
	)
}

export default Navbar
