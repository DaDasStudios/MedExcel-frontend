import { ISubscriptionPlan } from "../../../../../interface"
import Subscription from "./Subscription"

interface IProps {
	subscriptions: ISubscriptionPlan[]
	editPlan: (subscriptionPlan: ISubscriptionPlan) => void
	deletePlan: (id: string) => void
}

const SubscriptionsGroup = ({ subscriptions, deletePlan, editPlan }: IProps) => {
	return (
		<ul className='grid grid-cols-3 gap-4'>
			{subscriptions.map(subscription => (
				<li key={subscription._id}>
					<Subscription
						deletePlan={deletePlan}
						subscription={subscription}
						editPlan={editPlan}
					/>
				</li>
			))}
		</ul>
	)
}

export default SubscriptionsGroup
