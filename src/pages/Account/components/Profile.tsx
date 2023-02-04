import { useEffect } from "react"
import { toast } from "react-hot-toast"
import Separator from "../../../components/ui/Separator"
import { useAuthContext } from "../../../context/auth/authContext"
import { IUser } from "../../../interface/user"
import { formatDate } from "../../../utils/date"
import { toTitle } from "../../../utils/string"
import ContentForm from "./ContentForm"

const Profile = () => {
	const {
		auth: { user },
	} = useAuthContext()

	useEffect(() => {
		toast.success(`Welcome back ${user?.username}`)
	}, [])

	return (
		<div className='bg-slate-900/50 p-8 rounded-md border border-slate-100/10 shadow-md flex flex-col'>
			<div className='tracking-tight mb-6'>
				<h3 className='text-slate-300 text-xl text-center font-semibold mb-2'>
					Profile
				</h3>
				<p className='text-slate-400 text-lg mb-4'>
					Here you can check your account information and update your username.
				</p>
				<Separator></Separator>
			</div>
			<ContentForm user={user as IUser} />
			<span className='text-center block text-sm text-slate-400'>
				Last updated{" "}
				{formatDate.format(new Date(user?.updatedAt || ""))}
			</span>
		</div>
	)
}

export default Profile
