import { Formik, Form } from "formik"
import { Input } from "../../../components/ui/Input"
import * as yup from "yup"
import { IUser } from "../../../interface/user"
import { formatDate } from "../../../utils/date"
import Separator from "../../../components/ui/Separator"
import ExamRecordTable from "./ExamRecordTable"
import SolidButton, {
	themeBtns,
} from "../../../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../../../interface"
import Spin from "../../../components/ui/Spin"
import {
	resetExamHistoryRequest,
	updateUserRequest,
} from "../../../lib/user.request"
import { useAuthContext } from "../../../context/auth/authContext"
import { toast } from "react-hot-toast"
import DecitionToast from "../../../components/ui/DecitionToast"

interface IProps {
	user: IUser
}

const ContentForm = ({ user }: IProps) => {
	const { username, email, createdAt, subscription, exam, _id } = user
	const {
		auth: { id, token },
		refreshUser
	} = useAuthContext()

	function resetExamHistory() {
		toast.custom(t => (
			<DecitionToast
				t={t}
				text='Are you sure you want to delete your records?'
				afirmativeCallback={async () => {
					try {
						const { data } = await resetExamHistoryRequest(
							_id,
							token || ""
						)
						if (data?.message === "History reseted")
							refreshUser()
							return toast.success("History reseted", {
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
				durationPlan: formatDate.format(
					new Date(subscription?.access || "")
				),
				purchaseDate: subscription?.purchaseDate
					? formatDate.format(
							new Date(subscription?.purchaseDate || "")
					  )
					: "",
				activeSubscription: user.subscription?.hasSubscription
					? "Active"
					: "Paused",
				correctAnswers: exam?.correctAnswers.length,
				maxScore:
					exam.scoresHistory?.length === 0
						? "Don't have exams answered"
						: exam.scoresHistory[0]?.score.toFixed(0) + "%",
			}}
			validationSchema={yup.object({
				username: yup
					.string()
					.min(5, "Must be 5 characters or more")
					.max(20, "Must be 20 characters or less")
					.required("Required"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				const requestPromise = updateUserRequest(
					values.username,
					id || "",
					token || ""
				)

				toast.promise(requestPromise, {
					loading: "Sending...",
					success: res => {
						setSubmitting(false)
						console.log(res)

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
						<Input
							id='email'
							label='Email'
							name='email'
							readOnly={true}
						/>
						<Input
							id='createdAt'
							label='Creation Date'
							name='createdAt'
							readOnly={true}
						/>
						<Input
							id='durationPlan'
							label='Access deadline'
							name='durationPlan'
							readOnly={true}
						/>
						{subscription?.purchaseDate && (
							<Input
								id='purchaseDate'
								label='Date of purchase'
								name='purchaseDate'
								readOnly={true}
							/>
						)}
						<Input
							id='activeSubscription'
							label='Subscription plan'
							name='activeSubscription'
							readOnly={true}
						/>
					</div>
					<div
						className={`flex justify-end mb-6 ${
							isSubmitting
								? "pointer-events-none"
								: "pointer-events-auto"
						}`}
					>
						<SolidButton
							submit={true}
							as={ComponentElement.BUTTON}
							theme={themeBtns.greenBtn}
						>
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
					</div>
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
							className={`${
								!subscription?.hasSubscription
									? "blur-sm pointer-events-none"
									: ""
							}`}
						>
							<Separator></Separator>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 mt-8'>
								<Input
									id='correctAnswers'
									label='Correct answers'
									name='correctAnswers'
									readOnly={true}
								/>
								<Input
									id='maxScore'
									label='Best score'
									name='maxScore'
									readOnly={true}
								/>
							</div>
							<h3 className='text-base text-slate-300 font-medium mb-6'>
								Exam records
							</h3>
							<ExamRecordTable />
							<div className='flex justify-end'>
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
											stroke-width='1.5'
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
											></path>
										</svg>
										Reset
									</div>
								</SolidButton>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default ContentForm
