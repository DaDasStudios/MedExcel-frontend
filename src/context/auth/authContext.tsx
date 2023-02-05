import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { IAuth } from "../../interface"
import { IUser } from "../../interface/user"
import { getUserRequest } from "../../lib/user.request"

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
	const navigate = useNavigate()

	const reset = () => setAuth(authInitialState)

	const login: loginFunction = payload => {
		setAuth(payload)
	}

	useEffect(() => {
		if (!auth.token || !auth.id) return reset()

		const promiseRequest = getUserRequest(auth.id, auth.token)
		toast.promise(promiseRequest, {
			loading: "Loading user...",
			success(res) {
				const { data } = res
				if (data.user && data.user.role === "Admin") {
					navigate("/")
					reset()
					toast.error("Admin cannot sign in as an user")
					return "Everything's right but..."
				} else {
					setAuth({
						...auth,
						user: data.user,
					})
					navigate("/account")
					return "Authenticated"
				}
			},
			error() {
				reset()
				return "Session expired"
			},
		})
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
