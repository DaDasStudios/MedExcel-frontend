
export interface ICategory {
	imageUrl: string
	name: string
}

interface IProps {
	category: ICategory
}
const Category = ({ category }: IProps) => {
	return (
		<li className='rounded-md shadow-lg border border-slate-100/10 overflow-hidden relative group animate-enter'>
			<img className='object-cover h-full' src={category.imageUrl} alt={category.name} />
			<div className='absolute inset-0 flex items-center justify-center opacity-100 bg-slate-900/50 group-hover:opacity-0 group-hover:pointer-events-none transition-opacity'>
				<h6 className='text-center font-semibold tracking-wide text-2xl text-slate-100'>{category.name}</h6>
			</div>
		</li>
	)
}

export default Category
