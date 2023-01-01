import React from "react";
import NavBar from "../singular/NavBar";
import {motion} from "framer-motion";
import {ImEnlarge} from "react-icons/im";
import Snake from "../singular/Snake";

import Pic1Header from "../../resources/png/gather-points.png";
import Pic2Header from "../../resources/png/show-black-hole.png";
import Pic3Header from "../../resources/png/avoid-obstacles.png";
import { useNavigate } from "react-router-dom";

const HomePage:React.FC = () => {
    const navigate = useNavigate();

    return (<div className="flex flex-col w-full items-center">
        <NavBar/>
        <div className="relative w-full h-80 mt-14">
            <div className="flex w-full h-full shadow-video-home">
                <img className="w-1/3 object-cover object-top" src={Pic1Header} alt=""/>
                <img className="w-1/3 object-cover" src={Pic2Header} alt=""/>
                <img className="w-1/3 object-cover" src={Pic3Header} alt=""/>
            </div>
            <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1 h-full bg-black"/>
            <div className="absolute top-0 right-1/3 translate-x-1/2 w-1 h-full bg-black"/>
            <div className="absolute top-0 w-full h-full bg-black opacity-30"/>
            <div className="absolute top-10 w-full text-7xl text-center text-white font-bold">
                SuperSnake
            </div>
        </div>

        <motion.button 
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className="mt-10 flex items-center w-[380px] h-16 rounded-full 
        bg-rose-700 select-none shadow-button"
        onClick={() => {
            navigate('/game');
            window.scrollTo(0, 0);
        }}
        >
            <ImEnlarge className="w-8 h-8 text-white ml-8"/>
            <div className="text-white text-2xl text-center w-full mr-10">Play in full screen mode</div>
        </motion.button>

        <div className="w-[70vmin] mt-10">
            <Snake/>
        </div>

        <div className="h-[1200px]"/>   
    </div>);
}

export default HomePage;