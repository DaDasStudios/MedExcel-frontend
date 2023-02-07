
interface IProps<T> {
	name: string
	image: File | null
	setValues: React.Dispatch<React.SetStateAction<T>>
}

function ImageInput<T>({ name, setValues, image }: IProps<T>) {
	return (
		<label
			className='cursor-pointer flex flex-col border border-gray-100/10 rounded-md p-5 gap-3 text-gray-200 hover:bg-gray-100/5 items-center justify-center mb-8'
			htmlFor='image'>
			<h6 className='text-xl'>Select image</h6>
			<svg
				className='w-16'
				fill='currentColor'
				viewBox='0 0 20 20'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'>
				<path
					clipRule='evenodd'
					fillRule='evenodd'
					d='M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z'
				/>
			</svg>
			<input
				className='hidden'
				id='image'
				type='file'
				accept='image/png, image/jpg, image/gif, image/jpeg'
				name={name}
				onChange={e => {
					setValues(values => { return { ...values, [e.target.name]: e.target.files ? e.target.files[0] : ''  }})
				}}
			/>
			{image ? image.name : "No image selected"}
		</label>
	)
}

export default ImageInput
