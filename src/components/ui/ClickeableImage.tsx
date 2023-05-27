import { useSiteContext } from "../../context/site/siteContext"
import { ComponentElement } from "../../interface"
import SolidButton, { themeBtns } from "./Buttons/SolidButton"
import Tooltip from "./Tooltip"

interface IProps {
	src?: string
	alt?: string
}

const ClickeableImage = ({ src, alt, ...props }: IProps) => {
	const { modal } = useSiteContext()

	function handleOnClick() {
		modal.open(
			<div className="flex items-center flex-col gap-4 mt-4">
				<img
					className='cursor-pointer object-contain w-[150%] mx-auto block rounded-lg'
					src={src}
					alt={alt}
				/>
				<SolidButton
					as={ComponentElement.BUTTON}
					theme={themeBtns.blueBtn}
					onClick={openNewTab}
				>
					<div className='flex justify-center gap-x-2 items-center'>
						<svg
							className='w-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path d='M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' />
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
							/>
						</svg>
						Open in new tab
					</div>
				</SolidButton>
			</div>
		)
	}

	function openNewTab() {
		const newWindow = window.open("", "_blank")
		newWindow?.document.write(`<img src=${src} alt="Image"/>`)
	}

	return (
		<div>
			<Tooltip message='Expand'>
				<img
					className='cursor-pointer object-contain w-52 sm:w-72 md:w-80 lg:w-96 mx-auto hover:scale-105 transition-all duration-500 block'
					onClick={handleOnClick}
					src={src}
					alt={alt}
				/>
			</Tooltip>
		</div>
	)
}
export default ClickeableImage
