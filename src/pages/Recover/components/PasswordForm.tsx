import { Formik, Form } from "formik"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import SolidButton, {
	themeBtns,
} from "../../../components/ui/Buttons/SolidButton"
import { Input } from "../../../components/ui/Input"
import Spin from "../../../components/ui/Spin"
import { useAuthContext } from "../../../context/auth/authContext"
import { ComponentElement } from "../../../interface"
import { sendNewPasswordRequest } from "../../../lib/user.request"

interface IProps {
	token: string
}

const PasswordForm = ({ token }: IProps) => {
	const { login } = useAuthContext()
	const navigate = useNavigate()
	return (
		<Formik
			initialValues={{
				newPassword: "",
				confirmPassword: "",
			}}
			onSubmit={(values, { setSubmitting }) => {
				const requestPromise = sendNewPasswordRequest(
					values.newPassword,
					token
				)

				toast.promise(requestPromise, {
					loading: "Loading...",
					success: res => {
						setSubmitting(false)
						if (
							res.data.message === "Password updated" &&
							res.status === 200
						) {
							login({
								token: res.data.token,
								id: res.data.id,
								user: null,
							})
							navigate("/account")
							return "Password updated successfully"
						}

						return "Please try again later"
					},
					error: err => {
						setSubmitting(false)
						if (err.response.data.message === "Token expired")
							return "Your token has expired"

						return "Ups... Something went wrong"
					},
				})
			}}
			validationSchema={yup.object({
				newPassword: yup
					.string()
					.min(8, "Must be at least 8 characters")
					.required("Required"),
				confirmPassword: yup
					.string()
					.oneOf(
						[yup.ref("newPassword"), null],
						"Passwords don't match"
					)
					.required("Required"),
			})}
		>
			{({ isSubmitting }) => (
				<Form>
					<Input
						id='newPassword'
						label='New password'
						name='newPassword'
						placeholder='Insert your new password'
						type='password'
					/>
					<Input
						id='confirmPassword'
						label='Confirm password'
						name='confirmPassword'
						placeholder='The exaxt same password above'
						type='password'
					/>
					<div className='flex items-center justify-center'>
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
											d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
										/>
									</svg>
								)}
								Update
							</div>
						</SolidButton>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default PasswordForm
