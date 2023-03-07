import Modal from "../../../../components/ui/Modal"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { Input } from "../../../../components/ui/Input"
import SolidButton, {
	themeBtns,
} from "../../../../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../../../../interface"
import { toast } from "react-hot-toast"
import { useAdminContext } from "../../../../context/admin/adminContext"
import {
	setAccessDaysRequest,
	updateUserByAdminRequest,
} from "../../../../lib/admin.request"
import Spin from "../../../../components/ui/Spin"
import React, { useRef } from "react"
import { IUser } from "../../../../interface/user"
import DecitionToast from "../../../../components/ui/DecitionToast"
import { toTitle } from "../../../../utils/string"

interface IProps {
	rendered: boolean
	closeModal: () => void
	userId: string
	username: string
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

const UpdateUserModal = ({
	closeModal,
	rendered,
	userId,
	username,
	setUsers,
}: IProps) => {
	const {
		auth: { token },
	} = useAdminContext()

	const daysRef = useRef<HTMLInputElement>(null)

	const grantAccessDays = () => {
		if (daysRef.current) {
			if (!daysRef.current.value || parseInt(daysRef.current.value) < 1) {
				return toast.error("Please enter an amount of days to grant")
			}
		}

		toast.custom(t => (
			<DecitionToast
				t={t}
				text={`Are you sure you want to grant ${
					daysRef.current?.value
				} days of access to ${toTitle(username)}`}
				afirmativeCallback={async () => {
					try {
						if (daysRef.current && daysRef.current.value) {
							const { data } = await setAccessDaysRequest(
								userId,
								{
									days: parseInt(daysRef?.current.value),
								},
								token
							)

							if (data.message === "Subscription actived") {
								closeModal()
								return toast.success(
									"Access has been granted to " +
										toTitle(username),
									{ id: t.id }
								)
							}
						} else {
							return toast.error(
								"Please enter an amount of days to grant",
								{ id: t.id }
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

	return (
		<Modal rendered={rendered} closeModal={closeModal}>
			<Formik
				initialValues={{
					username,
				}}
				validationSchema={yup.object({
					username: yup
						.string()
						.min(5, "Must be 5 characters or more")
						.max(20, "Must be 20 characters or less")
						.required("Required"),
				})}
				onSubmit={async (values, helpers) => {
					try {
						if (!userId)
							throw new Error("Cannot update user without an ID")

						const res = await updateUserByAdminRequest(
							userId,
							values.username,
							token
						)
						if (
							res.data.message === "User updated" &&
							res.status === 200
						) {
							closeModal()
							setUsers(users =>
								users.map(user =>
									user._id === userId
										? { ...user, username: values.username }
										: user
								)
							)
							return toast.success("User updated")
						}

						throw new Error("Uknown error, try later")
					} catch (error) {
						toast.error("Something went wrong")
					} finally {
						helpers.setSubmitting(false)
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input
							id='username'
							label='Username'
							name='username'
							placeholder='Type a new username for this user'
						/>
						<div className='flex flex-col gap-3 my-6 tracking-tight'>
							<label className='text-base text-slate-300 font-medium'>
								Extra days access
							</label>
							<input
								ref={daysRef}
								className={`bg-transparent border-2 border-slate-100/10 rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent`}
								type='number'
							/>
						</div>
						<div
							className={`flex justify-center gap-x-4 ${
								isSubmitting
									? "pointer-events-none"
									: "pointer-events-auto"
							}`}
						>
							<SolidButton
								as={ComponentElement.BUTTON}
								submit={false}
								theme={themeBtns.blueBtn}
								onClick={grantAccessDays}
							>
								<div className='flex gap-2 items-center'>
									{isSubmitting ? (
										<Spin />
									) : (
										<svg
											className='w-6'
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
												d='M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
											></path>
										</svg>
									)}
									Grant access
								</div>
							</SolidButton>
							<SolidButton
								as={ComponentElement.BUTTON}
								submit={true}
								theme={themeBtns.greenBtn}
							>
								<div className='flex gap-2 items-center'>
									{isSubmitting ? (
										<Spin />
									) : (
										<svg
											className='w-6'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'
										>
											<path d='M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z' />
										</svg>
									)}
									Rename
								</div>
							</SolidButton>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}

export default UpdateUserModal
