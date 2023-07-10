import { useState } from "react"
import { useTimeoutFn } from "react-use"

export function useTransition(ms?: number) {
	const [enter, setEnter] = useState(false)
	useTimeoutFn(() => setEnter(true), ms || 200)
  
  return enter
}
