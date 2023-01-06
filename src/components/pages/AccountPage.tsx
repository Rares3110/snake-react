import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../../stores/UserData";
import NavBar from "../singular/NavBar";
import { motion } from "framer-motion";
import { changeIcon, getHistory, getIcon, HistoryElement, setUsername } from "../../services/UserInfo";
import { logout } from "../../services/Login";
import { observer } from "mobx-react";

import { GiSnakeTongue } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";

const AccountPage:React.FC = observer(() => {
    const navigate = useNavigate();
    const changeIconRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>(userData.username ?? "");

    const historyOnRequest = 10;
    const [history, setHistory] = useState<HistoryElement[]>([]);
    const [historyLeft, setHistoryLeft] = useState<boolean>(false);
    const searchStarted = useRef<boolean>(false);

    useEffect(() => {
        if(userData.id === undefined) {
            navigate('/login/0');
        } else {
            if(searchStarted.current === false) {
                searchStarted.current = true;
                getHistory(true, historyOnRequest).then((value) => {
                    if(value.length === historyOnRequest) {
                        setHistoryLeft(true);
                    }
                    setHistory(value);
                    searchStarted.current = false;
                });
            }
        }
    }, [navigate]);

    const handleAddHistory = () => {
        if(searchStarted.current === false && historyLeft) {
            searchStarted.current = true;
            getHistory(false, historyOnRequest).then((value) => {
                if(value.length === historyOnRequest) {
                    setHistoryLeft(true);
                } else {
                    setHistoryLeft(false);
                }
                setHistory(oldValue => oldValue.concat(value));
                searchStarted.current = false;
            });
        }
    }

    const validateFormValue = (value: string) => {
        return value.match(/(?=.*[0-9a-zA-Z]).{6,}/);
    }

    return (<div className="flex flex-col w-full items-center">
        <NavBar/>

        <div className="flex justify-center w-[90%] flex-wrap mt-24 overflow-hidden">
    
            <div className="flex flex-col items-center w-[460px]">
                <motion.div 
                whileHover="hover"
                className="relative roundex-full overflow-hidden border-white border-4 w-[300px] h-[300px] rounded-full">
                    {userData.icon === undefined ? 
                    <GiSnakeTongue className="absolute top-0 w-full h-full rounded-full text-white"/>
                    : 
                    <img src={userData.icon} alt="" className="absolute top-0 w-full h-full rounded-full object-cover"/>}

                    <input ref={changeIconRef} type="file" accept=".jpeg,.jpg,.png" className="hidden" multiple={false}
                    onChange={(event) => {
                        if(event.target.files !== null && event.target.files.length > 0) {
                            changeIcon(event.target.files[0]).then((value) => {
                                if(value === true) {
                                    getIcon(userData.id).then((value) => {
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
                
                <div className="relative w-[300px]">
                    <input type="text" 
                    style={{
                        borderBottomWidth: (name !== userData.username) ? "4px" : "",
                        marginBottom: (name !== userData.username) ? "-4px" : ""
                    }}
                    className="text-5xl text-center w-full bg-transparent text-white font-semibold mt-4
                    outline-none border-white focus:border-b-4 focus:mb-[-4px]" 
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    />
                    {(name !== userData.username && validateFormValue(name)) ? <motion.button
                    className="absolute right-[-50px] top-[25px] w-12 h-12"
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.9}}
                    onClick={() => setUsername(name)}
                    >
                        <IoCheckmarkSharp className="w-full h-full text-green-600"/>
                    </motion.button> : null}

                    {(name !== userData.username) ? <motion.button
                    className="absolute left-[-50px] top-[30px] w-12 h-12"
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.9}}
                    onClick={() => setName(userData.username ?? "")}
                    >
                        <IoClose className="w-full h-full text-red-500"/>
                    </motion.button> : null}
                </div>
                
                {!validateFormValue(name) ?
                <div className="text-red-500 mt-1">Username requires 6 characters!</div>: null}

                <div className="text-xl text-white font-semibold mt-1">{userData.email}</div>
                
                <motion.button
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                className="bg-rose-800 text-white font-semibold text-3xl pb-2 pt-1 w-[150px] rounded-xl shadow-button mt-4 mb-16"
                onClick={() => {
                    logout();
                    navigate('/');
                }}>
                    Logout
                </motion.button>
            </div>

            <div className="w-[calc(90%-460px)] min-w-[340px] flex flex-col items-center text-white font-bold">
                <div className="flex flex-col items-center text-5xl mb-2">
                    <div className="border-b-4 pb-2 border-white">Games Played</div>
                    {userData.gamesPlayed}
                </div>
                
                <div className="flex flex-col items-center text-5xl mt-4">
                    <div className="border-b-4 pb-[6px] border-white mb-2">Record</div>
                    <div className="text-4xl mb-2 text-green-400">
                        Score&nbsp;{userData.maxScore}
                    </div>
                    <div className="text-4xl">
                        Time&nbsp;
                        {Math.floor(userData.secondsForMaxScore / 60)}:
                        {userData.secondsForMaxScore % 60 < 10 ? "0" : ""}
                        {userData.secondsForMaxScore % 60}
                    </div>
                </div>
                
                {userData.gamesPlayed > 0 ? <div className="w-full max-w-[600px] min-w-[300px] mt-8 mb-[200px]">
                    <div className="w-full text-center text-5xl border-b-4 pb-2 border-white">History</div>
                    {history.map((value, index) => <div key={JSON.stringify(value.date)}
                    style={{backgroundColor: index % 2 === 0 ? "#03896c" : "#008F7E"}}
                    className="w-full text-white font-semibold text-xl mt-2 flex flex-wrap gap-x-5 gap-y-1 px-4 py-2 justify-around items-center rounded-xl">
                        <div>Score {value.score}</div>
                        <div>
                            Time&nbsp;{Math.floor(value.seconds / 60)}:
                            {value.seconds % 60 < 10 ? "0" : ""}
                            {value.seconds % 60}
                        </div>
                        <div>{value.date.toDateString()}</div>
                    </div>)}

                    {historyLeft ? <div className="w-full flex justify-center mt-4">
                        <motion.button
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        onClick={handleAddHistory}
                        className="rounded-xl w-36 pb-[6px] pt-1 shadow-button bg-green-800 text-white text-2xl font-semibold">
                            See more
                        </motion.button>
                    </div> : null}

                    {(!historyLeft && !searchStarted.current) ? 
                    <div className="text-white font-semibold text-center text-xl w-full mt-2">All history shown</div> : null}

                </div> : <div className="h-[200px]"/>}
            </div>
            
        </div>
    </div>);
});

export default AccountPage;