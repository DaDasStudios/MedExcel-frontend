import { useEffect } from "react"
import Spin from "../../../components/ui/Spin"
import { useAuthContext } from "../../../context/auth/authContext"
import { useSiteContext } from "../../../context/site/siteContext"
import Plan from "./Plan"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-hot-toast"

const PlansList = () => {
	const { subscriptionPlans } = useSiteContext()
	const { auth } = useAuthContext()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		const paymentToken = searchParams.get("token")
		const status = searchParams.get("status")

		if (status === "CANCELLED") {
			setTimeout(() => {
				toast.error("Payment cancelled")
			}, 1000)
		}

		if (paymentToken && paymentToken === auth.user?.payment_token) {
			setTimeout(() => {
				toast.success("You have successfully completed the purchase")
			}, 1000)
		}
	}, [])
	return (
		<div className='w-fit max-w-5xl mx-auto'>
			{subscriptionPlans.length === 0 ? (
				<div className='flex items-center justify-center'>
					<Spin className='w-16 text-slate-100' />
				</div>
			) : (
				<ul
					className={`text-slate-100 grid ${
						auth.user ? "grid-cols-3" : "grid-cols-4"
					} items-center justify-center gap-5`}
				>
					{subscriptionPlans.map((sp, idx) => (
						<Plan
							key={sp._id}
							idx={idx + 1}
							plan={sp}
							recommended={
								sp.days == 365 || sp.days == 14 ? true : false
							}
							href={sp.name === "Free" ? "/signup" : undefined}
						/>
					))}
				</ul>
			)}
		</div>
	)
}

export default PlansList
