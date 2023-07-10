import { Fragment, PropsWithChildren, useState } from "react"
import { Transition } from "@headlessui/react"
import { useTimeoutFn } from "react-use"

export default function EnterTransition( {children}: PropsWithChildren) {
	const [enter, setEnter] = useState(false)
  
	useTimeoutFn(() => setEnter(true), 200)

	return (
		<Transition
			as={Fragment}
			show={enter}
			enter='transform transition duration-[400ms]'
			enterFrom='opacity-0 scale-95'
			enterTo='opacity-100 scale-100'
			leave='transform duration-200 transition ease-in-out'
			leaveFrom='opacity-100 scale-100 '
			leaveTo='opacity-0 scale-95'
		>
			{children}
		</Transition>
	)
}