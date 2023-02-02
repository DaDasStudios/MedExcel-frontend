import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"
import { useSiteContext } from "../../context/site/siteContext"

interface Props extends PropsWithChildren {
	elements: {
		displayTitle: string
		href: string
	}[]
}

const Navbar = ({ elements }: Props) => {
	const { image, name } = useSiteContext()
	return (
		<header className='py-6 text-white bg-slate-900/80 border-b border-slate-50/10 text-base fixed left-0 right-0 top-0 shadow-2xl z-30'>
			<nav className='max-w-4xl mx-auto flex items-center justify-between'>
				<Link
					className='block'
					to='/'
				>
					{image.url ? (
						<img
							className='rounded-full w-14 shadow-lg'
							src={image.url}
							alt={name}
						/>
					) : (
						<svg
							className="w-6 animate-spin text-slate-100"
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
								d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
							/>
						</svg>
					)}
				</Link>
				<ul className='flex gap-8'>
					{elements.map((e, i) => (
						<li
							key={e.displayTitle + i}
							className='text-sky-100 hover:text-sky-200'
						>
							<Link to={e.href}>{e.displayTitle}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
