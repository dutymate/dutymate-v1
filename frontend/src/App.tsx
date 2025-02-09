import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<BrowserRouter>
			<Router />
			<ToastContainer
				position="top-center"
				autoClose={1800}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</BrowserRouter>
	);
}

export default App;
