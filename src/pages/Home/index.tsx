import { useEffect } from "react"
import { Link } from "react-router-dom"
import AOS from 'aos'
import "aos/dist/aos.css"

const Home = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out"
		})
		AOS.refresh()
	},[])
	return (
		<>
			<span className="fixed bg-no-repeat bg-cover bg-[url('/img/landing-page-image.jpg')] min-h-screen -z-20 inset-0"></span>
			<section className='pt-[200px] pb-32 min-h-screen bg-slate-900/30 px-52'>
				<div className='grid grid-cols-2 items-center h-[70vh] gap-12 justify-between'>
					<article
						className='text-slate-50 flex flex-col gap-5 justify-center'
						data-aos='fade-right'
					>
						<h1 className='font-bold tracking-tight text-6xl'>
							Become a better medic now!
						</h1>
						<p className='text-lg text-slate-200'>
							MedExcel is a great resource for medical students
							who need to pass complex exams about different
							categories of health.
						</p>
						<div className='flex gap-5 group max-w-fit'>
							<Link
								className='bg-blue-700/50 transition-all group-hover:translate-x-2 hover:bg-blue-700/70 py-4 px-5 text-lg text-blue-100 rounded-md shadow-md font-medium flex gap-1 border border-blue-100/20 max-w-fit'
								to='/subscription'
							>
								See pricing
								<svg
									className='w-5'
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
										d='M8.25 4.5l7.5 7.5-7.5 7.5'
									/>
								</svg>
							</Link>
							<Link
								className='bg-emerald-700/50 transition-all group-hover:translate-x-2 hover:bg-emerald-700/70 max-w-fit py-4 px-5 text-lg text-emerald-100 rounded-md shadow-md font-medium flex gap-1 border border-emerald-100/10'
								to='/signin'
							>
								Have account?
								<svg
									className='w-5'
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
										d='M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33'
									/>
								</svg>
							</Link>
						</div>
						<div className='bg-slate-900/50 p-5 border border-slate-50/10 shadow-md shadow-amber-100/10 rounded-md max-w-fit flex flex-col justify-center gap-2 transition-transform hover:translate-x-2 group text-center relative'>
							<h3 className='text-slate-200 text-2xl font-semibold'>
								Get started for free!
							</h3>
							<p className='text-slate-300'>
								You can take a free trail for two weeks
							</p>
							<Link
								className='font-medium py-3 px-4 text-lg text-amber-100 transition-colors group-hover:text-amber-50 group-hover:bg-yellow-500/50 rounded-md border border-yellow-100/10 bg-yellow-500/40 mt-2 flex justify-center items-center gap-2'
								to='/signup'
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
										d='M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
									/>
								</svg>
								I want it
							</Link>
						</div>
					</article>
					<div
						className='bg-black/50 h-full text-white'
						data-aos='fade-left'
					>
						Here's gonna be located a sample video of a exam being answered, so user can look what it's exactly about the website
					</div>
				</div>
			</section>
		</>
	)
}

export default Home
