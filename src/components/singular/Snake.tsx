import React, {useState} from "react";
import {motion} from "framer-motion";
import { SnakePart } from "../utility/SnakeParts";
import { Coord } from "../utility/Utility";
 
import NormalApple from "../../resources/png/apple_normal.png";
import GoldenApple from "../../resources/png/apple_golden.png";
import PortalImage from "../../resources/png/portal.png";
import {GiSpikedBall} from "react-icons/gi";
import {BsTriangleFill} from "react-icons/bs";
import { SnakeEngine } from "../utility/SnakeEngine";

export enum AppleTypes {
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
    startFrom?: number,
    skinColor?: string,
    eyeColor?: string
}

const Apple:React.FC<AppleProps> = (props) => {
    return (<div className="absolute select-none w-full h-full flex items-center justify-center">
        <motion.img 
        animate={{
            y: ['0%', '-4%', '0%'],
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
    className="w-full h-full flex items-center justify-center bg-white bg-opacity-30 rounded-full">
        <img src={PortalImage} alt="" className="w-[95%] h-[95%]"/>
    </motion.div>);
}

const Spikes:React.FC = () => {
    return(<GiSpikedBall className="absolute w-full h-full text-[#232423] z-[50]"/>);
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

    //method to add all spikes required on the board
    const changeSpikes = (mapOfSpikes: string[][]) => {
        setTiles(oldMap => oldMap.map((value, index) => {
            let coord = SnakeEngine.arrayPozToCoord(index);
            if(mapOfSpikes[coord.y][coord.x] === 'X') {
                value.hasSpikes = true;
            } else {
                value.hasSpikes = false;
            }

            return value;
        }));
    }

    //method to add apples on the board
    const changeApple = (position: Coord, toAdd: boolean, appleValue: number = 1, appleType: AppleTypes = AppleTypes.Normal) => {
        let myIndex = SnakeEngine.coordToArrayPoz(position);

        setTiles(oldMap => oldMap.map((value, index) => {
            if(index === myIndex) {
                if(toAdd) {
                    value.appleType = appleType;
                    value.appleValue = appleValue;
                } else {
                    value.appleType = null;
                }
            }

            return value;
        }));
    }

    const changePortal = (position: Coord, toAdd: boolean) => {
        let myIndex = SnakeEngine.coordToArrayPoz(position);

        setTiles(oldMap => oldMap.map((value, index) => {
            if(index === myIndex) {
                if(toAdd) {
                    value.hasPortal = true;
                } else {
                    value.hasPortal = false;
                }
            }

            return value;
        }));
    }

    //method to add snake parts on the board
    const changeSnakePiece = (position: Coord, toAdd: boolean,
        category: SnakePart.SnakePieceCategory = SnakePart.SnakePieceCategory.Stay,
        startDirection: SnakePart.Direction = SnakePart.Direction.Left, 
        endDirection: SnakePart.Direction = SnakePart.Direction.Right,
        duration: number = 1, startFrom: number = 0) => {
        
        setTiles(oldMap => oldMap.map((value, index) => {
            let myIndex = SnakeEngine.coordToArrayPoz(position);
            
            if(index === myIndex && toAdd) {
                switch(category) {
                    case SnakePart.SnakePieceCategory.Enter:
                        if(startDirection === SnakePart.oppositeDirection(endDirection)) {
                            value.snake = {
                                piece: SnakePiece.StraightEnter,
                                startDirection: startDirection,
                                endDirection: endDirection,
                                duration: duration,
                                startFrom: startFrom
                            };
                        } else {
                            value.snake = {
                                piece: SnakePiece.SideEnter,
                                startDirection: startDirection,
                                endDirection: endDirection,
                                duration: duration,
                                startFrom: startFrom
                            };
                        }

                        break;

                    case SnakePart.SnakePieceCategory.Leave:
                        if(startDirection === SnakePart.oppositeDirection(endDirection)) {
                            value.snake = {
                                piece: SnakePiece.StraightLeave,
                                startDirection: startDirection,
                                endDirection: endDirection,
                                duration: duration,
                                startFrom: startFrom
                            };
                        } else {
                            value.snake = {
                                piece: SnakePiece.SideLeave,
                                startDirection: startDirection,
                                endDirection: endDirection,
                                duration: duration,
                                startFrom: startFrom
                            };
                        }

                        break;

                        case SnakePart.SnakePieceCategory.Stay:
                            if(startDirection === SnakePart.oppositeDirection(endDirection)) {
                                value.snake = {
                                    piece: SnakePiece.StraightStay,
                                    startDirection: startDirection,
                                    endDirection: endDirection,
                                    duration: duration,
                                    startFrom: startFrom
                                };
                            } else {
                                value.snake = {
                                    piece: SnakePiece.SideStay,
                                    startDirection: startDirection,
                                    endDirection: endDirection,
                                    duration: duration,
                                    startFrom: startFrom
                                };
                            }
    
                            break;
                }
            } else if (index === myIndex && !toAdd) {
                value.snake = null;
            }
            
            return value;
        }))
    }

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [pauseTime, setPauseTime] = useState(0);
    const pauseTimeStart = 2.0;

    const handleStartGame = () => {
        new SnakeEngine(changeSpikes, changeApple, changePortal, changeSnakePiece, clean, pause).Start();
        setIsGameRunning(true);
    }

    const clean = () => {
        pause();
        setTimeout(() => {
            setTiles(oldMap => oldMap.map(() => {
                return {
                    appleType: null,
                    appleValue: 0,
                    hasPortal: false,
                    hasSpikes: false,
                    snake: null
                };
            }));

            setIsGameRunning(false);
        }, 2000);
    }

    const pause = () => {
        setPauseTime(pauseTimeStart);
        let intervalRef = setInterval(() => {
            setPauseTime(oldValue => {
                oldValue = Math.floor((oldValue - 0.1) * 10) / 10;
                if(oldValue === 0)
                    clearInterval(intervalRef);
                return oldValue;
            });
        }, 100);
    }

    return (<div className="relative w-full h-full aspect-square">
        <div 
        id="board"
        style={{
            gridTemplateColumns: 'repeat(' + boardSize + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + boardSize + ', minmax(0, 1fr))'
        }}
        className="relative grid gap-0 items-center justify-center w-full h-full shadow-2xl
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700">
            {tiles.map((e, index) => {return (<div key={index.toString() + e.snake?.duration.toString()} 
            className="relative w-[calc(100%+0.5px)] h-[calc(100%+0.5px)]">

                {e.appleType !== null && <Apple typeOfApple={e.appleType} value={e.appleValue}/>}
                
                {e.hasPortal && <Portal/>}

                {e.hasSpikes && <Spikes/>}

                {(e.snake !== null && e.snake.piece === SnakePiece.SideEnter) &&
                <SnakePart.SnakeSideEnter
                duration={e.snake.duration}
                startFrom={e.snake.startFrom ?? 0}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.SideStay) &&
                <SnakePart.SnakeSideStay
                duration={e.snake.duration}
                startFrom={e.snake.startFrom ?? 0}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.SideLeave) &&
                <SnakePart.SnakeSideLeave
                duration={e.snake.duration}
                startFrom={e.snake.startFrom ?? 0}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.StraightEnter) &&
                <SnakePart.SnakeStraightEnter
                duration={e.snake.duration}
                startFrom={e.snake.startFrom ?? 0}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.StraightStay) &&
                <SnakePart.SnakeStraightStay
                duration={e.snake.duration}
                startFrom={e.snake.startFrom ?? 0}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

                {(e.snake !== null && e.snake.piece === SnakePiece.StraightLeave) &&
                <SnakePart.SnakeStraightLeave
                duration={e.snake.duration}
                startFrom={e.snake.startFrom ?? 0}
                startDirection={e.snake.startDirection}
                endDirection={e.snake.endDirection}
                skinColor={e.snake.skinColor}
                eyeColor={e.snake.eyeColor}
                />}

            </div>)})}
        </div>

        {pauseTime !== 0 && <div 
        style={{opacity: Math.min(1, pauseTime / pauseTimeStart + 0.3)}}
        className="absolute top-0 w-full h-full flex items-center justify-center z-[60]">
            <div className="text-white font-bold text-[120px]">{pauseTime}{pauseTime === Math.floor(pauseTime) ? ".0" : ""}</div>
        </div>}

        {!isGameRunning && <button className="absolute top-0 w-full h-full bg-black bg-opacity-40 z-[60]
        flex items-center justify-center"
        onClick={handleStartGame}>
            <BsTriangleFill className="rotate-90 w-1/5 h-1/5 text-white text-opacity-80"/>
        </button>}
    </div>);
}

export default Snake;