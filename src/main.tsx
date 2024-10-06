import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UIProvider } from "@yamada-ui/react";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<UIProvider>
				<App />
			</UIProvider>
		</StrictMode>,
	);
} else {
	console.error("Root element not found. Unable to render the app.");
}
