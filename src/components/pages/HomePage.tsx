import React, {useState} from "react";
import NavBar from "../singular/NavBar";
import {motion} from "framer-motion";
import Snake from "../singular/Snake";
import { useNavigate } from "react-router-dom";

import {ImEnlarge} from "react-icons/im";
import {MdLeaderboard} from "react-icons/md";
import {AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineEnter} from "react-icons/ai";
import Pic1Header from "../../resources/png/gather-points.png";
import Pic2Header from "../../resources/png/show-black-hole.png";
import Pic3Header from "../../resources/png/avoid-obstacles.png";
import { BsFillMouse2Fill } from "react-icons/bs";
import InfoLogin from "../singular/InfoLogin";

const HomePage:React.FC = () => {
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    return (<div className="flex flex-col w-full items-center">
        <NavBar/>
        <div className="relative w-full h-80 mt-14">
            <div className="flex w-full h-full">
                <img className="w-1/3 object-cover object-top" src={Pic1Header} alt=""/>
                <img className="w-1/3 object-cover" src={Pic2Header} alt=""/>
                <img className="w-1/3 object-cover" src={Pic3Header} alt=""/>
            </div>
            <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1 h-full bg-black"/>
            <div className="absolute top-0 right-1/3 translate-x-1/2 w-1 h-full bg-black"/>
            <div className="absolute top-0 w-full h-full bg-black opacity-20"/>
            <div className="absolute top-0 w-full h-full shadow-video-home"/>
            <div className="absolute top-10 w-full text-7xl text-center text-white font-bold">
                SuperSnake
            </div>
        </div>

        <motion.button 
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className="mt-14 flex items-center w-[380px] h-16 rounded-full 
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
            <Snake setScore={setScore}/>
        </div>
        <div className="mt-2 text-4xl font-bold text-white">Score {score}</div>
        
        <InfoLogin/>

        <motion.button 
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className="mt-14 flex items-center w-[380px] h-16 rounded-full 
        bg-green-600 select-none shadow-button"
        onClick={() => {
            navigate('/leaderboards');
            window.scrollTo(0, 0);
        }}
        >
            <MdLeaderboard className="w-10 h-10 text-white ml-8"/>
            <div className="text-white text-2xl text-center w-full mr-10">Go to the Leaderboard!</div>
        </motion.button>

        <h1 id="Rules" className="text-white font-semibold text-4xl border-b-4 pb-1 border-white mt-14">How to play</h1>

        <div className="flex flex-col items-center sm:flex-row sm:items-start justify-between mt-10 gap-10 w-[90%] sm:w-[600px]">
            <img className="w-64 h-64 object-cover object-top" src={Pic1Header} alt=""/>
            <div className="text-white text-2xl w-full sm:w-auto">
                Gather apples to add to your <span className="text-green-400">score!</span> After a certain number of apples, the <span className="text-gold">golden apples</span> will appear and they are more valuable! Also, apples become more valuable in later levels.
            </div>
        </div>

        <div className="flex flex-col-reverse items-center sm:flex-row sm:items-start justify-between mt-10 gap-10 w-[90%] sm:w-[600px]">
            <div className="text-white text-2xl w-full sm:w-auto">
                After you gather a certain ammount of apples from a level, a <span className="text-red-700">portal</span> will appear! Entering the portal will teleport the snake to the next level, losing it's size.
            </div>
            <img className="w-64 h-64 object-cover object-top" src={Pic2Header} alt=""/>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:items-start justify-between mt-10 gap-10 w-[90%] sm:w-[600px]">
            <img className="w-64 h-64 object-cover object-top" src={Pic3Header} alt=""/>
            <div className="text-white text-2xl w-full sm:w-auto">
                Avoid the <span className="text-amber-600">spikes!</span> They act like walls and if you hit them you lose! Also, don't hit the <span className="text-amber-600">margins of the board</span> if you don't want to restart! 😉
            </div>
        </div>

        <h1 className="text-white font-semibold text-4xl border-b-4 pb-1 border-white mt-10">Controls</h1>

        <div className="flex flex-col items-center sm:flex-row sm:items-start justify-between mt-10 w-[90%] sm:w-[500px]">
            <div className="flex w-44">
                <div
                className="h-20 shadow-button rounded-xl w-24 flex flex-col items-center justify-center bg-gray-700 text-white font-semibold">
                    <div className="text-2xl">Enter</div>
                    <AiOutlineEnter className="w-6 h-6"/>
                </div>
                <BsFillMouse2Fill className="h-20 w-20 ml-10 sm:ml-0 text-gray-500"/>
            </div>
            <div className="text-white text-2xl w-[320px] mt-2 sm:mt-0 sm:w-auto">
                Press <span className="text-green-500">ENTER</span> or <span className="text-green-500">LEFT-CLICK</span> on the board to start the game
            </div>
        </div>

        <div className="flex justify-around gap-10 mt-8">

            <div className="grid grid-cols-3 grid-rows-2 w-32 h-20 gap-1">
                <div className="col-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    W
                </div>
                <div className="row-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    A
                </div>
                <div className="row-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    S
                </div>
                <div className="row-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    D
                </div>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 w-32 h-20 gap-1">
                <div className="col-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    <AiOutlineArrowUp/>
                </div>
                <div className="row-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    <AiOutlineArrowLeft/>
                </div>
                <div className="row-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    <AiOutlineArrowDown/>
                </div>
                <div className="row-start-2 shadow-button rounded-xl w-full h-full flex items-center justify-center text-2xl bg-gray-700 text-white font-semibold">
                    <AiOutlineArrowRight/>
                </div>
            </div>

        </div>

        <div className="w-full flex justify-center mb-52">
            <div className="text-white text-2xl w-[320px] sm:w-[540px] mt-4">
                Press either <span className="text-green-500">W, A, S, D</span> or the <span className="text-green-500">arrows</span> to change the direction of the snake.
            </div>
        </div>
    </div>);
};

export default HomePage;