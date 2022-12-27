import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";

const App:React.FC = () => {
	return (<div className="bg-[radial-gradient(#202746,#29335C)]">
		<Routes>
			<Route path='/' element={<HomePage/>}/>
		</Routes>
	</div>);
}

export default App;