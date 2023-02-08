import { ISubscriptionPlan } from "../../../../../interface"
import Subscription from "./Subscription"

interface IProps {
	subscriptions: ISubscriptionPlan[]
	deletePlan: (id: string) => void
}

const SubscriptionsGroup = ({ subscriptions, deletePlan }: IProps) => {
	return (
		<ul className='grid grid-cols-3 gap-4'>
			{subscriptions.map(subscription => (
				<li key={subscription._id}>
					<Subscription
						deletePlan={deletePlan}
						subscription={subscription}
					/>
				</li>
			))}
		</ul>
	)
}

export default SubscriptionsGroup
