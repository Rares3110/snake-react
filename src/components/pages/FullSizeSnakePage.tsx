import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import { ImShrink } from "react-icons/im";
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

    return (<div className="w-full flex flex-col items-center justify-center overflow-x-hidden">
        <div className="w-[100vmin] h-[100vmin] z-10">
            <Snake setScore={setScore}/>
        </div>

        <motion.button 
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className="mt-10 flex items-center w-[370px] h-16 rounded-full 
        bg-rose-700 select-none shadow-button"
        onClick={() => {
            navigate('/');
        }}
        >
            <ImShrink className="w-8 h-8 text-white ml-8"/>
            <div className="text-white text-2xl text-center w-full mr-10">Back to normal mode</div>
        </motion.button>

        <div className="h-[300px]"/>

        {showSideInfo && <div className="absolute top-4 right-4 flex flex-col items-center
        font-bold text-5xl text-white">
            <div>Score</div>
            <div className="mt-2">{score}</div>
        </div>}
    </div>);
}

export default FullSizeSnakePage;