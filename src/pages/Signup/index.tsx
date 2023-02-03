import BackgroundImage from "../../components/ui/BackgroundImage"
import AOS from 'aos'
import { useEffect } from "react"
import SignupForm from "./components/SignupForm"

const Signup = () => {
	useEffect(() => {
		AOS.init({
			duration: 500
		})
		AOS.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/signup-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='mx-auto max-w-lg'
				>
					<SignupForm></SignupForm>
				</article>
			</section>
		</>
	)
}

export default Signup
