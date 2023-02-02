// * Pages
import Home from "./pages/Home/"

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
							displayTitle: "About",
							href: "/about",
						},
						{
							displayTitle: "Contact us",
							href: "/contact",
						},
					]}
				/>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</SiteContextProvider>
	)
}

export default App
