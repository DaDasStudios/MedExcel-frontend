import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "aos/dist/aos.css"
import { AuthContextProvider } from "./context/auth/authContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AuthContextProvider>
		<App />
	</AuthContextProvider>
)
