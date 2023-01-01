import React from "react";

export enum TextBoxTypes {
    Text, Password
}

interface Props {
    label: string,
    type?: TextBoxTypes,
    placeholder?: string,
    width?: string,
    className?: string
}

export const TextBox:React.FC<Props> = (props) => {
    const {
        label = '',
        type = TextBoxTypes.Text,
        placeholder = '',
        width = '100%',
        className = ''
    } = props;

    return (<div className={className + " relative focus-within:font-bold"}>
        <div className="absolute top-[-12px] text-sm left-2 px-[2px] text-midnight-blue bg-white">
            {label}
        </div>

        <input type={type === TextBoxTypes.Text ? "text" : "password"} placeholder={placeholder}
        style={{width: width}}
        className="w-[260px] border-midnight-blue border-[1.5px] text-lg py-[2px] px-2
        font-semibold text-midnight-blue rounded-xl focus:border-[1.5px]
        focus:border-midnight-blue focus:outline focus:outline-[1.5px] focus:outline-midnight-blue focus:font-semibold"
        />
    </div>);
}