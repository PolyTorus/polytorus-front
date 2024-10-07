import React, { Reducer, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appReducer } from "./updates/AppUpdate"
import { initialState } from "./models/AppState";
import { Model, Msg } from "./types";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { Box, Flex } from "@yamada-ui/react";
import { Footer } from "./components/Footer";

function App() {
	const [model, dispatch] = useReducer<Reducer<Model, Msg>, Model>(
		(state, action) => appReducer(action, state),
		initialState,
		(initial) => initial
	);

	return (
		<BrowserRouter>
            <Flex height="100vh" direction="column">
                <Flex flex={1} overflow="hidden">
                    <SideBar model={model} copyright={"PolyTorus"} />
                    <Box flex={1} overflowY="auto" display="flex" flexDirection="column">
                        <Box flex={1}>
                            <Routes>
                                <Route path="/" element={<Home model={model} dispatch={dispatch}/>}/>
                                {/* Add other routes here */}
                            </Routes>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </BrowserRouter>
	)
}

export default App;
