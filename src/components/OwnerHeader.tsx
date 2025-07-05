import React from 'react'
import Logo from './Logo'
import useUserData from '../hooks/useOwnerUserData'
import { user } from "../assets/images";
import ROUTES from '../navigations/routes/routes';

export default function Header(): React.JSX.Element {

    const { userData } = useUserData();

    return (
        <div className='h-[4rem] px-10 flex items-center bg-customSteelBlue justify-between'>
            <Logo whiteHeading homeRoute={ROUTES.OWNER_HOME} />

            <div className='flex items-center text-white gap-2'>
                <div className='flex flex-col justify-end items-end'>
                    <p className='text-sm'>{userData.userId}</p>
                    <p className='text-xs'>{userData.email}</p>
                </div>

                <img 
                    src={user}
                    className='bg-gray-400 rounded-full p-1 h-[2.5rem] aspect-square'
                />
            </div>
        </div>
    )
}
