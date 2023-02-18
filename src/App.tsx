// * Router
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"
import Root from "./routes/Root"
import ErrorPage from "./routes/ErrorPage"
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* ROOT */}
			<Route path='/*' element={<Root />} errorElement={<ErrorPage />}>
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
