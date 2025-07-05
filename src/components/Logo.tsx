import React from 'react'
import { market } from '../assets/images'

export default function Logo({ whiteHeading, homeRoute="/" }: { whiteHeading?: boolean, homeRoute?: string }): React.JSX.Element {
    return (
        <a href={homeRoute} className="flex justify-center items-end gap-2">
            <img 
                src={market}
                alt="Market"
                className="h-[2rem] w-[2rem]"
            />

            <p className={`text-xl font-black -mb-1 ${whiteHeading && "text-white"}`}>Market</p>
        </a>    
    )
}
