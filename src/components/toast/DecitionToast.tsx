import { toast, Toast } from "react-hot-toast"

interface IProps {
	text: string
	afirmativeCallback: any
	negativeCallback?: Function
	t: Toast
}

const DecitionToast = ({
	t,
	text,
	afirmativeCallback,
	negativeCallback,
}: IProps) => {
	return (
		<div
			className={`bg-white rounded-md shadow-md p-3 ${
				t.visible ? "animate-enter" : "animate-leave"
			}`}
		>
			<p className='text-gray-800'>{text}</p>
			<div className='flex justify-center items-center gap-4 mt-2 font-medium'>
				<button
					className='bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-2 px-5 cursor-pointer'
					type='button'
					onClick={() => {
						afirmativeCallback()
						toast.dismiss(t.id)
					}}
				>
					Yes
				</button>

				<button
					className='bg-red-600 hover:bg-red-500 text-white rounded-md py-2 px-5 cursor-pointer'
					type='button'
					onClick={() => {
						toast.dismiss(t.id)
						if (negativeCallback) negativeCallback()
					}}
				>
					No
				</button>
			</div>
		</div>
	)
}
export default DecitionToast
