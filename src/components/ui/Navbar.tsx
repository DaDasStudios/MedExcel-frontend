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
		<header className='py-6 text-white bg-slate-900/80 border-b border-slate-50/10 font-semibold tracking-tight text-lg fixed left-0 right-0 top-0 shadow-2xl z-30'>
			<nav className='max-w-4xl mx-auto flex items-center justify-between'>
				<Link
					className='block'
					to='/'
				>
					<img
						className='rounded-full w-14 shadow-lg'
						src={image.url}
						alt={name}
					/>
				</Link>
				<ul className='flex gap-8'>
					{elements.map((e, i) => (
						<li
							key={e.displayTitle + i}
							className='text-emerald-100 hover:text-lime-200'
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
