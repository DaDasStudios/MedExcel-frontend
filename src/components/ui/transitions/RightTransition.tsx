import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { useTransition } from "../../../hooks/useTransition"
import { TransitionProps } from "."

export default function RightTransition({ children, unmount = true }: TransitionProps) {
	const enter = useTransition(200)

	return (
		<Transition
			as={Fragment}
			show={enter}
			enter='transform transition duration-[800ms]'
			enterFrom='opacity-0 -translate-x-1/2'
			unmount={unmount}
			enterTo='opacity-100 translate-x-0'
		>
			{children}
		</Transition>
	)
}
