import { PropsWithChildren } from "react"
import { ComponentElement } from "../../../interface"

interface IProps extends PropsWithChildren {
	href?: string
	as: ComponentElement
	theme?: string
	submit?: boolean
	onClick?: () => void
}

const neutralBtn =
	"border-2  border-slate-100/10 bg-slate-800 hover:bg-slate-700 text-slate-200"

const blueBtn =
	"border border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"

const greenBtn =
	"border border-emerald-100/20 bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-100"

const redBtn =
	"border border-rose-100/20 bg-rose-700/50 hover:bg-rose-700/70 text-rose-100"

export const themeBtns = {
	neutralBtn,
	blueBtn,
	greenBtn,
	redBtn
}

const SolidButton = ({
	as,
	children,
	href,
	submit,
	onClick,
	theme = neutralBtn,
}: IProps) => {
	const className =
		theme +
		" text-center focus:outline-none p-4 md:py-4 md:px-6 font-medium text-base rounded-md transition-colors"
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
					onClick={onClick}
				>
					{children}
				</button>
			)

		default:
			throw new Error("Unknown component type")
	}
}

export default SolidButton
