import BackgroundImage from "../../components/ui/BackgroundImage"
import Profile from "./components/Profile"
import Aos from "aos"
import { useEffect } from "react"

const index = () => {
	useEffect(() => {
		Aos.init()
		Aos.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/account-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='mx-auto max-w-xl'
				>
					<Profile />
				</article>
			</section>
		</>
	)
}

export default index
