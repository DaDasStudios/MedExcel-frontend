import { useField } from "formik"

interface IProps {
	label: string
	name: string
	id: string
	placeholder?: string
	type?: string
	value?: any
	readOnly?: boolean
}

export const Input = ({ label, ...props }: IProps) => {
	const [field, meta] = useField(props)
	return (
		<div className='flex flex-col gap-2 mb-4 tracking-tight'>
			<label
				className='text-base text-gray-300 font-medium'
				htmlFor={props.id || props.name}>
				{label}
			</label>
			<input
				style={{
					animation: meta.touched && meta.error ? "0.4s shake" : "",
				}}
				className={`bg-transparent border border-gray-100/10 shadow-md rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent `}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<p className='text-right text-rose-500 font-medium text-base'>
					{meta.error}
				</p>
			) : null}
		</div>
	)
}
