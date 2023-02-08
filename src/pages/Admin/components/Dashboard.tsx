import { Routes, Route } from "react-router-dom"
import Users from "./users/Users"
import Settings from "./settings/Settings"
import Pricing from "./pricing/Pricing"

const Dashboard = () => {
	return (
		<div className='max-w-7xl mx-auto p-8 bg-slate-800 mt-16 rounded-md border border-gray-100/10 text-gray-200 font-medium min-w-[1280px]'>
			<Routes>
				<Route
					path='/'
					element={<Users />}
				/>
				<Route
					path='users'
					element={<Users />}
				/>
				<Route
					path='settings'
					element={<Settings />}
				/>
				<Route
					path="pricing"
					element={<Pricing />}
				/>
			</Routes>
		</div>
	)
}

export default Dashboard
