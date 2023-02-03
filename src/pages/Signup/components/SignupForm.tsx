import { Formik, Form } from "formik"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import * as yup from "yup"
import SolidButton, {
	themeBtns,
} from "../../../components/ui/Buttons/SolidButton"
import Spin from "../../../components/ui/Spin"
import { ComponentElement } from "../../../interface"
import { signUpRequest } from "../../../lib/auth.request"
import { Checkbox, Input } from "../../../components/ui/Input"

const SignupForm = () => {
	return (
		<div className='bg-slate-900/50 p-8 rounded-md shadow-md border border-slate-100/10 flex flex-col'>
			<div className='mb-6 text-center flex flex-col justify-center gap-3'>
				<h1 className='text-4xl font-bold text-slate-100 tracking-tight'>
					Sign Up
				</h1>
				<p className='text-slate-200'>
					You can join us for free on a trial for two weeks!
				</p>
			</div>
			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					confirmPassword: "",
					acceptedTerms: false,
				}}
				validationSchema={yup.object({
					username: yup
						.string()
						.min(5, "Must be 5 characters or more")
						.max(20, "Must be 20 characters or less")
						.required("Required"),
					email: yup
						.string()
						.email("Invalid email address")
						.required("Required"),
					password: yup
						.string()
						.min(8, "Must be at least 8 characters")
						.required("Required"),
					confirmPassword: yup
						.string()
						.oneOf(
							[yup.ref("password"), null],
							"Passwords don't match"
						)
						.required("Required"),
					acceptedTerms: yup
						.boolean()
						.required("Required")
						.oneOf(
							[true],
							"You must accept the terms and conditions"
						),
				})}
				onSubmit={(values, { resetForm, setSubmitting }) => {
					const requestPromise = signUpRequest({
						username: values.username,
						email: values.email,
						password: values.password,
					})

					toast.promise(
						requestPromise,
						{
							loading: "Loading...",
							success: res => {
								if (
									res.status === 200 &&
									res.data.message ===
										"Waiting for email confirmation"
								) {
									resetForm()
									setSubmitting(false)
									return `Go to ${values.email} and verify the account`
								} else {
									return `Ups... Something went wrong. Please try again`
								}
							},
							error: err => {
								setSubmitting(false)
								return `Ups... Something went wrong. Please try again`
							},
						},
						{}
					)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input
							id='username'
							label='Username'
							name='username'
							placeholder='John Doe'
						/>
						<Input
							id='email'
							label='Email'
							name='email'
							placeholder='johndoe@example.com'
						/>
						<Input
							id='password'
							label='Password'
							name='password'
							placeholder='A secure password'
							type='password'
						/>
						<Input
							id='confirmPassword'
							label='Confirm password'
							name='confirmPassword'
							placeholder='Type the above password again'
							type='password'
						/>
						<Checkbox name='acceptedTerms'>
							<p>
								I accept the{" "}
								<Link
									className='inline-flex items-center gap-1 hover:underline text-blue-500 font-medium tracking-tight'
									to='/terms-conditions'
								>
									terms and conditions{" "}
									<svg
										className='w-5'
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
											d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
										/>
									</svg>
								</Link>
							</p>
						</Checkbox>
						<div
							className={`flex items-center justify-center ${
								isSubmitting
									? "pointer-events-none"
									: "pointer-events-auto"
							}`}
						>
							<SolidButton
								submit={true}
								theme={themeBtns.blueBtn}
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
												d='M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
											/>
										</svg>
									)}
									Get Started
								</div>
							</SolidButton>
						</div>
					</Form>
				)}
			</Formik>
				<Link
					to='/signin'
					className='font-medium text-slate-300 hover:underline self-end mt-6 text-sm'
				>
					Already registered?
				</Link>
		</div>
	)
}

export default SignupForm
