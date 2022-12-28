import React, {useState} from "react";
import {motion} from "framer-motion";
import { SnakePart } from "../utility/SnakeParts";

import NormalApple from "../../resources/png/apple_normal.png";
import GoldenApple from "../../resources/png/apple_golden.png";
import {GiBlackHoleBolas} from "react-icons/gi";

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
        <motion.img 
        animate={{
            y: ['-5%', '1%', '-5%'],
            transition: {
                duration: 3,
                repeat: Infinity
            }
        }}
        src={props.typeOfApple === AppleTypes.Normal ? NormalApple : GoldenApple} 
        alt="" className="select-none unselectable-image relative w-[80%] h-[80%] mt-[10%] text-red-600"/>
        <div className="absolute text-white font-semibold text-[75%] mr-[10%] mt-[15%]">+{props.value}</div>
    </div>);
}

const boardSize:number = 11;

const Snake:React.FC = () => {
    const [tiles, setTiles] = useState<Array<{
        appleType: AppleTypes | null,
        appleValue: number
    }>>(
        [...Array(boardSize * boardSize)].map(() => {return {
            appleType: null,
            appleValue: 0
        };})
    );

    const buttonHandler = () => setTiles(oldValue => oldValue.map((e, index) => {
        if(index === 100) {
            e.appleType = AppleTypes.Golden;
            e.appleValue = 5;
        } 

        return e;
    }));

    return (<div className="w-full h-full aspect-square">
        <div 
        id="board"
        style={{
            gridTemplateColumns: 'repeat(' + boardSize + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + boardSize + ', minmax(0, 1fr))'
        }}
        className="grid w-full h-full shadow-2xl
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700">
            {tiles.map((e, index) => {return (<div key={index}>
                {e.appleType !== null && <Apple typeOfApple={e.appleType} value={e.appleValue}/>}
            </div>)})}
        </div>
        <button onClick={buttonHandler}>Add Apple</button>

        <motion.div 
        animate={{
            rotateZ:'360deg',
            transition: {
                repeat: Infinity,
                type: 'tween',
                ease: 'linear',
                duration: 7
            }
        }}
        className="w-40 h-40 bg-yellow-500">
            <GiBlackHoleBolas className="w-full h-full text-violet-800"/>
        </motion.div>
    </div>);
}

export default Snake;