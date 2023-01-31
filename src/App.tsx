// * Pages
import Home from "./pages/Home/Home"

// * Components
import Footer from "./components/ui/Footer"
import Navbar from "./components/ui/Navbar"

// * Router
import { BrowserRouter, Routes, Route } from "react-router-dom"

// * Application

function App() {
	return (
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
	)
}

export default App
