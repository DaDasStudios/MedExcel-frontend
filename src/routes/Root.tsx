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
import { Toaster } from "react-hot-toast"

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
									displayTitle: "Subscriptions",
									href: "/subscription",
								},
								{
									displayTitle: "More",
									href: "/more",
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
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/subscription'
						element={<Subscription />}
					/>
					<Route
						path='/more'
						element={<More />}
					/>
					{user && (
						<>
							<Route
								path='/account'
								element={<Account />}
							/>
						</>
					)}
					{!user && (
						<>
							<Route
								path='/signup'
								element={<Signup />}
							/>
							<Route
								path='/signin'
								element={<Signin />}
							/>
							<Route
								path='/recover'
								element={<Recover />}
							/>
							<Route
								path='/recover/auth'
								element={<RecoverAuth />}
							/>
						</>
					)}
				</Routes>
			</main>
			<Footer
				cols={[
					[
						{
							label: "About",
							href: "/more#about",
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
							href: "/terms-conditions",
						},
						{
							label: "Privacy Policy",
							href: "/privacy-policy",
						},
						{
							label: "FAQ",
							href: "/faq",
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
			<Toaster />
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
