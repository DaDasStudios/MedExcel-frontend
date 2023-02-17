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
	refreshUser: () => void
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

	async function refreshUser() {
		try {
			const { data } = await getUserRequest(auth.id, auth.token)
			if (data.user && data.user.role === "Admin") {
				navigate("/")
				reset()
				toast.error("Admin cannot sign in as an user")
			} else {
				setAuth({
					...auth,
					user: data.user,
				})
			}
		} catch (error) {
			reset()
			navigate("/signin")
			toast.error("Session expired")
		}
	}

	useEffect(() => {
		if (!auth.token || !auth.id) return reset()
		refreshUser()
	}, [auth.token])

	return (
		<AuthContext.Provider
			value={{
				auth,
				login,
				reset,
				refreshUser
			}}>
			{children}
		</AuthContext.Provider>
	)
}
