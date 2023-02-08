import { Form, Formik } from "formik"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import SolidButton, {
	themeBtns,
} from "../../../../../components/ui/Buttons/SolidButton"
import Spin from "../../../../../components/ui/Spin"
import { useAdminContext } from "../../../../../context/admin/adminContext"
import { ComponentElement, ISubscriptionPlan } from "../../../../../interface"
import { addSubscriptinoPlanRequest } from "../../../../../lib/admin.request"
import { Input } from "./Input"

interface IProps {
	setSubscriptions: React.Dispatch<React.SetStateAction<ISubscriptionPlan[]>>
}

const AddSubscription = ({ setSubscriptions }: IProps) => {
	const { auth } = useAdminContext()
	const initialValues = {
		name: "",
		description: "",
		days: "",
		price: "",
	}
	return (
		<Formik
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
					const res = await addSubscriptinoPlanRequest(
						{
							name,
							description,
							days: parseInt(days),
							price: parseFloat(price),
						},
						auth.token
					)
					if (res.status === 200 && res.data.message === "Subscription pushed") {

						return toast.success("New subscription plan added")
					}

					throw new Error("Could not create subscription plan")
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
						className={`${
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
								Add
							</div>
						</SolidButton>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default AddSubscription
