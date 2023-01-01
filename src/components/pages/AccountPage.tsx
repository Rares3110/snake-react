import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../../stores/UserData";
import NavBar from "../singular/NavBar";

const AccountPage:React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => { 
        if(userData.user === null) {
            navigate('/login');
        }
    });

    console.log(userData.user);

    return (<div>
        <NavBar/>;
        <div className="mt-20">{userData.user?.displayName}</div>
    </div>)
}

export default AccountPage;