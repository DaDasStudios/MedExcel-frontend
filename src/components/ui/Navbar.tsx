import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

interface Props extends PropsWithChildren {
	elements: {
		displayTitle: string
		href: string
	}[]
}

const Navbar = ({elements}: Props) => {
	return (
		<>
			<div className='min-h-[88px]'></div>
			<header className='py-8 bg-red-500 fixed left-0 right-0 top-0'>
				<nav className='max-w-4xl mx-auto flex items-center justify-between'>
					<div>image</div>
					<ul className='flex gap-5'>
						{elements.map((e, i) => (
							<li key={e.displayTitle + i}>
								<Link to={e.href}>{e.displayTitle}</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	)
}

export default Navbar
