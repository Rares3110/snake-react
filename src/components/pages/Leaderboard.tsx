import React from "react";
import NavBar from "../singular/NavBar";

const LeaderboardsPage:React.FC = () => {
    return (<div className="w-full flex flex-col items-center">
        <NavBar/>

        <h1 className="text-5xl text-white font-semibold border-b-[6px] pb-1 border-white w-[90%] max-w-[800px] mt-40">Learderboard</h1>
        

        <div className="h-72"/>
    </div>);
}

export default LeaderboardsPage;