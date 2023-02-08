import Tooltip from "../../../../../components/ui/Tooltip"
import { ISubscriptionPlan } from "../../../../../interface"
import { formatCurrency } from "../../../../../utils/currency"
import { formatDate } from "../../../../../utils/date"
import { toTitle } from "../../../../../utils/string"

interface IProps {
	subscription: ISubscriptionPlan
	deletePlan: (id: string) => void
	editPlan: (subscriptionPlan: ISubscriptionPlan) => void
}

const Subscription = ({ subscription, deletePlan, editPlan }: IProps) => {
	return (
		<div className='text-gray-300 flex flex-col gap-2 bg-slate-700/50 transition-colors hover:bg-slate-700 p-4 rounded-md shadow-md border border-gray-100/10'>
			<h5 className='text-left text-semibold text-lg'>
				{toTitle(subscription.name)}
			</h5>
			<p className='text-slate-400'>{subscription.description}</p>
			<p className='font-semibold tracking-tight text-center flex items-center gap-2'>
				<svg
					className='w-4'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z'
					/>
				</svg>
				For {subscription.days} days
			</p>
			<p className='font-semibold tracking-tight flex items-center gap-2'>
				<svg
					className='w-4'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z'
					/>
				</svg>
				{formatCurrency.format(subscription.price)}
			</p>
			<div className='flex justify-between items-center'>
				<p className='text-slate-400 text-xs'>
					{formatDate.format(new Date(subscription.updatedAt))}
				</p>
				<div className='flex gap-2'>
					<Tooltip message='Edit'>
						<button
							className='hover:text-white'
							onClick={() => editPlan(subscription)}>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'>
								<path d='M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z' />
								<path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z' />
							</svg>
						</button>
					</Tooltip>
					<Tooltip message='Delete'>
						<button
							onClick={() => deletePlan(subscription._id)}
							className='hover:text-white'>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'>
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
								/>
							</svg>
						</button>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default Subscription
