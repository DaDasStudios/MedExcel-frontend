import { Formik, Form } from "formik"
import * as yup from "yup"
import { toast } from "react-hot-toast"
import { signInRequest } from "../../../lib/auth.request"
import { Input } from "../../../components/ui/Input"
import { Link } from "react-router-dom"
import SolidButton, {
	themeBtns,
} from "../../../components/ui/Buttons/SolidButton"
import Spin from "../../../components/ui/Spin"
import { ComponentElement } from "../../../interface"
import { useAuthContext } from "../../../context/auth/authContext"

const SigninForm = () => {
	const { login } = useAuthContext()
	return (
		<div className='bg-slate-900/50 p-8 rounded-md shadow-md border border-slate-100/10 flex flex-col'>
			<div className='mb-6 text-center flex flex-col justify-center gap-3'>
				<h1 className='text-4xl font-bold text-slate-100 tracking-tight'>
					Sign In
				</h1>
				<p className='text-slate-200'>Insert you account credentials</p>
			</div>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={yup.object({
					email: yup
						.string()
						.email("Invalid email address")
						.required("Required"),
					password: yup.string().required("Required"),
				})}
				onSubmit={async (values, { resetForm, setSubmitting }) => {
					try {
						const res = await signInRequest({
							email: values.email,
							password: values.password,
						})

						if (
							res.status === 200 &&
							res.data?.token &&
							res.data?.id
						) {
							login({
								token: res.data.token,
								id: res.data.id,
								user: null,
							})
							resetForm()
						} 
					} catch (error: any) {
						if (error.response?.data?.message === "Invalid credentials") {
							return toast.error(`Email address or password incorrect`)
						} 
						toast.error("Unknow error, try later")
					} finally {
						setSubmitting(false)
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input
							id='email'
							label='Email'
							name='email'
							placeholder='youremail@example.com'
						/>
						<Input
							id='password'
							label='Password'
							name='password'
							placeholder='Your secret password'
							type='password'
						/>
						<div
							className={`flex items-center justify-center ${
								isSubmitting
									? "pointer-events-none"
									: "pointer-events-auto"
							}`}
						>
							<SolidButton
								submit={true}
								theme={themeBtns.greenBtn}
								as={ComponentElement.BUTTON}
							>
								<div className='flex items-center gap-2'>
									{isSubmitting ? (
										<Spin className='w-6' />
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
												d='M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33'
											/>
										</svg>
									)}
									Get logged
								</div>
							</SolidButton>
						</div>
					</Form>
				)}
			</Formik>
			<Link
				to='/recover'
				className='font-medium text-slate-300 hover:underline self-end mt-6 text-sm'
			>
				Forgot password?
			</Link>
		</div>
	)
}

export default SigninForm
