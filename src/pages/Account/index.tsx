import BackgroundImage from "../../components/ui/BackgroundImage"
import Profile from "./components/Profile"
import Aos from "aos"
import { useEffect, useState } from "react"
import Modal from "../../components/ui/Modal"

const index = () => {
	const [showChartModal, setShowChartModal] = useState(false)
	const [modalChildren, setModalChildren] = useState(null as React.ReactNode)

	useEffect(() => {
		Aos.init()
		Aos.refresh()
	}, [])

	return (
		<>
			<BackgroundImage url='/img/account-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<article data-aos='fade-up' className='mx-auto max-w-xl'>
					<Profile
						setShowChartModal={setShowChartModal}
						setModalChildren={setModalChildren}
					/>
				</article>
			</section>
			<Modal
				rendered={showChartModal}
				closeModal={() => setShowChartModal(false)}
			>
				<div className='max-w-xl'>{modalChildren}</div>
			</Modal>
		</>
	)
}

export default index
