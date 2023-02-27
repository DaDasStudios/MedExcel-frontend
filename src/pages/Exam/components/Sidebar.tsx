import { toast } from "react-hot-toast"
import { themeBtns } from "../../../components/ui/Buttons/SolidButton"
import DecitionToast from "../../../components/ui/DecitionToast"
import { useAuthContext } from "../../../context/auth/authContext"
import { useExamContext } from "../../../context/exam/examContext"
import { cancelExamRequest } from "../../../lib/exam.request"
import { formatDate } from "../../../utils/date"
import SideBarElement from "./ui/SideBarElement"

const Sidebar = () => {
	const { auth, refreshUser } = useAuthContext()
	const { score } = useExamContext()
	const { user } = auth

	async function cancelExam() {
		toast.custom(t => (
			<DecitionToast
				t={t}
				text='Are you sure you want to cancel this exam?'
				afirmativeCallback={async () => {
					try {
						const res = await cancelExamRequest(auth.token || "")
						if (res.status === 204) {
							toast.success("Exam cancelled", {
								id: t.id,
							})
							refreshUser()
						}
					} catch (error) {
						toast.error("Something went wrong... Try later", {
							id: t.id,
						})
					}
				}}
			/>
		))
	}

	return (
		<aside className='min-[400px]:max-lg:w-[300px] max-lg:max-w-[300px] max-lg:mx-auto lg:col-span-2 py-6 px-5 sm:p-5 bg-slate-900/80 h-fit rounded-md border border-gray-100/10 shadow-md'>
			<div className='font-medium text-gray-300 text-normal'>
				<SideBarElement>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
						/>
					</svg>
					<h4>
						Correct questions <b>{score ? score.toFixed(0) : user?.exam.score.toFixed(0)}</b>%
					</h4>
				</SideBarElement>
				<SideBarElement>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z'
						/>
						<path d='M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z' />
					</svg>
					<p>
						Question <b>{(user?.exam.current || 0) + 1}</b> of{" "}
						<b>{user?.exam.questions.length}</b>
					</p>
				</SideBarElement>
				<SideBarElement>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path d='M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z' />
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z'
						/>
					</svg>
					<p>
						Started at{" "}
						<b>
							{formatDate.format(
								new Date(user?.exam.startedAt || "")
							)}
						</b>
					</p>
				</SideBarElement>
			</div>
			<button
				className={`flex justify-center items-center gap-2 py-2 px-3 border rounded-md mt-6 mb-1 w-full ${themeBtns.redBtn}`}
				type='button'
				onClick={cancelExam}
			>
				<svg
					className='w-5'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z'
					/>
				</svg>
				Cancel exam
			</button>
		</aside>
	)
}
export default Sidebar
