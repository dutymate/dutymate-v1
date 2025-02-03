import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playgrounds from "./pages/playgrounds";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/playgrounds" element={<Playgrounds />} />
			</Routes>
		</Router>
	);
}

export default App;
