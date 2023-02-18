// * Pages
import Account from "../pages/Account"
import Home from "../pages/Home"
import More from "../pages/More"
import Recover from "../pages/Recover"
import RecoverAuth from "../pages/Recover/RecoverAuth"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Subscription from "../pages/Subscription"

// * Routes
import { Route, Routes } from "react-router-dom"

// * Context
import { useAuthContext } from "../context/auth/authContext"
import { SiteContextProvider } from "../context/site/siteContext"
import { AuthContextProvider } from "../context/auth/authContext"

// * Components
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import Exam from "../pages/Exam"
import ErrorPage from "./ErrorPage"
import ExamErrorPage from "./ExamErrorPage"

function Layout() {
	const {
		auth: { user },
	} = useAuthContext()
	return (
		<>
			<Navbar
				elements={
					user
						? [
								{
									displayTitle: "More",
									href: "/more",
								},
								{
									displayTitle: "Exam",
									href: "/exam",
								},
						  ]
						: [
								{
									displayTitle: "Subscriptions",
									href: "/subscription",
								},
								{
									displayTitle: "More",
									href: "/more",
								},

								{
									displayTitle: "Sign up",
									href: "/signup",
								},
								{
									displayTitle: "Sign In",
									href: "/signin",
								},
						  ]
				}
			/>
			<main className='min-h-screen relative'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/subscription' element={<Subscription />} />
					<Route path='/more' element={<More />} />

					{user && (
						<>
							<Route path='/account' element={<Account />} />
							<Route
								errorElement={<ExamErrorPage />}
								path='/exam'
								element={<Exam />}
							/>
						</>
					)}
					{!user && (
						<>
							<Route path='/signup' element={<Signup />} />
							<Route path='/signin' element={<Signin />} />
							<Route path='/recover' element={<Recover />} />
							<Route
								path='/recover/auth'
								element={<RecoverAuth />}
							/>
						</>
					)}
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</main>
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
							href: "/admin",
						},
					],
					[
						{
							label: "Terms & Conditions",
							href: "/more#terms-conditions",
						},
						{
							label: "Privacy Policy",
							href: "/more#privacy-policy",
						},
					],
					[
						{
							label: "Admin portal",
							href: "/admin",
						},
						{
							label: "excelatmedicine@gmail.com",
						},
					],
				]}
			/>
		</>
	)
}

export default function Root() {
	return (
		<>
			<AuthContextProvider>
				<SiteContextProvider>
					<Layout />
				</SiteContextProvider>
			</AuthContextProvider>
		</>
	)
}
