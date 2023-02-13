import { Formik, Form } from "formik"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import * as yup from "yup"
import SolidButton from "../../../components/ui/Buttons/SolidButton"
import { Input } from "../../../components/ui/Input"
import Spin from "../../../components/ui/Spin"
import { useAdminContext } from "../../../context/admin/adminContext"
import { ComponentElement } from "../../../interface"
import { signInAdminRequest } from "../../../lib/admin.request"

const SigninForm = () => {
	const { setAdminData } = useAdminContext()

	const formInitialValues = {
		email: "",
		password: "",
	}

	const validationSchema = yup.object({
		email: yup.string().email("Email address invalid").required("Required"),
		password: yup.string().required("Required"),
	})

	return (
		<section className='max-w-xl mx-auto bg-slate-800 rounded-md shadow-md border border-gray-100/10'>
			<article className='flex flex-col gap-4 text-center p-8 border-b border-gray-100/10'>
				<h1 className='text-gray-200 font-bold text-5xl'>
					Admin Portal
				</h1>
				<p className='text-slate-400 font-medium text-lg'>
					Are your an MedExcel administrator? Type your credentials
					and keep working hard!
				</p>
			</article>
			<div className='p-8 bg-slate-800'>
				<Formik
					initialValues={formInitialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, helpers) => {
						const toastId = toast.loading("Loading...")
						try {
							const {
								data: { id, token },
							} = await signInAdminRequest({
								email: values.email,
								password: values.password,
							})

							const theresUser = await setAdminData({ token, id })
							if (!theresUser)
								return toast.error("Not authorized", {
									id: toastId,
								})

							toast.success("Admin authenticated", {
								id: toastId,
							})
						} catch (error: any) {
							if (
								error.response.status === 403 &&
								error.response.data.message ===
									"Invalid credentials"
							) {
								return toast.error(
									"Email or password incorrect",
									{ id: toastId }
								)
							}
							return toast.error("Unknown error", { id: toastId })
						} finally {
							helpers.setSubmitting(false)
						}
					}}>
					{({ isSubmitting }) => (
						<Form>
							<Input
								id='email'
								label='Email address'
								name='email'
								placeholder='Admin@exmaple.com'
								type='email'
							/>
							<Input
								id='password'
								label='Password'
								name='password'
								placeholder='Security credentials'
								type='password'
							/>
							<div
								className={`flex items-center justify-center ${
									isSubmitting
										? "pointer-events-none"
										: "pointer-events-auto"
								}`}>
								<SolidButton
									as={ComponentElement.BUTTON}
									submit={true}>
									{isSubmitting ? (
										<Spin />
									) : (
										<div className='flex gap-2 items-center'>
											<svg
												className='w-5'
												fill='none'
												stroke='currentColor'
												strokeWidth={1.5}
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M5.636 5.636a9 9 0 1012.728 0M12 3v9'
												/>
											</svg>
											Continue
										</div>
									)}
								</SolidButton>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<Link className="text-gray-300 font-medium text-end block pr-8 pb-5 hover:underline" to='/'>Go back</Link>
		</section>
	)
}

export default SigninForm
