import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
} from "react"
import { IAuth } from "../../interface"

interface IAuthContext {
    
}

const AuthContext = createContext({} as IAuthContext)
AuthContext.displayName = "Auth Information"

export const useAuthContext = () => useContext(AuthContext)

const authInitialState: IAuth = {
	token: '',

}

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
