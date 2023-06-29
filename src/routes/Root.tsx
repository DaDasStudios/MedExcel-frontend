// * Pages
import Account from "../pages/Account"
import Home from "../pages/Home"
import More from "../pages/More"
import Recover from "../pages/Recover"
import RecoverAuth from "../pages/Recover/RecoverAuth"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Subscription from "../pages/Subscription"
import Admin from "./Admin"
import { Toaster } from "react-hot-toast"

// * Routes
import { Route, Routes, useLocation } from "react-router-dom"

// * Context
import { useAuthContext } from "../context/auth/authContext"
import { SiteContextProvider, useSiteContext } from "../context/site/siteContext"
import { AuthContextProvider } from "../context/auth/authContext"

// * Components
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import Exam from "../pages/Exam"
import ErrorPage from "./ErrorPage"
import ExamErrorPage from "./ExamErrorPage"
import DeleteAccountScreen from "../pages/Account/DeleteAccountScreen"
import Modal from "../components/ui/Modal"

function Layout() {
	const {
		auth: { user },
	} = useAuthContext()
	const location = useLocation()
	const {
		modal: { close, isOpen, children },
	} = useSiteContext()
	return (
		<>
			{!location.pathname.includes("admin") && (
				<Navbar
					elements={
						user
							? !user.subscription?.hasSubscription
								? [
										{
											displayTitle: "Subscriptions",
											href: "/subscription",
											icon: (
												<svg
													className='w-6'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
													aria-hidden='true'
												>
													<path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z' />
													<path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z' />
													<path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z' />
												</svg>
											),
										},
										{
											displayTitle: "Question Bank",
											href: "/exam",
											icon: (
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
														d='M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z'
													/>
												</svg>
											),
										},
										{
											displayTitle: "Learn More",
											href: "/more",
											icon: (
												<svg
													className='w-6'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
													aria-hidden='true'
												>
													<path d='M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z' />
												</svg>
											),
										},
								  ]
								: [
										{
											displayTitle: "Question Bank",
											href: "/exam",
											icon: (
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
														d='M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z'
													/>
												</svg>
											),
										},
										{
											displayTitle: "Learn More",
											href: "/more",
											icon: (
												<svg
													className='w-6'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
													aria-hidden='true'
												>
													<path d='M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z' />
												</svg>
											),
										},
								  ]
							: [
									{
										displayTitle: "Start",
										href: "/signup",
										icon: (
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
													d='M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z'
												/>
												<path
													clipRule='evenodd'
													fillRule='evenodd'
													d='M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z'
												/>
											</svg>
										),
									},
									{
										displayTitle: "Subscriptions",
										href: "/subscription",
										icon: (
											<svg
												className='w-6'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z' />
												<path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z' />
												<path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z' />
											</svg>
										),
									},
									{
										displayTitle: "Learn More",
										href: "/more",
										icon: (
											<svg
												className='w-6'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path d='M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z' />
											</svg>
										),
									},

									{
										displayTitle: "Sign In",
										href: "/signin",
										icon: (
											<svg
												className='w-6'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path d='M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z' />
											</svg>
										),
									},
							  ]
					}
				/>
			)}
			
			<main className='min-h-screen relative'>
				<Modal children={children} closeModal={close} rendered={isOpen} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/subscription' element={<Subscription />} />
					<Route path='/more' element={<More />} />
					<Route path='/recover' element={<Recover />} />
					<Route path='/account/delete' element={<DeleteAccountScreen />} />
					<Route path='/recover/auth' element={<RecoverAuth />} />
					{/* ADMIN */}
					<Route path='/admin/*' element={<Admin />} errorElement={<ErrorPage />}></Route>

					{user && (
						<>
							<Route path='/account' element={<Account />} />
							<Route errorElement={<ExamErrorPage />} path='/exam' element={<Exam />} />
						</>
					)}
					{!user && (
						<>
							<Route path='/signup' element={<Signup />} />
							<Route path='/signin' element={<Signin />} />
						</>
					)}
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</main>
			{!location.pathname.includes("admin") && (
				<Footer
					cols={[
						[
							{
								label: "About",
								href: "/more#about-us",
							},
							{
								label: "Recover password",
								href: "/recover",
							},
							{
								label: "Report",
								href: "mailto:admin@medexcel.co.uk",
								isAnchorLink: true,
							},
						],
						[
							{
								label: "Legal",
								href: "/more#legal",
							},
							{
								label: "Admin portal",
								href: "/admin",
							},
							{
								//label: "excelatmedicine@gmail.com",
								label: "admin@medexcel.co.uk",
							},
						],
					]}
				/>
			)}
		</>
	)
}

export default function Root() {
	return (
		<>
			<Toaster />
			<AuthContextProvider>
				<SiteContextProvider>
					<Layout />
				</SiteContextProvider>
			</AuthContextProvider>
		</>
	)
}
