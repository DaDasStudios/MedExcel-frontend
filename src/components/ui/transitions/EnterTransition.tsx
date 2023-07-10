import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { useTransition } from "../../../hooks/useTransition"
import { TransitionProps } from "."

export default function EnterTransition({ children, unmount = true }: TransitionProps) {
	const enter = useTransition()

	return (
		<Transition
			as={Fragment}
			show={enter}
			enter='transform transition duration-[600ms]'
			enterFrom='opacity-0 scale-90'
			enterTo='opacity-100 scale-100'
			unmount={unmount}
		>
			{children}
		</Transition>
	)
}
