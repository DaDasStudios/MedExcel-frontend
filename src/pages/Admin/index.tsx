import { useAdminContext } from "../../context/admin/adminContext"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import SigninForm from "./components/SigninForm"

const Admin = () => {
	const { auth } = useAdminContext()
	return (
		<div className='min-h-screen bg-gray-900'>
			{auth?.user && <Navbar></Navbar>}
			<main className='pt-[120px]'>
				{auth?.user ? <Dashboard></Dashboard> : <SigninForm />}
			</main>
		</div>
	)
}

export default Admin
