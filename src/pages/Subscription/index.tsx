import PlansList from "./components/PlansList"
import AOS from "aos"
import { useEffect } from "react"
import BackgroundImage from "../../components/ui/BackgroundImage"
import { useAuthContext } from "../../context/auth/authContext"

const Subscription = () => {
	const { auth } = useAuthContext()

	useEffect(() => {
		AOS.init({
			duration: 1300,
		})
		AOS.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/subscription-page-image.jpg' />
			<section className='pt-[260px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-6'>
				{auth.user?.subscription?.hasSubscription ? (
					<div className='flex gap-4 max-w-xl tracking-tight mx-auto bg-slate-900/50 rounded-md p-5 shadow-md border border-yellow-100/10 text-slate-200 text-5xl font-bold text-center'>
						<svg
							className='w-28'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
							/>
						</svg>{" "}
						You already have a subscription
					</div>
				) : (
					<PlansList />
				)}
			</section>
		</>
	)
}

export default Subscription
