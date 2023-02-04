import { useField } from "formik"
import { ReactNode } from "react"

interface IProps {
	label: string
	name: string
	id: string
	placeholder?: string
	type?: string
	value?: any
	readOnly?: boolean
}

export const Checkbox = ({
	children,
	...props
}: {
	name: string
	children: ReactNode
}) => {
	const [field, meta] = useField({ ...props, type: "checkbox" })
	return (
		<div className='flex flex-col gap-3 mb-6 tracking-tight'>
			<label className='text-slate-400 flex gap-3 font-medium items-center'>
				<input
					className={`w-4 h-4 bg-black text-blue-500 border-gray-600 rounded focus:ring-blue-600 focus:ring-2`}
					type='checkbox'
					{...field}
					{...props}
				/>
				{children}
			</label>
			{meta.touched && meta.error ? (
				<p className='text-right text-rose-500 font-medium text-base'>
					{meta.error}
				</p>
			) : null}
		</div>
	)
}

export const Input = ({ label, ...props }: IProps) => {
	const [field, meta] = useField(props)
	return (
		<div className='flex flex-col gap-3 mb-6 tracking-tight'>
			<label
				className='text-base text-slate-300 font-medium'
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			<input
				style={{
					animation: meta.touched && meta.error ? "0.4s shake" : "",
				}}

				className={`bg-transparent border-2 border-slate-100/10 rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent`}
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
