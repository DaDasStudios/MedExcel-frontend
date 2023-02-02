import { useId } from "react"
import { useSiteContext } from "../../../context/site/siteContext"
import Plan from "./Plan"

const PlansList = () => {
	const { subscriptionPlans } = useSiteContext()
    const id = useId()
	return (
		<div className='w-fit max-w-5xl mx-auto'>
			<ul className='text-slate-100 grid grid-cols-4 items-center justify-center gap-5'>
				{subscriptionPlans
					.map((sp, idx) => (
						<Plan
							key={sp._id}
							idx={idx + 1}
							plan={sp}
                            recommended={sp.days == 365 || sp.days == 14 ? true : false}
							href={sp.name === "Free" ? "/signup" : undefined}
						/>
					))}
			</ul>
		</div>
	)
}

export default PlansList
