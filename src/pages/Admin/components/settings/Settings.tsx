import { Link } from "react-router-dom"
import Breadcrumb from "../../../../components/ui/Breadcrumb"
import SiteForm from "./SiteForm"


const Settings = () => {
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
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z'
							/>
							<path d='M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z' />
						</svg>
						Admin
					</span>,
					<span>Settings</span>,
					<p className='text-gray-300'>Site</p>,
				]}
			/>
			<h1 className='text-2xl font-semibold my-4'>
				Website configuration
			</h1>
			<SiteForm></SiteForm>
			<p className='text-gray-300 mt-4 flex gap-2 items-center '>
				<svg
					className="w-6"
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.732 6.232a2.5 2.5 0 013.536 0 .75.75 0 101.06-1.06A4 4 0 006.5 8v.165c0 .364.034.728.1 1.085h-.35a.75.75 0 000 1.5h.737a5.25 5.25 0 01-.367 3.072l-.055.123a.75.75 0 00.848 1.037l1.272-.283a3.493 3.493 0 011.604.021 4.992 4.992 0 002.422 0l.97-.242a.75.75 0 00-.363-1.456l-.971.243a3.491 3.491 0 01-1.694 0 4.992 4.992 0 00-2.258-.038c.19-.811.227-1.651.111-2.477H9.75a.75.75 0 000-1.5H8.136A4.397 4.397 0 018 8.165V8c0-.641.244-1.28.732-1.768z'
					/>
				</svg>
				Want to modify subscription plans? Go to
				<Link className="text-gray-100 hover:underline" to='/admin/pricing'>Pricing section.</Link>
			</p>
		</div>
	)
}

export default Settings
