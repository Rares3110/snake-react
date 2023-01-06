import React, { useEffect, useRef, useState } from "react";
import NavBar from "../singular/NavBar";
import { TopUserInfo, getIcon, getTopUsersByScore } from "../../services/UserInfo";
import userData from "../../stores/UserData";
import { GiSnakeTongue } from "react-icons/gi";

const LeaderboardsPage:React.FC = () => {

    const [users, setUsers] = useState<TopUserInfo[]>([]);
    const searchActive = useRef<boolean>(false);

    useEffect(() => {
        if(!searchActive.current) {
            searchActive.current = true;
            
            getTopUsersByScore().then((value) => {
                setUsers(oldValue => oldValue.concat(value));
                searchActive.current = false;
            });
        }
    }, []);

    return (<div className="w-full flex flex-col items-center">
        <NavBar/>

        <div className="w-[90%] max-w-[800px] mt-40 text-white font-semibold">
            <h1 className="text-5xl border-b-[6px] pb-1 mb-2 border-white w-full">Highest Score</h1>
            {users.map((value, index) => {
                if(value.icon === undefined) {
                    getIcon(value.id).then((result) => {
                        setUsers(oldUsers => oldUsers.map((user, secondIndex) => {
                            if(secondIndex === index) {
                                user.icon = result;
                            }
                            
                            return user;
                        }))
                    });
                }

                return (<div key={JSON.stringify(value)}
                style={{backgroundColor: value.id === userData.id ? "#f59e0b" : (index % 2 === 0 ? "#03896c" : "#008F7E")}}
                className="w-full flex flex-wrap justify-around gap-x-6 gap-y-1 text-3xl mt-2 py-1 px-2 rounded-xl">
                    <div className="flex">
                        {index + 1}.
                        {value.icon === undefined ? <GiSnakeTongue className="w-9 h-9 rounded-full border-2 border-white mx-1"/> : 
                        <img src={value.icon} alt="" className="w-9 h-9 object-cover rounded-full border-2 border-white mx-1"/>}
                        {value.username}
                    </div>
                    <div>Score&nbsp;{value.maxScore}</div>
                    <div>
                        Time&nbsp;{Math.floor(value.secondsForMaxScore / 60)}:
                        {value.secondsForMaxScore % 60 < 10 ? "0" : ""}
                        {value.secondsForMaxScore % 60}
                    </div>
                    <div>Games&nbsp;{value.gamesPlayed}</div>
                </div>);
            })}
        </div>

        <div className="h-72"/>
    </div>);
}

export default LeaderboardsPage;