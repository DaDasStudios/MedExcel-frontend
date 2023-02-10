import { PropsWithChildren } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSiteContext } from "../../context/site/siteContext"
import Spin from "../ui/Spin"
import { useAuthContext } from "../../context/auth/authContext"
import Tooltip from "../ui/Tooltip"

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

	return (
		<header className='py-6 text-white bg-slate-900/80 border-b border-slate-50/10 text-base fixed left-0 right-0 top-0 shadow-2xl z-30'>
			<nav className='max-w-4xl mx-auto flex items-center justify-between'>
				<Link
					className='block'
					to='/'>
					{image.url ? (
						<img
							className='rounded-full w-36 shadow-lg'
							src={image.url}
							alt={name}
						/>
					) : (
						<Spin />
					)}
				</Link>
				<ul className='flex gap-8'>
					{elements.map((e, i) => (
						<li
							key={e.displayTitle + i}
							className='text-sky-100 hover:text-sky-200'>
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
										aria-hidden='true'>
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
								className='text-sky-100 hover:text-sky-200 cursor-pointer'>
								<svg
									className='w-6'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
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
		</header>
	)
}

export default Navbar
