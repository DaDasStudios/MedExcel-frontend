// * Pages
import Subscription from "./pages/Subscription"
import More from "./pages/More"
import Account from "./pages/Account"
import Recover from "./pages/Recover"
import RecoverAuth from "./pages/Recover/RecoverAuth"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

// * Router
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"
import Root from "./routes/Root"
import Admin from "./routes/Admin"
import ErrorPage from "./routes/ErrorPage"
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* ROOT */}
			<Route
				path='/*'
				element={<Root />}
				errorElement={<ErrorPage />}
			>

			</Route>
			{/* ADMIN */}
			<Route
				path='/admin/*'
				element={<Admin />}
				errorElement={<ErrorPage/>}
			>
			</Route>
		</>
	)
)
const App = () => {
	return <>
		<RouterProvider router={router} />
		<Toaster />
	</>
}

export default App
