import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../context/auth/authContext"
import { ISubscriptionPlan } from "../../../interface"
import { requestForPayment } from "../../../lib/site.request"
import { formatCurrency } from "../../../utils/currency"
import { useTransition } from "../../../hooks/useTransition"
import { Transition } from "@headlessui/react"
import { Fragment } from "react"

interface IProps {
	plan: ISubscriptionPlan
	recommended?: boolean
	href?: string
	idx: number
}

const Plan = ({ plan, recommended, href, idx }: IProps) => {
	const { auth } = useAuthContext()
	const enter = useTransition()

	const buyPlan = async (id: string) => {
		// ! Needs to be authorized to do it
		try {
			const res = await requestForPayment(id, auth?.token || "")
			if (res.data.message === "Order created" && res.data.order.status === "CREATED") {
				const approveLink = res.data.order.links[1]
				window.location.replace(approveLink.href)
			} else {
				toast.error("Something went wrong")
			}
		} catch (error) {
			toast.error("Somethins went wrong")
		}
	}

	return (
		<Transition
			as={Fragment}
			show={enter}
			enter='transform transition duration-[600ms]'
			enterFrom={`opacity-0 scale-90 ${idx % 2 === 0 ? "translate-y-1/3" : "-translate-y-1/3"}`}
			enterTo={`opacity-100 scale-100 translate-y-0`}
		>
			<li>
				<div
					className={`transition-transform hover:-translate-y-4 duration-500 rounded-md shadow-md border border-slate-100/10 text-center flex flex-col justify-between py-7 lg:py-10 px-5 lg:px-6 ${
						recommended ? "h-[110%] bg-slate-900/50" : "h-full bg-slate-800/50"
					}`}
				>
					<article className='flex flex-col'>
						<h4 className='font-medium text-slate-200 text-3xl mb-4'>{plan.name}</h4>
						<p className='text-slate-300 text-base mb-4'>{plan.description}</p>
						<p className='text-slate-200 font-medium mb-6'>For {plan.days} days</p>
						<p className='mb-5 text-3xl md:text-4xl font-medium text-slate-200'>
							{formatCurrency.format(plan.price)}
						</p>
					</article>
					{href || !auth.user ? (
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
		</Transition>
	)
}

export default Plan
