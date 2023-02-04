import { Formik, Form } from "formik"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import SolidButton, {
	themeBtns,
} from "../../../components/ui/Buttons/SolidButton"
import { Input } from "../../../components/ui/Input"
import Spin from "../../../components/ui/Spin"
import { ComponentElement } from "../../../interface"
import { recoverPasswordRequest } from "../../../lib/user.request"

const EmailForm = () => {
	return (
		<Formik
			initialValues={{
				email: "",
			}}
			onSubmit={(values, { setSubmitting }) => {
				const requestPromise = recoverPasswordRequest(values.email)

				toast.promise(requestPromise, {
					loading: "Loading...",
					success: res => {
						setSubmitting(false)
						if (
							res.data.message ===
							"Waiting for email confirmation"
						) {
							return `Go to ${values.email} and come back`
						} else {
							return "You'd probably intented to recover a unregistered email"
						}
					},
					error: err => {
						setSubmitting(false)
						return "Ups... Something went wrong"
					},
				})
			}}
			validationSchema={yup.object({
				email: yup
					.string()
					.email("Invalid email address")
					.required("Required"),
			})}
		>
			{({ isSubmitting }) => (
				<Form>
					<Input
						id='email'
						label='Email'
						name='email'
						placeholder='The email of the account'
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
								)	}
								Submit
							</div>
						</SolidButton>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default EmailForm
