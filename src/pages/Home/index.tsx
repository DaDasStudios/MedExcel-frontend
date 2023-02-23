import { useEffect } from "react"
import { Link } from "react-router-dom"
import AOS from "aos"
import BackgroundImage from "../../components/ui/BackgroundImage"
import { useAuthContext } from "../../context/auth/authContext"
import QuestionExample from "./components/QuestionExample"

const Home = () => {
	const { auth } = useAuthContext()
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
		})
		AOS.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/landing-page-image.jpg' />
			<section className='pt-[200px] pb-32 min-h-screen bg-slate-900/30'>
				<div className='mx-auto max-w-7xl'>
					<div className='xl:grid xl:grid-cols-2 items-center xl:h-[70vh] gap-12 justify-between'>
						<article
							className='text-slate-50 flex flex-col gap-6 justify-center px-6'
							data-aos='fade-right'
						>
							<h1 className='font-bold tracking-tight text-4xl text-center xl:text-left xl:text-6xl'>
								Begin the process of Excel-ing at Exams Now!
							</h1>
							<p className='text-center xl:text-left xl:text-lg text-slate-200'>
								MedExcel is a great revision resource for
								Medical Students supplying questions from a
								range of different specialties.
							</p>
							{!auth.user ? (
								<>
									{" "}
									<div className='max-xl:mx-auto flex items-center gap-4 sm:gap-6 group max-w-fit'>
										<Link
											className='bg-blue-700/50 transition-all group-hover:translate-x-2 hover:bg-blue-700/70 text-base p-4 sm:py-4 sm:px-5 sm:text-lg text-blue-100 rounded-md shadow-md font-medium flex gap-2 border border-blue-100/20 max-w-fit'
											to='/subscription'
										>
											<p className='hidden sm:block'>
												See pricing
											</p>
											<p className='block sm:hidden'>
												Pricing
											</p>
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
											className='bg-emerald-700/50 transition-all group-hover:translate-x-2 hover:bg-emerald-700/70 max-w-fit text-base p-4 sm:py-4 sm:px-5 sm:text-lg text-emerald-100 rounded-md shadow-md font-medium flex gap-2 border border-emerald-100/10'
											to='/signin'
										>
											<p className='hidden sm:block'>
												Have account?
											</p>
											<p className='block sm:hidden'>
												Sign up
											</p>
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
									<div className='bg-slate-900/50 p-5 border border-slate-50/10 shadow-md rounded-md max-w-fit flex flex-col justify-center gap-2 transition-transform hover:translate-x-2 group text-center relative max-sm:mt-4 max-xl:mx-auto'>
										<h3 className='hidden sm:block text-yellow-50 text-2xl font-semibold'>
											Get started for free!
										</h3>
										<p className='block sm:hidden text-yellow-50 text-2xl font-semibold'>
											Get started
										</p>
										<p className='text-yellow-50/90'>
											You can join us for free on a trial
											for two weeks!
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
								</>
							) : (
								<div className='flex gap-6 group max-w-fit max-xl:mx-auto'>
									<Link
										className='bg-blue-700/50 transition-all group-hover:translate-x-2 hover:bg-blue-700/70 text-base p-4 sm:py-4 sm:px-5 sm:text-lg text-blue-100 rounded-md shadow-md font-medium flex gap-2 border border-blue-100/20 max-w-fit'
										to='/account'
									>
										<p className='hidden sm:block'>
											See account
										</p>
										<p className='block sm:hidden'>
											Profile
										</p>

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
												d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									</Link>
									<Link
										className='bg-yellow-700/50 transition-all group-hover:translate-x-2 hover:bg-yellow-700/70 max-w-fit text-base p-4 sm:py-4 sm:px-5 sm:text-lg text-yellow-100 rounded-md shadow-md font-medium flex gap-2 border border-yellow-100/10'
										to='/exam'
									>
										<p className='hidden sm:block'>
											Start exam
										</p>
										<p className='block sm:hidden'>Exam</p>

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
												d='M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
											/>
										</svg>
									</Link>
								</div>
							)}
						</article>
							
						<div className="flex items-center justify-center" data-aos='fade-right'>
							<QuestionExample />
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Home
