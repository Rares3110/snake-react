import React from "react";

export enum TextBoxTypes {
    Text, Password
}

interface Props {
    label: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    type?: TextBoxTypes,
    placeholder?: string,
    width?: string,
    className?: string
}

export const TextBox:React.FC<Props> = (props) => {
    const {
        label,
        setValue,
        type = TextBoxTypes.Text,
        placeholder = '',
        width = '100%',
        className = ''
    } = props;

    return (<div className={className + ` relative focus-within:font-bold focus:border-[1.5px] border-midnight-blue 
    border-[1.5px] rounded-xl outline outline-0 focus-within:outline-[1.5px] outline-midnight-blue`}>
        <div className="absolute top-[-12px] text-sm left-2 px-[2px] text-midnight-blue bg-white z-5">
            {label}
        </div>

        <input type={type === TextBoxTypes.Text ? "text" : "password"} placeholder={placeholder}
        style={{width: width}}
        className="relative w-[260px] text-lg py-[2px] px-2 font-semibold text-midnight-blue rounded-xl z-10
        border-0 focus:outline-0 focus:border-0 bg-transparent"
        onChange={(e) => setValue(e.target.value)}
        />
    </div>);
}