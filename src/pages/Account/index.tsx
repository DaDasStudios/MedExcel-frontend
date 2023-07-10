import BackgroundImage from "../../components/ui/BackgroundImage"
import Profile from "./components/Profile"
import { useState } from "react"
import Modal from "../../components/ui/Modal"
import { useAuthContext } from "../../context/auth/authContext"
import Spin from "../../components/ui/Spin"

const index = () => {
	const {
		auth: { user },
	} = useAuthContext()
	const [showChartModal, setShowChartModal] = useState(false)
	const [modalChildren, setModalChildren] = useState(null as React.ReactNode)

	return (
		<>
			<BackgroundImage url='/img/account-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<article className='mx-auto max-w-xl'>
					{user ? (
						<Profile setShowChartModal={setShowChartModal} setModalChildren={setModalChildren} />
					) : (
						<div className='bg-slate-900/50 py-6 px-5 sm:p-8 rounded-md border border-slate-100/10 shadow-md h-[400px] animate-pulse flex items-center justify-center'>
							<Spin className='w-12 text-slate-300' />
						</div>
					)}
				</article>
			</section>
			<Modal rendered={showChartModal} closeModal={() => setShowChartModal(false)}>
				<div className='max-w-xl'>{modalChildren}</div>
			</Modal>
		</>
	)
}

export default index
