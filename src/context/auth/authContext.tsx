import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react"
import { toast } from "react-hot-toast"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { IAuth } from "../../interface"
import { IUser } from "../../interface/user"
import { getUserRequest } from "../../lib/use.request"

type loginFunction = (payload: {
	token: string
	id: string
	user: IUser | null
}) => void

interface IAuthContext {
	auth: IAuth
	login: loginFunction
	reset: () => void
}

const AuthContext = createContext({} as IAuthContext)
AuthContext.displayName = "Auth Information"

export const useAuthContext = () => useContext(AuthContext)

const authInitialState: IAuth = {
	token: "",
	id: "",
	user: null,
}

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [auth, setAuth] = useLocalStorage("medexcel_auth", authInitialState)

	const login: loginFunction = payload => {
		setAuth(payload)
	}

	const reset = () => setAuth(authInitialState)

	useEffect(() => {
		;(async () => {
			if (!auth.token || !auth.id) return reset()

			try {
				const { data } = await getUserRequest(auth.id, auth.token)
				setAuth({ ...auth, user: data.user })
			} catch (error: any) {
				toast.error("Session expired")
			}
		})()
	}, [auth.token])

	return (
		<AuthContext.Provider
			value={{
				auth,
				login,
				reset,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
