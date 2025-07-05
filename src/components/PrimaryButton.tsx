import React, { useState } from 'react';

type ButtonProps = {
    type?: "button" | "submit",
    label: string,
    marginClass?: string,
    paddingClass?: string,
    tailwindClasses?: string,
    disabled?: boolean,
    onClick?: (...args: any[]) => any,
    primaryColor?: string,
    secondaryColor?: string,
    primaryColorHover?: string,
    secondaryColorHover?: string,
    color?: string,
}

const PrimaryButton = ({
    label='Button',
    type='button',
    marginClass='',
    paddingClass="p-2",
    tailwindClasses='',
    disabled=false,
    onClick,

    primaryColor='#53ABF5',
    secondaryColor='#9836A6',
    primaryColorHover='#169AFF',
    secondaryColorHover='#810D92',
    color='white'
    }: ButtonProps) => {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <button 
            style={{
                backgroundImage: disabled? 'linear-gradient(to right, gray , gray)' : (isHovering? `linear-gradient(to right, ${primaryColorHover} , ${secondaryColorHover})` : `linear-gradient(to right, ${primaryColor} , ${secondaryColor})`),
                color
            }}
            type={type}
            disabled={disabled}
            className={`rounded-xs w-full hover:scale-[0.99] text-white shadow-md ${marginClass} ${paddingClass} ${tailwindClasses}`} 
            onClick={onClick}

            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
                {label}
        </button>
    );
}

export default PrimaryButton;
