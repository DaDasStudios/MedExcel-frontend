import { Formik, Form } from "formik"
import { Input } from "../../../components/ui/Input"
import * as yup from "yup"
import { IUser } from "../../../interface/user"
import { formatDate } from "../../../utils/date"
import Separator from "../../../components/ui/Separator"
import ExamRecordTable from "./ExamRecordTable"
import SolidButton, { themeBtns } from "../../../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../../../interface"
import Spin from "../../../components/ui/Spin"
import {
	resetExamHistoryRequest,
	resetPerformanceHistoryRequest,
	sendAccountDeletionRequest,
	updateUserRequest,
} from "../../../lib/user.request"
import { useAuthContext } from "../../../context/auth/authContext"
import { toast } from "react-hot-toast"
import DecitionToast from "../../../components/toast/DecitionToast"
import Tooltip from "../../../components/ui/Tooltip"
import GeneralStats from "./GeneralStats"
import CategoryStats from "./CategoryStats"
import { useNavigate } from "react-router-dom"

interface IProps {
	user: IUser
	setShowChartModal: React.Dispatch<React.SetStateAction<boolean>>
	setModalChildren: React.Dispatch<
		React.SetStateAction<
			| string
			| number
			| boolean
			| React.ReactElement<any, string | React.JSXElementConstructor<any>>
			| React.ReactFragment
			| React.ReactPortal
			| null
			| undefined
		>
	>
}

