import { useId } from "react"
import Category, { ICategory } from "./Category"

interface IProps {
	categories: ICategory[]
}

const CategoriesList = ({ categories }: IProps) => {
	const id = useId()
	return (
		<div>
			<ul className='grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
				{categories.map((c, idx) => (
					<Category key={id + idx} category={c} />
				))}
			</ul>
		</div>
	)
}

export default CategoriesList
