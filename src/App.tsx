import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountPage from "./components/pages/AccountPage";
import FullSizeSnakePage from "./components/pages/FullSizeSnakePage";
import HomePage from "./components/pages/HomePage";
import LeaderboardsPage from "./components/pages/Leaderboard";
import LoginPage from "./components/pages/LoginPage";
import AppleGoldenImage from "./resources/png/apple_golden.png";
import AppleNormalImage from "./resources/png/apple_normal.png";
import PortalImage from "./resources/png/portal.png";

const App: React.FC = () => {
	return (<div>

		{/*load images on the start to have them ready in the game*/}
		<img src={AppleGoldenImage} className="h-0 invisible" alt="" />
		<img src={AppleNormalImage} className="h-0 invisible" alt="" />
		<img src={PortalImage} className="h-0 invisible" alt="" />

		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/game' element={<FullSizeSnakePage />} />
			<Route path='/leaderboards' element={<LeaderboardsPage />} />
			<Route path='/account' element={<AccountPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</div>);
}

export default App;