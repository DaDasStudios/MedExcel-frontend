import { Link } from "react-router-dom"
import { useId } from "react"

interface IProps {
	cols: Array<
		{
			label: string
			href?: string
			isAnchorLink?: boolean
		}[]
	>
}

const Footer = ({ cols }: IProps) => {
	const id = useId()
	const id2 = useId()

	return (
		<footer className='text-slate-50 font-normal bg-slate-900/80 border-t border-t-slate-50/30'>
			<div className='max-w-2xl mx-auto py-20'>
				<div className='text-center grid md:grid-cols-3 gap-6'>
					{cols.map((col, i) => (
						<ul className='flex flex-col gap-4' key={id + i}>
							{col.map((elem, j) => (
								<li
									className='text-slate-100 hover:text-slate-200 truncate'
									key={id2 + j}
								>
									{elem.href ? (
										elem.isAnchorLink ? (
											<a
												className='hover:underline'
												href={elem.href}
											>
												{elem.label}
											</a>
										) : (
											<Link
												className='hover:underline'
												to={elem.href}
											>
												{elem.label}
											</Link>
										)
									) : (
										<p>{elem.label}</p>
									)}
								</li>
							))}
						</ul>
					))}
				</div>
				<p className='sm:text-lg text-center block font-medium mt-14'>
					© {new Date().getFullYear()} MedExcel - All rights reserved
				</p>
			</div>
		</footer>
	)
}

export default Footer
