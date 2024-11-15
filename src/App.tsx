import { type Reducer, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appReducer } from "./updates/AppUpdate";
import { initialState } from "./models/AppState";
import type { Model, Msg } from "./types";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { Box, Flex } from "@yamada-ui/react";
import { TeamPage } from "./pages/Team";
import TransactionNetwork from "./pages/Nodes";

function App() {
	const [model, dispatch] = useReducer<Reducer<Model, Msg>, Model>(
		(state, action) => appReducer(action, state),
		initialState,
		(initial) => initial,
	);

	// Dummy data for testing
	const dummyNodes = Array.from({ length: 30 }, (_, i) => ({
		id: `${i + 1}`,
		name: `Node ${i + 1}`,
		// Remove the position here; it will be calculated in TransactionNetwork
	}));

	const dummyTransactions = [{ from: "1", to: "2", amount: 100 }];

	return (
		<BrowserRouter>
			<Flex height="100vh" direction="column">
				<Flex flex={1} overflow="hidden">
					<SideBar model={model} copyright={"PolyTorus"} />
					<Box flex={1} overflowY="auto" display="flex" flexDirection="column">
						<Box flex={1}>
							<Routes>
								<Route
									path="/"
									element={<Home model={model} dispatch={dispatch} />}
								/>
								<Route path="/about" element={<div>About</div>} />
								<Route path="/team" element={<TeamPage />} />
								<Route
									path="/nodes"
									element={
										<TransactionNetwork
											nodes={dummyNodes}
											transactions={dummyTransactions}
										/>
									}
								/>
							</Routes>
						</Box>
					</Box>
				</Flex>
			</Flex>
		</BrowserRouter>
	);
}

export default App;
