import { useField } from "formik"
import { PropsWithChildren } from "react"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import { IQuestionFormState } from "../../../../../../interface/admin"

interface IProps {
	label: string
	name: string
	id: string
	placeholder?: string
	type?: string
	value?: any
	readOnly?: boolean
}

interface ITextAreaProps extends IProps {
	setValues: (
		values: React.SetStateAction<any>,
		shouldValidate?: boolean | undefined
	) => void
}

export const TextArea = ({ label, setValues, ...props }: ITextAreaProps) => {
	const [field, meta] = useField({ ...props, as: "textarea" })
	const { questionForm } = useExamsAdminContext()
	return (
		<div className='flex flex-col gap-2 mb-4 tracking-tight'>
			<label
				className='text-base text-gray-300 font-medium'
				htmlFor={props.id || props.name}>
				{label}
			</label>
			<textarea
				style={{
					animation: meta.touched && meta.error ? "0.4s shake" : "",
				}}
				className={`bg-transparent border-2 border-gray-100/10 shadow-md rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent h-40`}
				{...field}
				{...props}
				onChange={e => {
					questionForm.setMarkdownContent(e.target.value)
					setValues((values: any) => {
						return { ...values, [props.name]: e.target.value }
					})
				}}
			/>
			{meta.touched && meta.error ? (
				<p className='text-right text-rose-500 font-medium text-base'>
					{meta.error}
				</p>
			) : null}
		</div>
	)
}

interface ISimpleInputProps extends IProps {
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
	value: string
	className?: string
}

export const SimpleInput = ({ className = "", ...props }: ISimpleInputProps) => {
	return (
		<div className='flex flex-col gap-2 mb-4 tracking-tight'>
			<label
				className='text-base text-gray-300 font-medium'
				htmlFor={props.id || props.name}>
				{props.label}
			</label>
			<input
				className={`bg-transparent border-2 border-gray-100/10 shadow-md rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent ${className}`}
				{...props}
			/>
		</div>
	)
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
				className={`bg-transparent border-2 border-gray-100/10 shadow-md rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent `}
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

export const Select = ({
	label,
	children,
	...props
}: IProps & PropsWithChildren) => {
	const [field, meta] = useField({ ...props, as: "select" })
	return (
		<div className='flex flex-col gap-2 mb-4 tracking-tight'>
			<label
				className='text-base text-slate-300 font-medium'
				htmlFor={props.id || props.name}>
				{label}
			</label>
			<div className='relative bg-slate-800/50-500 border-2 border-slate-100/10 rounded-md text-slate-300 py-3 '>
				<select
					className='bg-transparent outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent appearance-none pl-4 pr-8'
					style={{
						animation:
							meta.touched && meta.error ? "0.4s shake" : "",
					}}
					{...field}
					{...props}>
					{children}
				</select>
				<span className='absolute flex items-center right-0 mx-2 top-0 bottom-0'>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
						/>
					</svg>
				</span>
			</div>

			{meta.touched && meta.error ? (
				<p className='text-right text-rose-500 font-medium text-base'>
					{meta.error}
				</p>
			) : null}
		</div>
	)
}
