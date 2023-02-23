import BackgroundImage from "../../components/ui/BackgroundImage"
import AOS from "aos"
import { useEffect } from "react"
import SigninForm from "./components/SigninForm"

const Signup = () => {
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
				<article
					data-aos='fade-up'
					className='mx-auto max-w-lg'
				>
					<SigninForm></SigninForm>
				</article>
			</section>
		</>
	)
}

export default Signup
