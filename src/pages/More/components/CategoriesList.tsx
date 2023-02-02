import Category, { ICategory } from "./Category"

interface IProps {
	categories: ICategory[]
}

const CategoriesList = ({ categories }: IProps) => {
	return (
		<div>
			<ul className="grid grid-cols-3 gap-6 mt-4">
                {categories.map(c => <Category
                    category={c}
                />)}
            </ul>
		</div>
	)
}

export default CategoriesList
