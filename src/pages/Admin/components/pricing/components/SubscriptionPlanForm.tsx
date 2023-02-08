import { Form, Formik } from "formik"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import SolidButton, {
	themeBtns,
} from "../../../../../components/ui/Buttons/SolidButton"
import Spin from "../../../../../components/ui/Spin"
import { useAdminContext } from "../../../../../context/admin/adminContext"
import { ComponentElement, ISubscriptionPlan } from "../../../../../interface"
import {
	addSubscriptionPlanRequest,
	updateSubscriptionPlanRequest,
} from "../../../../../lib/admin.request"
import { Input } from "./Input"

interface IProps {
	setSubscriptions: React.Dispatch<React.SetStateAction<ISubscriptionPlan[]>>
	initialValues: {
		name: string
		description: string
		days: string
		price: string
	}
	planId: string | null
	isEditing: boolean
	cancelEditingPlan: () => void
}

const SubscriptionPlanForm = ({
	initialValues,
	isEditing,
	cancelEditingPlan,
	planId,
	setSubscriptions
}: IProps) => {
	const { auth } = useAdminContext()

	return (
		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			validationSchema={yup.object({
				name: yup.string().required("Required"),
				description: yup
					.string()
					.max(100, "Must be 100 or less")
					.min(20, "Must be 20 or more")
					.required("Required"),
				days: yup
					.number()
					.min(14, "Days must be more than two weeks")
					.required("Required"),
				price: yup
					.number()
					.min(1, "Price cannot be negative or zero")
					.required("Required"),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					const { name, description, days, price } = values
					const body = {
						name,
						description,
						days: parseInt(days),
						price: parseFloat(price),
					}

					if (isEditing) {
						const res = await updateSubscriptionPlanRequest(
							planId || "",
							body,
							auth.token
						)
						if (
							res.status === 200 &&
							res.data.message === "Subscription updated"
						) {
							cancelEditingPlan()
							setSubscriptions(subs => subs)
							return toast.success("Subscription plan updated")
						}
					} else {
						const res = await addSubscriptionPlanRequest(
							body,
							auth.token
						)
						if (
							res.status === 200 &&
							res.data.message === "Subscription pushed"
						) {
							setSubscriptions(subs => subs)
							return toast.success("New subscription plan added")
						}
					}

					throw new Error(
						"Could not create or update subscription plan"
					)
				} catch (error: any) {
					toast.error("Something went wrong... Try later")
				} finally {
					setSubmitting(false)
				}
			}}>
			{({ isSubmitting }) => (
				<Form>
					<Input
						id='name'
						name='name'
						label='Name'
						placeholder='Title for the plan'
					/>
					<Input
						id='description'
						name='description'
						label='Description'
						placeholder='A not so long description of the plan'
					/>
					<Input
						id='days'
						name='days'
						label='Days'
						type='number'
						placeholder='Number of days to offer'
					/>
					<Input
						id='price'
						name='price'
						label='Price'
						type='number'
						placeholder='Expressed in pound sterling ex: £4.0'
					/>
					<div
						className={`flex gap-4 items-center ${
							isSubmitting
								? "pointer-events-none"
								: "pointer-events-auto"
						}`}>
						<SolidButton
							as={ComponentElement.BUTTON}
							submit={true}
							theme={themeBtns.greenBtn}>
							<div className='flex items-center gap-2'>
								{isSubmitting ? (
									<Spin />
								) : isEditing ? (
									<svg
										className='w-6'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'>
										<path d='M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z' />
										<path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z' />
									</svg>
								) : (
									<svg
										className='w-6'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'>
										<path
											clipRule='evenodd'
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
										/>
									</svg>
								)}
								{isEditing ? "Edit" : "Add"}
							</div>
						</SolidButton>
						{isEditing && (
							<span onClick={cancelEditingPlan}>
								<SolidButton
									as={ComponentElement.BUTTON}
									theme={themeBtns.redBtn}>
									<div className='flex items-center gap-2'>
										{isSubmitting ? (
											<Spin />
										) : (
											<svg
												className='w-6'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'>
												<path
													clipRule='evenodd'
													fillRule='evenodd'
													d='M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z'
												/>
											</svg>
										)}
										Cancel
									</div>
								</SolidButton>
							</span>
						)}
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default SubscriptionPlanForm
