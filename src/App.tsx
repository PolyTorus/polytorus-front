import React, { Reducer, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appReducer } from "./updates/AppUpdate"
import { initialState } from "./models/AppState";
import { Model, Msg } from "./types";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { Box, Flex } from "@yamada-ui/react";

function App() {
	const [model, dispatch] = useReducer<Reducer<Model, Msg>, Model>(
		(state, action) => appReducer(action, state),
		initialState,
		(initial) => initial
	);

	return (
		<BrowserRouter>
			<Flex height="100vh">
				<SideBar model={model} />
				<Box flex={1} overflowY="auto">
					<Routes>
						<Route path="/" element={<Home model={model} dispatch={dispatch}/>}/>
						{/* Add other routes here */}
					</Routes>
				</Box>
			</Flex>
		</BrowserRouter>
	)
}

export default App;
