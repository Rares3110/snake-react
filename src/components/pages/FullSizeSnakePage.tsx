import React from "react";
import Snake from "../singular/Snake";

const FullSizeSnakePage:React.FC = () => {
    return (<div className="w-full flex flex-col items-center justify-center overflow-y-hidden">
        <div className="w-[100vmin] h-[100vmin]">
            <Snake/>
        </div>
    </div>);
}

export default FullSizeSnakePage;