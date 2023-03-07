import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Breadcrumb from "../../../../components/ui/Breadcrumb"
import { useAdminContext } from "../../../../context/admin/adminContext"
import { IUser } from "../../../../interface/user"
import { getAllUsersRequest } from "../../../../lib/admin.request"
import SearchBar from "./SearchBar"
import UpdateUserModal from "./UpdateUserModal"
import UsersTable from "./UsersTable"

const Users = () => {
	const { auth } = useAdminContext()
	const [users, setUsers] = useState([] as IUser[])

	// * Modal
	const [renderModal, setRenderModal] = useState(false)
	const [userId, setUserId] = useState("") // ? To edit users
	const [username, setUsername] = useState("")

	function displayModal(id: string, username: string) {
		setUserId(id)
		setUsername(username)
		setRenderModal(true)
	}

	function closeModal() {
		setUserId("")
		setUsername("")
		setRenderModal(false)
	}

	const fetchUsers = () => {
		const promise = getAllUsersRequest(auth.token)
		toast.promise(promise, {
			success(res) {
				if (res.status === 200 && res.data.users) {
					setUsers(res.data.users)
				}
				return "Loaded"
			},
			error(err) {
				return "Error loading users"
			},
			loading: "Loading",
		})
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<div>
			<Breadcrumb
				elements={[
					<span className='flex items-center gap-3'>
						<svg
							className='w-6'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z'
							/>
						</svg>
						Admin
					</span>,
					<span>Users</span>,
					<p className='text-gray-300'>List</p>,
				]}
			/>
			<h1 className='text-2xl font-semibold my-4'>All users</h1>
			<div>
				<SearchBar
					setUsers={setUsers}
					fetchUsers={fetchUsers}
				></SearchBar>
				<UsersTable
					users={users}
					setUsers={setUsers}
					displayModal={displayModal}
				></UsersTable>
			</div>
			<UpdateUserModal
				userId={userId}
				username={username}
				rendered={renderModal}
				closeModal={closeModal}
				setUsers={setUsers}
			/>
		</div>
	)
}

export default Users
