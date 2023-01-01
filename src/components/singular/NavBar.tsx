import React from "react";
import {motion} from "framer-motion";

const NavBar:React.FC = () => {
    return (<div className="fixed z-[200] top-0 w-full h-14 bg-darker-space-cadet
    shadow-navbar-darker-space-cadet">
        <div className="absolute flex items-center h-full right-4">
            <motion.button 
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="text-3xl font-semibold text-white">
                Login
            </motion.button>
        </div>
    </div>);
}

export default NavBar;