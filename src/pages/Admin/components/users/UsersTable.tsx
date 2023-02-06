import { IUser } from "../../../../interface/user"
import UserElement from "./UserElement"

interface IUserTableProps {
	users: IUser[]
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

function UsersTable({ users, setUsers }: IUserTableProps) {
	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg my-8 border border-gray-100/10'>
			<table className='w-full text-sm text-left text-gray-300'>
				<thead className='text-xs text-slate-300 uppercase bg-slate-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3'>
							Username
						</th>
						<th
							scope='col'
							className='px-6 py-3'>
							Email
						</th>
						<th
							scope='col'
							className='px-6 py-3'>
							Subscribed
						</th>
						<th
							scope='col'
							className='px-6 py-3'>
							Deadline date
						</th>
						<th
							scope='col'
							className='px-6 py-3'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<UserElement
							key={user._id}
							user={user}
							setUsers={setUsers}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UsersTable
