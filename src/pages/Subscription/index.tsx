import PlansList from "./components/PlansList"
import AOS from "aos"
import { useEffect } from "react"
import BackgroundImage from "../../components/ui/BackgroundImage"

const Subscription = () => {
	useEffect(() => {
		AOS.init({
			duration: 1300,
		})
		AOS.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/subscription-page-image.jpg' />
			<section className='pt-[260px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<PlansList></PlansList>
			</section>
		</>
	)
}

export default Subscription
