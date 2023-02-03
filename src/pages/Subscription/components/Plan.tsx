import { Link } from "react-router-dom"
import { ISubscriptionPlan } from "../../../interface"
import { requestForPayment } from "../../../lib/site.request"
import { formatCurrency } from "../../../utils/currency"

interface IProps {
	plan: ISubscriptionPlan
	recommended?: boolean
	href?: string
	idx: number
}

const Plan = ({ plan, recommended, href, idx }: IProps) => {
	const buyPlan = async (id: string) => {
		// ! Needs to be authorized to do it
		const data = await requestForPayment(id)
	}

	return (
		<li data-aos={idx % 2 === 0 ? "fade-down" : "fade-up"}>
			<div
				className={`transition-transform hover:-translate-y-4 duration-500 rounded-md shadow-md border border-slate-100/10 text-center flex flex-col justify-between py-10 px-6 ${
					recommended
						? "h-[110%] bg-slate-900/50"
						: "h-full bg-slate-800/50"
				}`}
			>
				<article className='flex flex-col'>
					<h4 className='font-medium text-slate-200 text-3xl mb-4'>
						{plan.name}
					</h4>
					<p className='text-slate-300 mb-4'>{plan.description}</p>
					<p className='text-slate-200 font-medium mb-6'>
						For {plan.days} days
					</p>
					<p className='mb-5 text-4xl font-medium text-slate-200'>
						{formatCurrency.format(plan.price)}
					</p>
				</article>
				{href ? (
					<Link
						className='bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100 border border-emerald-100/10 rounded-md py-3 px-2 transition-colors'
						to={"/signup"}
					>
						Buy Now
					</Link>
				) : (
					<button
						onClick={() => buyPlan(plan._id)}
						className='bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100 border border-emerald-100/10 rounded-md py-3 px-2 transition-colors'
					>
						Buy Now
					</button>
				)}
			</div>
		</li>
	)
}

export default Plan
