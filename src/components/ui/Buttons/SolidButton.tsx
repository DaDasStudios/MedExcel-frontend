import { PropsWithChildren } from "react"
import { ComponentElement } from "../../../interface"

interface IProps extends PropsWithChildren {
	href?: string
	as: ComponentElement
	theme?: string
	submit?: boolean
}

const neutralBtn =
	"border-slate-100/10 bg-slate-800/50 hover:bg-slate-800/70 text-slate-50"

const blueBtn =
	"border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"

const greenBtn =
	"border-emerald-100/20 bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100"

export const themeBtns = {
	neutralBtn,
	blueBtn,
	greenBtn,
}

const SolidButton = ({
	as,
	children,
	href,
	submit,
	theme = neutralBtn,
}: IProps) => {
	const className =
		theme +
		" py-4 px-6 font-medium text-base rounded-md transition-colors border"
	switch (as) {
		case ComponentElement.A:
			return (
				<a
					className={className}
					href={href}
				>
					{children}
				</a>
			)

		case ComponentElement.BUTTON:
			return (
				<button
					type={submit ? "submit" : "button"}
					className={className}
				>
					{children}
				</button>
			)

		default:
			throw new Error("Unknown component type")
	}
}

export default SolidButton
