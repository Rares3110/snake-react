import React from "react";
import ReactDOM from "react-dom";
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
        alt="" className="select-none unselectable-image relative w-[80%] h-[80%] mt-[10%] text-red-600"/>
        <div className="absolute text-white font-semibold text-[75%] mr-[10%] mt-[15%]">+{props.value}</div>
    </div>);
}

const boardSize:number = 11;

const Snake:React.FC = () => {
    const getBoardTile = (lin: number, col: number) => {
        return document.getElementById('board')?.children.item(lin * boardSize + col);
    }

    const buttonHandle = () => {
        const element:Element | undefined | null = getBoardTile(10, 10);
        if(element !== undefined && element !== null)
        {
            const newApple = React.createElement(Apple, {typeOfApple: AppleTypes.Golden, value: 20}, []);
            const newElement = React.createElement("div", {}, [newApple]);
            ReactDOM.render(newElement, element);
        }
    }

    return (<div className="w-full h-full aspect-square">
        <div 
        id="board"
        style={{
            gridTemplateColumns: 'repeat(' + boardSize + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + boardSize + ', minmax(0, 1fr))'
        }}
        className="grid w-full h-full shadow-2xl
        [&>*:nth-child(even)]:bg-green-500 [&>*:nth-child(odd)]:bg-emerald-700">
            {[...Array(boardSize * boardSize)].map(() => <div/>)}
        </div>
        <button onClick={buttonHandle}>Add apple</button>
    </div>);
}

export default Snake;