import { useEffect, useState } from "react"

export function useLocalStorage<T>(
	initalState: T,
	key: string,
	parseValidators?: ((parsed: any) => boolean)[]
): [state: T, setState: React.Dispatch<React.SetStateAction<T>>, deleteState: () => void] {

	const [state, setState] = useState(() => {
		const item = localStorage.getItem(key)
		let parsed: any | null = null

		if (item) {
			parsed = JSON.parse(item)

			if (parsed) {
				if (parseValidators && parseValidators.some(validator => !validator(parsed))) {
					return initalState
				}

				return parsed
			} else return initalState
		} else return initalState
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [state])

	function deleteState() {
		localStorage.removeItem(key)
	}

	return [state, setState, deleteState]
}
