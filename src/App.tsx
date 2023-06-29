// * Router
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"
import Root from "./routes/Root"
import ErrorPage from "./routes/ErrorPage"

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
	</>
}

export default App
