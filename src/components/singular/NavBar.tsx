import React from "react";
import {motion} from "framer-motion";

import {GiSnakeTongue} from "react-icons/gi";

const NavBar:React.FC = () => {
    return (<div className="fixed z-[200] top-0 w-full h-14 bg-darker-space-cadet
    shadow-navbar-darker-space-cadet">
        <div className="absolute right-4 flex flex-row-reverse items-center h-full
        text-3xl font-semibold text-white bottom-[2px]">
            <motion.button 
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="text-3xl font-semibold text-white flex items-center">
                <GiSnakeTongue className="mr-2 mt-1 rounded-full border-2 w-9 h-9"/>
                Login
            </motion.button>

            <div className="hidden sm:block mx-3 text-4xl mb-1">
                /
            </div>

            <motion.button 
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="hidden sm:block"
            >
                Leaderboards
            </motion.button>

            <div className="hidden md:block mx-3 text-4xl mb-1">
                /
            </div>

            <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="hidden md:block"
            >
                Rules
            </motion.button>
        </div>

        <div className="absolute left-4 flex items-center h-full bottom-[2px]">
            <motion.button 
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="text-4xl text-white font-semibold">
                Home
            </motion.button>
        </div>
    </div>);
}

export default NavBar;