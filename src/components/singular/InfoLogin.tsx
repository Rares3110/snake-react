import { observer } from "mobx-react";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import userData from "../../stores/UserData";

const InfoLogin:React.FC = observer(() => {
    return (<div>
        {userData.id === undefined ? <div className="flex items-center justify-around text-blue-500 bg-black bg-opacity-50 text-xl max-w-[400px] mt-4 mb-[-20px] rounded-2xl">
            <AiOutlineInfoCircle className="h-12 w-12 mr-3 ml-2"/>
            Login or create an account, before starting the game, to save the score!
        </div> : null}
    </div>);
});

export default InfoLogin;