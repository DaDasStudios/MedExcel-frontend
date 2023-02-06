import toast from "react-hot-toast"
import { useAdminContext } from "../../../../context/admin/adminContext"
import { IUser } from "../../../../interface/user"
import { deleteUserRequest } from "../../../../lib/admin.request"
import { formatDate } from "../../../../utils/date"

interface IUserElementProps {
	user: IUser
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

function UserElement({ user, setUsers }: IUserElementProps) {
	const {
		auth: { token },
	} = useAdminContext()

	async function deleteUser() {
		try {
			const res = await deleteUserRequest(user._id, token)
			if (res.status === 204) {
				toast.success("User deleted")
				setUsers(users => users.filter(u => u._id !== user._id))
			}
		} catch (error) {
			toast.error("Something went wrong... Try later")
		}
	}

	return (
		<tr className='bg-slate-600 border-b border-gray-100/10'>
			<th
				scope='row'
				className='px-6 py-4 font-medium text-gray-100 whitespace-nowrap'>
				{user.username}
			</th>
			<td className='px-6 py-4'>{user.email}</td>
			<td className='px-6 py-4 capitalize'>
				{user.subscription?.hasSubscription ? "Yes" : "No"}
			</td>
			<td className='px-6 py-4'>
				{formatDate.format(new Date(user.subscription?.access || ""))}
			</td>
			<td className='px-6 py-4 flex gap-4'>
				<button className='font-medium p-2 border border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100 rounded-md hover:underline flex gap-2 items-center'>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path d='M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z' />
						<path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z' />
					</svg>
					Edit
				</button>
				<button
					className='font-medium p-2 border border-rose-100/20 bg-rose-700/50 hover:bg-rose-700/70 text-white rounded-md hover:underline flex gap-2 items-center'
					onClick={deleteUser}>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
						/>
					</svg>
					Remove
				</button>
			</td>
		</tr>
	)
}

export default UserElement