import Breadcrumb from "../../../../components/ui/Breadcrumb"
import { useEffect, useState } from "react"
import { ISubscriptionPlan } from "../../../../interface"
import { useAdminContext } from "../../../../context/admin/adminContext"
import { getSiteData } from "../../../../lib/site.request"
import { toast } from "react-hot-toast"
import AddSubscription from "./components/SubscriptionPlanForm"
import SubscriptionsGroup from "./components/SubscriptionsGroup"
import Spin from "../../../../components/ui/Spin"
import { deleteSubscriptionPlanRequest } from "../../../../lib/admin.request"
import DecitionToast from "../../../../components/toast/DecitionToast"

const Pricing = () => {
	const { auth } = useAdminContext()
	const [isEditing, setIsEditing] = useState(false)
	const [planId, setPlanId] = useState("" as string | null)
	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		days: "",
		price: "",
	})
	const [subscriptions, setSubscriptions] = useState(
		[] as ISubscriptionPlan[]
	)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await getSiteData()
				setSubscriptions(data.subscriptionPlans)
			} catch (error: any) {
				toast.error("Error when fetching subscription plans")
			}
		})()
	}, [subscriptions])

	function editPlan(subscriptionPlan: ISubscriptionPlan) {
		setIsEditing(true)
		setPlanId(subscriptionPlan._id)
		setFormValues({
			name: subscriptionPlan.name,
			days: subscriptionPlan.days.toString(),
			description: subscriptionPlan.description,
			price: subscriptionPlan.price.toString(),
		})
	}

	function cancelEditingPlan() {
		setFormValues({
			name: "",
			description: "",
			days: "",
			price: "",
		})
		setIsEditing(false)
	}

	function deleteSubscriptionPlan(id: string) {
		toast.custom(t => (
			<DecitionToast
				t={t}
				text='Are you sure you want to delete this subscription?'
				afirmativeCallback={async () => {
					try {
						const res = await deleteSubscriptionPlanRequest(
							id,
							auth.token
						)

						if (
							res.status === 200 &&
							res.data.message === "Subscription deleted"
						) {
							setSubscriptions(subscriptions)
							return toast.success("Subscription plan deleted", {
								id: t.id,
							})
						}

						throw new Error("Could not create subscription plan")
					} catch (error: any) {
						toast.error("Something went wrong... Try later")
					}
				}}
			/>
		))
	}

	return (
		<div>
			<Breadcrumb
				elements={[
					<span className='flex items-center gap-3'>
						<svg
							className='w-6'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.732 6.232a2.5 2.5 0 013.536 0 .75.75 0 101.06-1.06A4 4 0 006.5 8v.165c0 .364.034.728.1 1.085h-.35a.75.75 0 000 1.5h.737a5.25 5.25 0 01-.367 3.072l-.055.123a.75.75 0 00.848 1.037l1.272-.283a3.493 3.493 0 011.604.021 4.992 4.992 0 002.422 0l.97-.242a.75.75 0 00-.363-1.456l-.971.243a3.491 3.491 0 01-1.694 0 4.992 4.992 0 00-2.258-.038c.19-.811.227-1.651.111-2.477H9.75a.75.75 0 000-1.5H8.136A4.397 4.397 0 018 8.165V8c0-.641.244-1.28.732-1.768z'
							/>
						</svg>
						Admin
					</span>,
					<span>Pricing</span>,
					<p className='text-gray-300'>Subscriptions</p>,
				]}
			/>
			<h1 className='text-2xl font-semibold my-4'>
				All subscription plans
			</h1>
			<div className='grid grid-cols-3 gap-6'>
				<div className='col-span-1'>
					<AddSubscription
						planId={planId}
						isEditing={isEditing}
						cancelEditingPlan={cancelEditingPlan}
						initialValues={formValues}
						setSubscriptions={setSubscriptions}
					/>
				</div>
				<div
					className={`col-span-2 ${
						!subscriptions &&
						"flex items-center justify-center flex-col gap-3"
					}`}
				>
					{subscriptions ? (
						<SubscriptionsGroup
							editPlan={editPlan}
							deletePlan={deleteSubscriptionPlan}
							subscriptions={subscriptions}
						/>
					) : (
						<>
							<Spin />
							<p className='text-slate-300'>Loading...</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Pricing
