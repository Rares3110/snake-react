import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AppleGoldenImage from "./resources/png/apple_golden.png";
import AppleNormalImage from "./resources/png/apple_normal.png";
import PortalImage from "./resources/png/portal.png";

const App:React.FC = () => {
	return (<div className="bg-[radial-gradient(#202746,#29335C)]">

		{/*load images on the start to have them ready in the game*/}
		<img src={AppleGoldenImage} className="h-0 invisible" alt=""/>
		<img src={AppleNormalImage} className="h-0 invisible" alt=""/>
		<img src={PortalImage} className="h-0 invisible" alt=""/>

		<Routes>
			<Route path='/' element={<HomePage/>}/>
		</Routes>
	</div>);
}

export default App;