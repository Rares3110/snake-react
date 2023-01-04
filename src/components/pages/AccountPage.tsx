import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../../stores/UserData";
import NavBar from "../singular/NavBar";
import {GiSnakeTongue} from "react-icons/gi";
import { motion } from "framer-motion";
import { FaRegEdit } from "react-icons/fa";
import { changeIcon, getIcon } from "../../services/UserInfo";
import { logout } from "../../services/Login";
import { observer } from "mobx-react";

const AccountPage:React.FC = observer(() => {
    const navigate = useNavigate();
    const changeIconRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(userData.user === undefined) {
            navigate('/login');
        }
    });

    return (<div className="flex flex-col items-center w-full">
        <NavBar/>

        <motion.div 
        whileHover="hover"
        className="relative roundex-full overflow-hidden border-white border-4 w-[300px] h-[300px] rounded-full mt-24">
            {userData.icon === undefined ? 
            <GiSnakeTongue className="absolute top-0 w-full h-full rounded-full text-white"/>
            : 
            <img src={userData.icon} alt="" className="absolute top-0 w-full h-full rounded-full object-cover"/>}

            <input ref={changeIconRef} type="file" accept=".jpeg,.jpg,.png" className="hidden" multiple={false}
            onChange={(event) => {
                if(event.target.files !== null && event.target.files.length > 0) {
                    changeIcon(event.target.files[0]).then((value) => {
                        if(value === true) {
                            getIcon().then((value) => {
                                if(value !== undefined) {
                                    userData.setIcon(value);
                                }
                            });
                        }
                    });
                }
            }}
            />

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
        <motion.button
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className="bg-rose-800 text-white font-semibold text-3xl pb-2 pt-1 w-[150px] rounded-xl shadow-button mt-4"
        onClick={() => {
            logout();
            navigate('/');
        }}>
            Logout
        </motion.button>
    </div>)
});

export default AccountPage;