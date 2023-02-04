import BackgroundImage from "../../components/ui/BackgroundImage"
import AOS from "aos"
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import PasswordForm from "./components/PasswordForm"

const RecoverAuth = () => {
	const [searchParams] = useSearchParams()
	const token = searchParams.get("token")

	useEffect(() => {
		AOS.init({
			duration: 500,
		})
		AOS.refresh()
	}, [])

    if (!token) return (
		<>
			<BackgroundImage url='/img/signin-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='mx-auto max-w-lg'
				>
					<div className='p-8 bg-slate-900/50 rounded-md border border-slate-100/10 flex flex-col'>
						<div className='text-center flex flex-col justify-center gap-3'>
							<h1 className='text-4xl font-bold text-slate-100 tracking-tight'>
								You don't have permission
							</h1>
							<p className='text-slate-200 mt-2'>
								Go to <Link className="text-blue-500" to='/recover'>Recover password</Link> firstly
							</p>
						</div>
					</div>
				</article>
			</section>
		</>
	)

	return (
		<>
			<BackgroundImage url='/img/signin-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='mx-auto max-w-lg'
				>
					<div className='p-8 bg-slate-900/50 rounded-md border border-slate-100/10 flex flex-col'>
						<div className='mb-6 text-center flex flex-col justify-center gap-3'>
							<h1 className='text-4xl font-bold text-slate-100 tracking-tight'>
								New Password
							</h1>
							<p className='text-slate-200'>
								Make sure this new password won't be forgotten.
							</p>
						</div>
						<PasswordForm token={token}></PasswordForm>
					</div>
				</article>
			</section>
		</>
	)
}

export default RecoverAuth
