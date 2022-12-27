import React from "react";
import NormalApple from "../../resources/png/apple_normal.png";

const Snake:React.FC = () => {
    return (<div className="w-full h-full aspect-square bg-black">
        <div className="grid w-full h-full grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-[repeat(11,minmax(0,1fr))] 
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700 shadow-2xl">
            {[...Array(120)].map(() => <div/>)}
            <div>
                <div className="w-full h-full flex items-center justify-center">
                    <img src={NormalApple} alt="" className="w-[80%] h-[80%] text-red-600"/>
                </div>
            </div>
        </div>
    </div>);
}

export default Snake;