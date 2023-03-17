import { Link } from "react-router-dom"
import { useId } from "react"

interface IProps {
	cols: Array<
		{
			label: string
			href?: string
			isAnchorLink?: boolean
			children?: React.ReactNode
		}[]
	>
}

const Footer = ({ cols }: IProps) => {
	const id = useId()
	const id2 = useId()

	return (
		<footer className='text-slate-50 font-normal bg-slate-900/80 border-t border-t-slate-50/30'>
			<div className='max-w-2xl mx-auto py-20'>
				<div className='text-center grid md:grid-cols-2 gap-6'>
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
												{elem.children}
											</a>
										) : (
											<Link
												className='hover:underline'
												to={elem.href}
											>
												{elem.label}
												{elem.children}
											</Link>
										)
									) : (
										<>
											<p>{elem.label}</p>
											{elem.children}
										</>
									)}
								</li>
							))}
						</ul>
					))}
				</div>
				<div className='flex flex-col items-center gap-4 justify-center mt-14'>
					<div className='flex items-center justify-between gap-4'>
						<Link
							className='hover:text-slate-300'
							target={"_blank"}
							to={
								"https://www.tiktok.com/@medexcel?_t=8aS99ljw2Cr&_r=1"
							}
						>
							<svg
								id='icons'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 512 512'
								className='w-6'
							>
								<path d='M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z' />
							</svg>
						</Link>
						<Link
							className='hover:text-slate-300'
							target={"_blank"}
							to={
								"https://www.instagram.com/med.excel/?igshid=YmMyMTA2M2Y%3D"
							}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
								fill='currentColor'
							>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z' />
							</svg>
						</Link>
					</div>
					<p className='sm:text-lg text-center block font-medium'>
						© {new Date().getFullYear()} MedExcel - All rights
						reserved
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
