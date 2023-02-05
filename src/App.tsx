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

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* ROOT */}
			<Route
				path='/'
				element={<Root />}
				errorElement={<ErrorPage />}
			>
				<Route
					path='/subscription'
					element={<Subscription />}
				/>
				<Route
					path='/more'
					element={<More />}
				/>
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
				<Route
					path='/account'
					element={<Account />}
				/>
				{/* ADMIN */}
				<Route
					path='/admin'
					element={<Admin />}
				></Route>
			</Route>
		</>
	)
)
const App = () => {
	return <RouterProvider router={router} />
}

export default App
