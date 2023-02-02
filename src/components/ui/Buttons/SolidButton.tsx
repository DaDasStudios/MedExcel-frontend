import { PropsWithChildren } from "react"
import { ComponentElement } from "../../../interface"

interface IProps extends PropsWithChildren {
	href?: string
	as: ComponentElement
}

const SolidButton = ({ as, children, href }: IProps) => {
	const className =
		"py-4 px-6 font-medium text-base rounded-md transition-colors border border-slate-100/10 bg-slate-800/50 hover:bg-slate-800/70 text-slate-50"
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
			return <button className={className}>{children}</button>

		default:
			throw new Error("Unknown component type")
	}
}

export default SolidButton
