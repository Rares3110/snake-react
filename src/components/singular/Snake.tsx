import React, {useState} from "react";
import {motion} from "framer-motion";
import { SnakePart } from "../utility/SnakeParts";

import NormalApple from "../../resources/png/apple_normal.png";
import GoldenApple from "../../resources/png/apple_golden.png";
import {TbBrandReactNative} from "react-icons/tb";
import {GiSpikedBall} from "react-icons/gi";

enum AppleTypes {
    Normal,
    Golden
}

interface AppleProps {
    typeOfApple: AppleTypes,
    value: number
}

enum SnakePiece {
    SideEnter, SideStay, SideLeave, StraightEnter, StraightStay, StraightLeave
}

interface SnakeType {
    piece: SnakePiece,
    startDirection: SnakePart.Direction,
    endDirection: SnakePart.Direction,
    duration: number,
    skinColor?: string,
    eyeColor?: string
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

const Portal:React.FC = () => {
    return (<motion.div 
    animate={{
        rotateZ:'-360deg',
        transition: {
            repeat: Infinity,
            type: 'tween',
            ease: 'linear',
            duration: 20
        }
    }}
    className="w-full h-full flex items-center justify-center bg-[#7adc9e] rounded-full">
        <TbBrandReactNative className="w-[90%] h-[90%] text-sky-800"/>
    </motion.div>);
}

const Spikes:React.FC = () => {
    return(<GiSpikedBall className="absolute w-full h-full text-[#232423]"/>);
}

const boardSize:number = 11;

const Snake:React.FC = () => {
    const [tiles, setTiles] = useState<Array<{
        appleType: AppleTypes | null,
        appleValue: number,
        hasPortal: boolean,
        hasSpikes: boolean,
        snake: SnakeType | null
    }>>(
        [...Array(boardSize * boardSize)].map(() => {return {
            appleType: null,
            appleValue: 0,
            hasPortal: false,
            hasSpikes: false,
            snake: null
        };})
    );

    const buttonAppleHandler = () => setTiles(oldValue => oldValue.map((e, index) => {
        if(index === 100) {
            e.appleType = AppleTypes.Golden;
            e.appleValue = 5;
        } else if(index === 89) {
            e.appleType = AppleTypes.Normal;
            e.appleValue = 10;
        }

        return e;
    }));

    const buttonPortalHandler = () => setTiles(oldValue => oldValue.map((e, index) => {
        if(index === 99 || index === 88) {
            e.hasPortal = true;
        } 

        return e;
    }));

    const buttonSpikesHandler = () => setTiles(oldValue => oldValue.map((e, index) => {
        if(index === 101 || index === 90) {
            e.hasSpikes = true;
        } 

        return e;
    }));

    const buttonSnakeHandler = () => {
        setTiles(oldValue => oldValue.map((e, index) => {
            if(index === 106) {
                e.snake = {
                    piece: SnakePiece.SideEnter,
                    duration: 0.3,
                    endDirection: SnakePart.Direction.Left,
                    startDirection: SnakePart.Direction.Up
                }
            } else if(index === 95) {
                e.snake = {
                    piece: SnakePiece.StraightLeave,
                    duration: 0.3,
                    endDirection: SnakePart.Direction.Down,
                    startDirection: SnakePart.Direction.Up
                }
            }

            return e;
        }));

        setTimeout(() => {
            setTiles(oldValue => oldValue.map((e, index) => {
                if(index === 106) {
                    e.snake = {
                        piece: SnakePiece.SideLeave,
                        duration: 0.3,
                        endDirection: SnakePart.Direction.Left,
                        startDirection: SnakePart.Direction.Up
                    }
                } else if(index === 105) {
                    e.snake = {
                        piece: SnakePiece.StraightEnter,
                        duration: 0.3,
                        endDirection: SnakePart.Direction.Left,
                        startDirection: SnakePart.Direction.Right
                    }
                } else if(index === 95) {
                    e.snake = null;
                }
    
                return e;
            }));
        }, 300);

        setTimeout(() => {
            setTiles(oldValue => oldValue.map((e, index) => {
                if(index === 104) {
                    e.snake = {
                        piece: SnakePiece.StraightEnter,
                        duration: 0.3,
                        endDirection: SnakePart.Direction.Left,
                        startDirection: SnakePart.Direction.Right
                    }
                } else if(index === 105) {
                    e.snake = {
                        piece: SnakePiece.StraightLeave,
                        duration: 0.3,
                        endDirection: SnakePart.Direction.Left,
                        startDirection: SnakePart.Direction.Right
                    }
                } else if(index === 106) {
                    e.snake = null;
                }
    
                return e;
            }));
        }, 600);

        setTimeout(() => {
            setTiles(oldValue => oldValue.map((e, index) => {
                if(index === 103) {
                    e.snake = {
                        piece: SnakePiece.StraightEnter,
                        duration: 0.3,
                        endDirection: SnakePart.Direction.Left,
                        startDirection: SnakePart.Direction.Right
                    }
                } else if(index === 104) {
                    e.snake = {
                        piece: SnakePiece.StraightLeave,
                        duration: 0.3,
                        endDirection: SnakePart.Direction.Left,
                        startDirection: SnakePart.Direction.Right
                    }
                } else if(index === 105) {
                    e.snake = null;
                }
    
                return e;
            }));
        }, 900);
    };

    return (<div className="w-full h-full aspect-square">
        <div 
        id="board"
        style={{
            gridTemplateColumns: 'repeat(' + boardSize + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + boardSize + ', minmax(0, 1fr))'
        }}
        className="grid gap-0 w-full h-full shadow-2xl
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700">
            {tiles.map((e, index) => {return (<div key={index} className="relative w-[calc(100%+0.5px)] h-[calc(100%+0.5px)]">

                {e.appleType !== null && <Apple typeOfApple={e.appleType} value={e.appleValue}/>}
                
                {e.hasPortal && <Portal/>}

                {e.hasSpikes && <Spikes/>}

                {(e.snake !== null && e.snake.piece === SnakePiece.SideEnter) &&
                <SnakePart.SnakeSideEnter
                duration={e.snake.duration}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.SideStay) &&
                <SnakePart.SnakeSideStay
                duration={e.snake.duration}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.SideLeave) &&
                <SnakePart.SnakeSideLeave
                duration={e.snake.duration}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.StraightEnter) &&
                <SnakePart.SnakeStraightEnter
                duration={e.snake.duration}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.StraightStay) &&
                <SnakePart.SnakeStraightStay
                duration={e.snake.duration}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.StraightLeave) &&
                <SnakePart.SnakeStraightLeave
                duration={e.snake.duration}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

            </div>)})}
        </div>

        <button className="text-semibold text-white" onClick={buttonAppleHandler}>&ensp;Apple&ensp;</button>
        <button className="text-semibold text-white" onClick={buttonPortalHandler}>&ensp;Portal&ensp;</button>
        <button className="text-semibold text-white" onClick={buttonSnakeHandler}>&ensp;Snake&ensp;</button>
        <button className="text-semibold text-white" onClick={buttonSpikesHandler}>&ensp;Spikes&ensp;</button>
        
    </div>);
}

export default Snake;