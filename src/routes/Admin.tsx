import { AdminContextProvider } from "../context/admin/adminContext"
import AdminIndex from "../pages/Admin"

function Admin() {
	return (
		<>
			<AdminContextProvider>
				<AdminIndex></AdminIndex>
			</AdminContextProvider>
		</>
	)
}

export default Admin
