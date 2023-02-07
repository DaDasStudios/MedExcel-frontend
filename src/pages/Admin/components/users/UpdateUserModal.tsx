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
import { updateUserByAdminRequest } from "../../../../lib/admin.request"
import Spin from "../../../../components/ui/Spin"
import React from "react"
import { IUser } from "../../../../interface/user"

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
	return (
		<Modal
			rendered={rendered}
			closeModal={closeModal}>
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
				}}>
				{({ isSubmitting }) => (
					<Form>
						<Input
							id='username'
							label='Username'
							name='username'
							placeholder='Type a new username for this user'
						/>
						<div
							className={`flex justify-center ${
								isSubmitting
									? "pointer-events-none"
									: "pointer-events-auto"
							}`}>
							<SolidButton
								as={ComponentElement.BUTTON}
								submit={true}
								theme={themeBtns.greenBtn}>
								<div className='flex gap-2 items-center'>
									{isSubmitting ? (
										<Spin />
									) : (
										<svg
											className='w-6'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'>
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
