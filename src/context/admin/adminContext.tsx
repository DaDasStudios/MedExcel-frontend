import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import toast from "react-hot-toast"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { IAdminContext, IAdminState, setAdminDataType } from "../../interface/admin"
import { getUserRequest } from "../../lib/user.request"

const adminContext = createContext({} as IAdminContext)

export const useAdminContext = () => useContext(adminContext)

const initialAuthState: IAdminState = {
	token: "",
	id: "",
	user: null,
}
export const AdminContextProvider = ({ children }: PropsWithChildren) => {
	const [auth, setAuth] = useLocalStorage(initialAuthState, "medexcel_auth")

	const reset = () => setAuth(initialAuthState)

	const setAdminData: setAdminDataType = async ({ id, token }) => {
		// ? Fetch admin information
		try {
			const res = await getUserRequest(id, token)
			if (res.status !== 200 && !res.data?.user) return false

			if (res.data.user.role === "Admin") {
				setAuth({
					token,
					id,
					user: res.data.user,
				})
				return true
			} else {
				toast.error("User not authorized")
				reset()
				return false
			}
		} catch (error) {
			toast.error("Session expired")
			reset()
			return false
		}
	}

	useEffect(() => {
		;(async () => {
			if (!auth.token || !auth.id) return reset()
			await setAdminData({ id: auth.id, token: auth.token })
		})()
	}, [])

	return (
		<adminContext.Provider
			value={{
				auth,
				setAdminData,
				reset,
			}}
		>
			{children}
		</adminContext.Provider>
	)
}
