import React from "react";
import NavBar from "../singular/NavBar";
import {motion} from "framer-motion";
import {ImEnlarge} from "react-icons/im";
import Snake from "../singular/Snake";

const HomePage:React.FC = () => {
    return (<div className="flex flex-col items-center">
        <NavBar/>
        <div className="w-full mt-14 h-96 bg-red-400 shadow-video-home"/>

        <motion.button 
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className="mt-10 flex items-center w-[90%] max-w-[500px] h-16 rounded-full 
        bg-rose-700 select-none shadow-button">
            <ImEnlarge className="w-12 h-12 text-white ml-8"/>
            <div className="text-white text-3xl text-center w-full mr-10">Play in full screen mode</div>
        </motion.button>

        <div className="w-[90%] max-w-[500px] mt-10">
            <Snake/>
        </div>

        <div className="h-[1200px]"/>   
    </div>);
}

export default HomePage;