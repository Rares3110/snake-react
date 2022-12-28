import React, {useState} from "react";
import {motion} from "framer-motion";

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

const SnakeSideLeave:React.FC = () => {
    return (<div className="relative w-full h-full flex items-center justify-center bg-yellow-400">
        <motion.svg
        width="100%"
        height="170%"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        >
            <motion.circle
            cx="0"
            cy="0"
            r="50"
            stroke="#1e40af"
            style={{
                strokeWidth: '70px',
                strokeLinecap: 'round',
                fill: 'transparent'
            }}
            variants={{
                hidden: { 
                    pathLength: 0.25 
                },
                visible: () => {
                    return {
                        opacity: 1,
                        rotateZ: 90,
                        transition: {
                        duration: 4,
                        type: "tween",
                        ease: "linear"
                        }
                    };
                }
            }}
            />
        </motion.svg>
    </div>);
}

const SnakeSideStay:React.FC = () => {
    return (<div className="relative w-full h-full bg-yellow-400">
        <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        >
            <motion.circle
            cx="0"
            cy="0"
            r="50"
            stroke="#1e40af"
            style={{
                strokeWidth: '70px',
                strokeLinecap: 'round',
                fill: 'transparent',
                pathLength: 0.25
            }}
            />
        </motion.svg>
    </div>);
}

const SnakeSideEnter:React.FC = () => {
    return (<div className="relative w-full h-full flex items-center justify-center bg-yellow-400">
        <motion.svg
        width="100%"
        height="170%"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        >
            <motion.circle
            cx="0"
            cy="0"
            r="50"
            stroke="#1e40af"
            style={{
                strokeWidth: '70px',
                strokeLinecap: 'round',
                fill: 'transparent'
            }}
            variants={{
                hidden: { 
                    pathLength: 0.25
                },
                visible: () => {
                    return {
                        opacity: 1,
                        rotateZ: [90, 0],
                        transition: {
                        duration: 4,
                        type: "tween",
                        ease: "linear"
                        }
                    };
                }
            }}
            />
            <motion.circle
            cx="0"
            cy="0"
            r="33"
            stroke="black"
            style={{
                strokeWidth: '24px',
                strokeLinecap: 'round',
                fill: 'transparent'
            }}
            variants={{
                hidden: { 
                    pathLength: 0
                },
                visible: () => {
                    return {
                        opacity: 1,
                        rotateZ: [90, 0],
                        transition: {
                        duration: 4,
                        type: "tween",
                        ease: "linear"
                        }
                    };
                }
            }}
            />
            <motion.circle
            cx="0"
            cy="0"
            r="67"
            stroke="black"
            style={{
                strokeWidth: '24px',
                strokeLinecap: 'round',
                fill: 'transparent'
            }}
            variants={{
                hidden: { 
                    pathLength: 0
                },
                visible: () => {
                    return {
                        opacity: 1,
                        rotateZ: [90, 0],
                        transition: {
                        duration: 4,
                        type: "tween",
                        ease: "linear"
                        }
                    };
                }
            }}
            />
        </motion.svg>
    </div>);
}

const SnakeStraightLeave:React.FC = () => {
    return (<div className="relative w-full h-full flex items-center bg-yellow-400">
        <motion.svg
        className="mt-[70%]"
        width="100%"
        height="170%"
        viewBox="0 35 100 170"
        initial="hidden"
        animate="visible"
        >
            <motion.line
            x1="50"
            y1="35"
            x2="50"
            y2="135"
            stroke="#1e40af"
            style={{
                strokeWidth: '70px',
                strokeLinecap: 'round'
            }}
            variants={{
                hidden: { 
                    pathLength: 1
                },
                visible: () => {
                    return {
                        opacity: 1,
                        pathLength: 0,
                        transition: {
                        duration: 4,
                        type: "tween",
                        ease: "linear"
                        }
                    };
                }
            }}
            />
        </motion.svg>
    </div>);
}

const SnakeStraightStay:React.FC = () => {
    return (<div className="relative w-full h-full flex items-center overflow-hidden bg-yellow-400">
        <motion.svg
        width="100%"
        height="170%"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        >
            <motion.line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="#1e40af"
            style={{
                strokeWidth: '70px',
                strokeLinecap: 'round'
            }}
            variants={{
                hidden: { 
                    pathLength: 1
                }
            }}
            />
        </motion.svg>
    </div>);
}

const SnakeStraightEnter:React.FC = () => {
    return (<div className="relative w-full h-full flex items-center bg-yellow-400">
        <motion.svg
        className="mt-[70%]"
        width="100%"
        height="170%"
        viewBox="0 35 100 170"
        initial="hidden"
        animate="visible"
        >
            <motion.line
            x1="50"
            y1="35"
            x2="50"
            y2="135"
            stroke="#1e40af"
            style={{
                strokeWidth: '70px',
                strokeLinecap: 'round'
            }}
            variants={{
                hidden: { 
                    pathLength: 0
                },
                visible: () => {
                    return {
                        opacity: 1,
                        pathLength: 1,
                        transition: {
                        duration: 4,
                        type: "tween",
                        ease: "linear"
                        }
                    };
                }
            }}
            />
            <motion.circle
            cx="33"
            cy="35"
            r="12"
            style={{
                fill: 'black'
            }}
            animate={{
                y: 100,
                transition: {
                    type: 'tween',
                    ease: 'linear',
                    duration: 4
                }
            }}
            />
            <motion.circle
            cx="67"
            cy="35"
            r="12"
            style={{
                fill: 'black'
            }}
            animate={{
                y: 100,
                transition: {
                    type: 'tween',
                    ease: 'linear',
                    duration: 4
                }
            }}
            />
        </motion.svg>
    </div>);
}

const Apple:React.FC<AppleProps> = (props) => {
    return (<div className="relative select-none w-full h-full flex items-center justify-center">
        <img src={props.typeOfApple === AppleTypes.Normal ? NormalApple : GoldenApple} 
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
        
        <div className="mt-36 w-96 h-96">
            <SnakeSideLeave/>
        </div>

        <div className="mt-36 w-96 h-96">
            <SnakeSideStay/>
        </div>

        <div className="mt-36 w-96 h-96">
            <SnakeSideEnter/>
        </div>

        <div className="mt-36 w-96 h-96">
            <SnakeStraightEnter/>
        </div>

        <div className="mt-36 w-96 h-96">
            <SnakeStraightLeave/>
        </div>

        <div className="mt-36 w-96 h-96">
            <SnakeStraightStay/>
        </div>
    </div>);
}

export default Snake;