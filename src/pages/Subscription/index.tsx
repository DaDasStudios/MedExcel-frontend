import PlansList from "./components/PlansList"
import AOS from "aos"
import { useEffect } from "react"

const Subscription = () => {
	useEffect(() => {
		AOS.init({
			duration: 1300,
		})
		AOS.refresh()
	}, [])
	return (
		<>
			<span className="fixed bg-no-repeat bg-cover bg-[url('/img/subscription-page-image.jpg')] min-h-screen -z-20 inset-0 blur-sm"></span>
			<section className='pt-[260px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-52'>
				<PlansList></PlansList>
			</section>
		</>
	)
}

export default Subscription
