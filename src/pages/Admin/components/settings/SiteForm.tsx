import SolidButton, {
	themeBtns,
} from "../../../../components/ui/Buttons/SolidButton"
import ImageInput from "../../../../components/ui/ImageInput"
import Spin from "../../../../components/ui/Spin"
import { ComponentElement } from "../../../../interface"
import { useState } from "react"
import CurrentImage from "./CurrentImage"
import { useAdminContext } from "../../../../context/admin/adminContext"
import toast from "react-hot-toast"
import { uploadSiteImageRequest } from "../../../../lib/admin.request"

interface ISiteForm {
	isSubmitting: boolean
	image: File | null
}

const SiteForm = () => {
	const {
		auth: { token },
	} = useAdminContext()
	const initialState: ISiteForm = {
		isSubmitting: false,
		image: null,
	}
	const [form, setForm] = useState(initialState)
	const [imageUrl, setImageUrl] = useState('')

	async function handleSubmit(e: any) {
		setForm({ ...form, isSubmitting: true })
		e.preventDefault()

		try {
			if (!form.image) return toast.error("Image must be provided")

			const requestForm = new FormData()
			requestForm.append("image", form.image)
			const res = await uploadSiteImageRequest(requestForm, token)
			if (
				res.status === 200 &&
				res.data.message === "Website image updated"
			) {
				setImageUrl(res.data.image.url)
				return toast.success(
					"Site image updated successfully"
				)
			}

			throw new Error("Failed to upload image")
		} catch (error: any) {
			toast.error("Something went wrong... Try later")
		} finally {
			setForm({ ...form, isSubmitting: false })
		}
	}

	return (
		<section className='grid grid-cols-2 gap-5'>
			<CurrentImage
				imageUrl={imageUrl}
				setImageUrl={setImageUrl}
			/>
			<form
				onSubmit={handleSubmit}
				encType='multipart/form-data'>
				<ImageInput
					image={form.image}
					name='image'
					setValues={setForm}
				/>
				<p className='text-gray-300 flex items-center gap-3 mb-4'>
					<svg
						className='w-9'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
						/>
					</svg>
					Everytime you change the website logo, that will be
					refreshed in every single user's screen, so be careful.
				</p>
				<div className={`flex items-center justify-center ${form.isSubmitting ? "pointer-events-none" : "pointer-events-auto"}`}>
					<SolidButton
						submit={true}
						as={ComponentElement.BUTTON}
						theme={themeBtns.greenBtn}>
						<div className='flex items-center gap-2'>
							{form.isSubmitting ? (
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
										d='M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z'
									/>
								</svg>
							)}
							Upload
						</div>
					</SolidButton>
				</div>
			</form>
		</section>
	)
}

export default SiteForm
