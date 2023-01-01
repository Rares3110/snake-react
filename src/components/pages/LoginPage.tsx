import React, { useState } from "react";
import NavBar from "../singular/NavBar";
import { TextBox, TextBoxTypes } from "../utility/TextBox";
import { motion } from "framer-motion";

const LoginPage:React.FC = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (<div className="w-full flex flex-col items-center">
        <NavBar/>

        <div className="mt-20 flex flex-col items-center w-[350px] h-[400px] rounded-lg bg-white shadow-login-form">
            <div className="mt-4 text-2xl font-semibold text-midnight-blue">
                Welcome to SuperSnake!
            </div>

            <div className="flex rounded-xl w-[240px] mt-6 text-lg font-semibold border-[1.5px] border-midnight-blue">
                <motion.button 
                onClick={() => setIsLogin(true)}
                className={"w-1/2 rounded-xl " + (isLogin ? "bg-midnight-blue text-white outline outline-2 outline-midnight-blue" : "")}>
                    Login
                </motion.button>

                <motion.button
                onClick={() => setIsLogin(false)}
                className={"w-1/2 rounded-xl " + (!isLogin ? "bg-midnight-blue text-white outline outline-2 outline-midnight-blue" : "")}>
                    Sign up
                </motion.button>
            </div>

            <TextBox className="mt-4" label="Email" placeholder="email@example.com"/>
            {!isLogin && <TextBox className="mt-4" label="Username" placeholder="Username"/>}
            <TextBox className="mt-4" label="Password" placeholder="••••••••••" type={TextBoxTypes.Password}/>
            {!isLogin && <TextBox className="mt-4" label="Confirm Password" placeholder="••••••••••" type={TextBoxTypes.Password}/>}
            {isLogin ? 
            <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="absolute bottom-6 w-[120px] bg-midnight-blue text-white font-bold text-xl rounded-lg pt-[1px] pb-1 shadow-button">
                Login
            </motion.button>
            : 
            <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="absolute bottom-6 w-[120px] bg-rose-800 text-white font-bold text-xl rounded-lg pt-[1px] pb-1 shadow-button">
                Sign up
            </motion.button>}
        </div>

        <div className="h-[200px]"/>
    </div>);
}

export default LoginPage;