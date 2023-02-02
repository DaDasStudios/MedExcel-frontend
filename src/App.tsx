// * Pages
import Home from "./pages/Home/"
import Subscription from "./pages/Subscription"
import About from "./pages/About"

// * Components
import Footer from "./components/ui/Footer"
import Navbar from "./components/ui/Navbar"

// * Context
import { SiteContextProvider } from "./context/site/siteContext"

// * Router
import { BrowserRouter, Routes, Route } from "react-router-dom"

// * Application
function App() {
	return (
		<SiteContextProvider>
			<BrowserRouter>
				<Navbar
					elements={[
						{
							displayTitle: "Subscriptions",
							href: "/subscription",
						},
						{
							displayTitle: "About",
							href: "/about",
						},
						{
							displayTitle: "Sign up",
							href: "/about",
						},
					]}
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
							path='/about'
							element={<About />}	
						/>
					</Routes>
				</main>
				<Footer
					cols={[
						[
							{
								label: "About",
								href: "/about",
							},
							{
								label: "Recover password",
								href: "/",
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
								label: "excelatmedicine@gmail.com",
							},
						],
					]}
				/>
			</BrowserRouter>
		</SiteContextProvider>
	)
}

export default App
