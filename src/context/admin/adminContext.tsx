import { createContext, PropsWithChildren, useContext } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import {
	IAdminContext,
	IAdminState,
	setAdminDataType,
} from "../../interface/admin"
import { getUserRequest } from "../../lib/user.request"

const adminContext = createContext({} as IAdminContext)

export const useAdminContext = () => useContext(adminContext)

const initialAuthState: IAdminState = {
	token: "",
	id: "",
	user: null,
}

export const AdminContextProvider = ({ children }: PropsWithChildren) => {
	const [auth, setAuth] = useLocalStorage("medexcel_auth", initialAuthState)

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
			}
			throw new Error("User not authorized")
		} catch (error) {
			reset()
			return false
		}
	}

	return (
		<adminContext.Provider
			value={{
				auth,
				setAdminData,
				reset,
			}}>
			{children}
		</adminContext.Provider>
	)
}
