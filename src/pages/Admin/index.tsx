import { useAdminContext } from "../../context/admin/adminContext"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import SigninForm from "./components/SigninForm"

const Admin = () => {
	const { auth } = useAdminContext()
	return (
		<div className='min-h-screen min-w-max bg-gray-900'>
			{auth?.user && <Navbar></Navbar>}
			<main className='py-[80px]'>
				{auth?.user ? <Dashboard></Dashboard> : <SigninForm />}
			</main>
		</div>
	)
}

export default Admin
