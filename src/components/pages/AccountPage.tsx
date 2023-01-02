import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../../stores/UserData";
import NavBar from "../singular/NavBar";
import {GiSnakeTongue} from "react-icons/gi";
import { motion } from "framer-motion";
import { FaRegEdit } from "react-icons/fa";

const AccountPage:React.FC = () => {
    const navigate = useNavigate();
    const changeIconRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(userData.user === null) {
            navigate('/login');
        }
    });

    return (<div className="flex flex-col items-center w-full">
        <NavBar/>

        <motion.div 
        whileHover="hover"
        className="relative roundex-full overflow-hidden border-white border-4 w-[300px] h-[300px] rounded-full mt-24">
            <GiSnakeTongue className="absolute top-0 w-full h-full rounded-full text-white"/>
            <input ref={changeIconRef} type="file" accept=".jpeg,.jpg,.png" className="hidden"/>
            <motion.button
            initial={{
                opacity: 0
            }}
            variants={{
                hover: {
                    opacity: 1,
                    transition: {
                        duration: 0.2,
                        type: 'tween',
                        ease: 'easeOut'
                    }
                }
            }}
            whileTap={{
                scale: 0.8
            }}
            onClick={() => changeIconRef.current?.click()}
            className="relative top-[-25%] left-[-25%] w-[150%] h-[150%] bg-white bg-opacity-70 flex items-center justify-center">
                <FaRegEdit className="text-teal-700 w-1/4 h-1/4 ml-5"/>
            </motion.button>
        </motion.div>

        <div className="text-5xl text-white font-semibold mt-4">{userData.user?.displayName}</div>
        <div className="text-xl text-white font-semibold mt-1">{userData.user?.email}</div>
    </div>)
}

export default AccountPage;