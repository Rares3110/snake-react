import React, { useEffect, useState } from "react";
import NavBar from "../singular/NavBar";
import { TextBox, TextBoxTypes } from "../utility/TextBox";
import { motion } from "framer-motion";
import WaveImage from "../../resources/png/wave-haikei.png";
import { useNavigate } from "react-router-dom";
import userData from "../../stores/UserData";
import { Login, signUp } from "../../services/Login";

const LoginPage:React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {
        if(userData.user !== null)
            navigate('/account');
    });

    const handleLogin = () => {
        if(validateEmail(email) && password !== "") {
            Login(email, password).then((result) => {
                if(result === true) {
                    navigate('/');
                }
            });
        }
    }

    const handleSignUp = () => {
        if(validateEmail(email) && username !== "" && password !== "" && password === password2) {
            signUp(email, password).then((result) => {
                if(result === true) {
                    navigate('/');
                }
            });
        }
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateFormValue = (value: string) => {
        return value.match(/(?=.*[0-9a-zA-Z]).{6,}/);
    }

    return (<div className="w-full flex flex-col items-center">
        <NavBar/>

        <div className="relative mt-20 flex flex-col items-center w-[360px] h-[400px] rounded-lg bg-white shadow-login-form">
            <img src={WaveImage} className="absolute top-0 h-48 w-full rotate-180 rounded-md" alt=""/>
            
            <div className="mt-5 text-3xl font-semibold text-white z-10">
                Welcome to SuperSnake!
            </div>

            <div className="flex rounded-xl w-[240px] mt-12 text-lg font-semibold z-10 outline outline-2 outline-midnight-blue">
                <motion.button 
                onClick={() => {
                    setIsLogin(true);
                    setUsername("");
                    setPassword2("");
                }}
                className={"relative top-0 w-1/2 rounded-xl " + (isLogin ?  "text-white" : "text-midnight-blue")}>
                    {isLogin && <motion.div layoutId="formOption" className="absolute top-0 w-full h-full ml-[-1px] rounded-xl border-midnight-blue
                    bg-midnight-blue"/>}
                    <div className="relative top-0">Login</div>
                </motion.button>

                <motion.button 
                onClick={() => {
                    setIsLogin(false);
                }}
                className={"relative top-0 w-1/2 rounded-xl " + (!isLogin ?  "text-white" : "text-midnight-blue")}>
                    {!isLogin && <motion.div layoutId="formOption" className="absolute top-0 w-full h-full ml-[1px] rounded-xl border-midnight-blue
                    bg-midnight-blue"/>}
                    <div className="relative top-0">Sign up</div>
                </motion.button>
            </div>

            <TextBox className="mt-4" label="Email" setValue={setEmail} placeholder="email@example.com"/>
            {!validateEmail(email) && 
            <div className="text-rose-800 text-sm w-[230px] h-3 z-[20]">Email required!</div> 
            }
            
            {!isLogin && <TextBox className="mt-4" label="Username" setValue={setUsername} placeholder="Username"/>}
            {(!isLogin && !validateFormValue(username)) &&
            <div className="text-rose-800 text-sm w-[230px] h-3 z-[20]">Username requires 6 characters!</div>
            }
            
            <TextBox className="mt-4" label="Password" setValue={setPassword} placeholder="••••••••••" type={TextBoxTypes.Password}/>
            {!isLogin && <TextBox className="mt-4" label="Confirm Password" setValue={setPassword2} placeholder="••••••••••" type={TextBoxTypes.Password}/>}
            {isLogin ? 
            <motion.button
            onClick={handleLogin}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="absolute bottom-4 w-[120px] bg-midnight-blue text-white font-bold text-xl rounded-lg pt-[1px] pb-1 shadow-button">
                Login
            </motion.button>
            : 
            <motion.button
            onClick={handleSignUp}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="absolute bottom-4 w-[120px] bg-rose-800 text-white font-bold text-xl rounded-lg pt-[1px] pb-1 shadow-button">
                Sign up
            </motion.button>}
        </div>

        <div className="h-[200px]"/>
    </div>);
}

export default LoginPage;