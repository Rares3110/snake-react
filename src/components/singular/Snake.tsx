import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import { SnakePart } from "../utility/SnakeParts";
import { Coord } from "../utility/usefull";
 
import NormalApple from "../../resources/png/apple_normal.png";
import GoldenApple from "../../resources/png/apple_golden.png";
import {TbBrandReactNative} from "react-icons/tb";
import {GiSpikedBall} from "react-icons/gi";
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
    skinColor?: string,
    eyeColor?: string
}

const Apple:React.FC<AppleProps> = (props) => {
    return (<div className="relative select-none w-full h-full flex items-center justify-center">
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

    const ChangeSpikes = (mapOfSpikes: string[][]) => {
        setTiles(oldMap => oldMap.map((value, index) => {
            var coord = SnakeEngine.arrayPozToCoord(index);
            if(mapOfSpikes[coord.y][coord.x] === ' ') {
                value.hasSpikes = false;
            }
            else {
                value.hasSpikes = true;
            }

            return value;
        }));
    }

    const ChangeApple = (position: Coord, toAdd: boolean, appleValue: number = 1, appleType: AppleTypes = AppleTypes.Normal) => {
        var myIndex = SnakeEngine.coordToArrayPoz(position);

        setTiles(oldMap => oldMap.map((value, index) => {
            if(index === myIndex) {
                if(toAdd) {
                    value.appleType = appleType;
                    value.appleValue = appleValue;
                }
                else {
                    value.appleType = null;
                }
            }

            return value;
        }))
    }

    const snakeEngine = useRef(new SnakeEngine(ChangeSpikes, ChangeApple));

    useEffect(() => {
        snakeEngine.current.Start();
    },);

    return (<div className="w-full h-full aspect-square">
        <div 
        id="board"
        style={{
            gridTemplateColumns: 'repeat(' + boardSize + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + boardSize + ', minmax(0, 1fr))'
        }}
        className="grid gap-0 items-center justify-center w-full h-full shadow-2xl
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700">
            {tiles.map((e, index) => {return (<div key={index} 
            className="relative w-[calc(100%+0.5px)] h-[calc(100%+0.5px)] flex items-center justify-center">

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
    </div>);
}

export default Snake;