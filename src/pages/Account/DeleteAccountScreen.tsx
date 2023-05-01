import BackgroundImage from "../../components/ui/BackgroundImage"
import AOS from "aos"
import { useEffect } from "react"
import SolidButton, { themeBtns } from "../../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../../interface"
import toast from "react-hot-toast"
import { deleteAccountAuthorized } from "../../lib/user.request"
import { useLocation, useNavigate } from "react-router-dom"

const DeleteAccountScreen = () => {
	useEffect(() => {
		AOS.init({
			duration: 500,
		})
		AOS.refresh()
	}, [])

	const location = useLocation()
	const navigate = useNavigate()

	async function deleteAccount() {
		try {
			const permissionToken = new URLSearchParams(location.search).get(
				"permissionToken"
			)
			const { data } = await deleteAccountAuthorized(
				permissionToken || ""
			)
			if (data.statusCode === 204) {
				toast.success("Your account has been deleted successfully")
				navigate("/")
			}
			
		} catch (error) {
			return toast.error("Ups... Something went wrong")
		}
	}

	return (
		<>
			<BackgroundImage url='/img/signin-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article data-aos='fade-up' className='mx-auto max-w-lg'>
					<div className='py-6 px-5 sm:p-8 bg-slate-900/50 rounded-md border border-slate-100/10 flex flex-col'>
						<div className='mb-6 text-center flex flex-col justify-center gap-3'>
							<h1 className='text-4xl font-bold text-slate-100 tracking-tight'>
								Delete account
							</h1>
							<p className='text-slate-300'>
								Are you sure you want to delete your account?
								This action is not reversible anyway once your
								account has been deleted
							</p>
							<div className='flex items-center justify-center mt-3'>
								<SolidButton
									submit={false}
									as={ComponentElement.BUTTON}
									theme={themeBtns.redBtn}
									onClick={deleteAccount}
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
										<p className='sm:block hidden'>
											I do want to delete my account
										</p>
										<p className='sm:hidden block'>
											Confirm deletion
										</p>
									</span>
								</SolidButton>
							</div>
						</div>
					</div>
				</article>
			</section>
		</>
	)
}

export default DeleteAccountScreen
