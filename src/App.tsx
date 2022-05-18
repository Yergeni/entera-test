import CollegeDataContextProvider from "./context/CollegeDataContext";

import Home from "./pages/Home";

function App() {
	return (
		<CollegeDataContextProvider>
			<Home />
		</CollegeDataContextProvider>
	);
}

export default App;
