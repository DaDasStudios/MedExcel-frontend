import BackgroundImage from "../../components/ui/BackgroundImage"
import AOS from "aos"
import { useEffect } from "react"
import EmailForm from "./components/EmailForm"

const Recover = () => {
	useEffect(() => {
		AOS.init({
			duration: 500,
		})
		AOS.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/signin-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<article data-aos='fade-up' className='mx-auto max-w-lg'>
					<div className='py-6 px-5 sm:p-8 bg-slate-900/50 rounded-md border border-slate-100/10 flex flex-col'>
						<div className='mb-6 text-center flex flex-col justify-center gap-3'>
							<h1 className='text-4xl font-bold text-slate-100 tracking-tight'>
								Recover
							</h1>
							<p className='text-slate-200'>
								Just insert you account email and follow the
								instructions to join us again.
							</p>
						</div>
						<EmailForm></EmailForm>
					</div>
				</article>
			</section>
		</>
	)
}

export default Recover
