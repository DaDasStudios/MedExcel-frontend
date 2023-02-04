import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "aos/dist/aos.css"
import { AuthContextProvider } from "./context/auth/authContext"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</BrowserRouter>
)