const ContentForm = ({ user, setShowChartModal, setModalChildren }: IProps) => {
	const { username, email, createdAt, subscription, exam, _id } = user
	const {
		auth: { id, token },
		refreshUser,
		reset,
	} = useAuthContext()
	const navigate = useNavigate()

	function deleteAccountRequest() {
		toast.custom(t => (
			<DecitionToast
				t={t}
				text='Are you sure you want to request your account deletion?'
				afirmativeCallback={async () => {
					try {
						const res = await sendAccountDeletionRequest(_id, token || "")
						if (res.status === 202) {
							reset()
							navigate("/")
							return toast.success(
								"Request accepted (expires in five minutes) visit your email " + username,
								{
									id: t.id,
								}
							)
						}
					} catch (error) {
						return toast.error("Ups... Something went wrong", {
							id: t.id,
						})
					}
				}}
			/>
		))
	}

	async function resetExamHistory() {
		toast.custom((t) => (
			<DecitionToast
				t={t}
				text='Are you sure you want to reset your exam history?'
				afirmativeCallback={async () => {
					try {
						const { data } = await resetExamHistoryRequest(_id, token || "")
						if (data?.message === "History reseted") await refreshUser()
						return toast.success("Exam history reseted", {
							id: t.id,
						})
					} catch (error) {
						return toast.error("Ups... Something went wrong", {
							id: t.id,
						})
					}
				}}
			/>
		))
	}

	async function resetPerformanceRecords() {
		toast.custom(t => (
			<DecitionToast
				t={t}
				text='Are you sure you want to reset your performance statistics?'
				afirmativeCallback={async () => {
					try {
						const { data } = await resetPerformanceHistoryRequest(_id, token || "")
						if (data?.message === "Statistics reseted") await refreshUser()
						return toast.success("Statistics reseted", {
							id: t.id,
						})
					} catch (error) {
						return toast.error("Ups... Something went wrong", {
							id: t.id,
						})
					}
				}}
			/>
		))
	}

	return (
		<Formik
			initialValues={{
				username: username,
				createdAt: formatDate.format(new Date(createdAt)),
				email: email,
				durationPlan: formatDate.format(new Date(subscription?.access || "")),
				purchaseDate: subscription?.purchaseDate
					? formatDate.format(new Date(subscription?.purchaseDate || ""))
					: "",
				activeSubscription: user.subscription?.hasSubscription ? "Active" : "Paused",
				correctAnswers: exam?.correctAnswers.length,
				maxScore:
					exam.scoresHistory?.length === 0
						? "Don't have exams answered"
						: Math.max(...exam.scoresHistory?.map(record => record.score)).toFixed(0) + "%",
			}}
			validationSchema={yup.object({
				username: yup
					.string()
					.min(5, "Must be 5 characters or more")
					.max(20, "Must be 20 characters or less")
					.required("Required"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				const requestPromise = updateUserRequest(values.username, id || "", token || "")

				toast.promise(requestPromise, {
					loading: "Sending...",
					success: res => {
						setSubmitting(false)

						return "Username updated, reload the page please"
					},
					error: err => {
						setSubmitting(false)
						return "Ups... Something went wrong"
					},
				})
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
						<Input id='username' label='Username' name='username' />
						<Input id='email' label='Email' name='email' readOnly={true} />
						<Input id='createdAt' label='Creation Date' name='createdAt' readOnly={true} />
						<Input id='durationPlan' label='Access deadline' name='durationPlan' readOnly={true} />
						{subscription?.purchaseDate && (
							<Input id='purchaseDate' label='Date of purchase' name='purchaseDate' readOnly={true} />
						)}
						<Input
							id='activeSubscription'
							label='Subscription plan'
							name='activeSubscription'
							readOnly={true}
						/>
					</div>
					<div
						className={`flex justify-end gap-x-4 mb-6 ${
							isSubmitting ? "pointer-events-none" : "pointer-events-auto"
						}`}
					>
						<SolidButton submit={true} as={ComponentElement.BUTTON} theme={themeBtns.greenBtn}>
							<span className='flex gap-2'>
								{!isSubmitting ? (
									<svg
										className='w-6'
										fill='none'
										stroke='currentColor'
										strokeWidth={1.5}
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
										/>
									</svg>
								) : (
									<Spin />
								)}
								<p className='sm:block hidden'>Update</p>
							</span>
						</SolidButton>
						<SolidButton
							submit={false}
							as={ComponentElement.BUTTON}
							theme={themeBtns.redBtn}
							onClick={deleteAccountRequest}
						>
							<span className='flex gap-2'>
								<svg
									className='w-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path d='M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.046 15.253c-.058.468.172.92.57 1.175A9.953 9.953 0 008 18c1.982 0 3.83-.578 5.384-1.573.398-.254.628-.707.57-1.175a6.001 6.001 0 00-11.908 0zM12.75 7.75a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z' />
								</svg>
								<p className='sm:block hidden'>Delete</p>
							</span>
						</SolidButton>
					</div>
					{/** ONLY FOR SUBSCRIBED USERS */}
					<div className='relative'>
						{!subscription?.hasSubscription && (
							<span className='flex flex-col gap-2 items-center justify-center text-lg font- text-center inset-0 text-slate-400 absolute'>
								Get a subscription plan to see your stats
								<svg
									className='w-8'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
									/>
								</svg>
							</span>
						)}

						<div
							unselectable='on'
							draggable='false'
							className={`${!subscription?.hasSubscription ? "blur-sm pointer-events-none" : ""}`}
						>
							<Separator></Separator>
							{/** GENERAL PERFORMANCE INFORMATION */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 mt-8'>
								<Input
									id='correctAnswers'
									label='Correct answers'
									name='correctAnswers'
									readOnly={true}
								/>
								<Input id='maxScore' label='Best score' name='maxScore' readOnly={true} />
							</div>
							<CategoryStats />
							<div className='flex justify-end mb-8'>
								<Tooltip message='Reset correct answers and performance records'>
									<SolidButton
										onClick={resetPerformanceRecords}
										as={ComponentElement.BUTTON}
										theme={themeBtns.redBtn}
									>
										<div className='flex items-center gap-3 justify-center'>
											<svg
												className='w-5'
												fill='none'
												stroke='currentColor'
												strokeWidth='1.5'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
												></path>
											</svg>
											Reset
										</div>
									</SolidButton>
								</Tooltip>
							</div>
							<Separator></Separator>
							{/* EXAM RECORDS */}
							<h3 className='text-base text-slate-300 font-medium mb-6 mt-8'>Exam records</h3>
							<ExamRecordTable
								setShowChartModal={setShowChartModal}
								setModalChildren={setModalChildren}
							/>
							<GeneralStats />
							<div className='flex justify-end mb-8'>
								{exam.scoresHistory.length > 0 && (
									<Tooltip message='Reset the exam history'>
										<SolidButton
											onClick={resetExamHistory}
											as={ComponentElement.BUTTON}
											theme={themeBtns.redBtn}
										>
											<div className='flex items-center gap-3 justify-center'>
												<svg
													className='w-5'
													fill='none'
													stroke='currentColor'
													strokeWidth='1.5'
													viewBox='0 0 24 24'
													xmlns='http://www.w3.org/2000/svg'
													aria-hidden='true'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
													></path>
												</svg>
												Reset
											</div>
										</SolidButton>
									</Tooltip>
								)}
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default ContentForm
