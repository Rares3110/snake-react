import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import { TbArrowsMinimize } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Snake from "../singular/Snake";

const FullSizeSnakePage:React.FC = () => {
    const [showSideInfo, setShowSideInfo] = useState<boolean>(() => {
        if(window.innerHeight + 320 <= window.innerWidth) {
            return true;
        } else {
            return false;
        }
    });
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if(window.innerHeight + 320 <= window.innerWidth) {
                setShowSideInfo(true);
            } else {
                setShowSideInfo(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (<div 
    style={{overflowY: showSideInfo ? 'hidden' : 'auto'}}  
    className="w-full flex flex-col items-center justify-center overflow-x-hidden"
    >
        <div className="w-[100vmin] h-[100vmin] z-10">
            <Snake setScore={setScore}/>
        </div>

        {!showSideInfo && 
        <div className="flex flex-col items-center">
            <div className="text-4xl mt-4 text-white font-bold">Score {score}</div>

            <motion.button 
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            className="mt-6 flex items-center w-[310px] h-16 rounded-full 
            bg-rose-700 select-none shadow-button"
            onClick={() => {
                navigate('/');
            }}
            >
                <TbArrowsMinimize className="w-10 h-10 mt-[2px] text-white ml-6 mr-1"/>
                <div className="text-white text-2xl text-center w-full mr-6">Back to normal mode</div>
            </motion.button>

            <div className="h-[100px]"/>
        </div>}

        {showSideInfo && <div className="absolute top-4 right-3 flex flex-col items-center
        font-bold text-5xl text-white">
            <div>Score</div>
            <div className="mt-2">{score}</div>
                
            <motion.button className="h-14 flex items-center
            bg-rose-700 rounded-2xl shadow-button mt-4"
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={() => {
                navigate('/');
            }}
            >
                <TbArrowsMinimize className="w-[50%] h-[50%] text-white ml-1"/>
                <div className="text-2xl ml-1 mr-1">Minimize</div>
            </motion.button>
        </div>}
    </div>);
}

export default FullSizeSnakePage;