import React from "react";
import NormalApple from "../../resources/png/apple_normal.png";
import GoldenApple from "../../resources/png/apple_golden.png";

enum AppleTypes {
    Normal,
    Golden
}

interface AppleProps {
    typeOfApple: AppleTypes,
    value: number
}

const Apple:React.FC<AppleProps> = (props) => {
    return (<div className="relative select-none w-full h-full flex items-center justify-center">
        <img src={props.typeOfApple === AppleTypes.Normal ? NormalApple : GoldenApple} 
        alt="" className="select-none unselectable-image relative w-[80%] h-[80%] text-red-600"/>
        <div className="absolute text-white font-semibold text-[75%] mr-[3px] mt-[2px]">+{props.value}</div>
    </div>);
}

const boardSize:number = 11;

const Snake:React.FC = () => {
    return (<div className="w-full h-full aspect-square bg-black">
        <div 
        style={{
            gridTemplateColumns: 'repeat(' + boardSize + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + boardSize + ', minmax(0, 1fr))'
        }}
        className="grid w-full h-full shadow-2xl
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700">
            {[...Array(boardSize * boardSize)].map(() => <div/>)}
        </div>
    </div>);
}

export default Snake;