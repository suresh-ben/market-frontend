import React from 'react'
import ROUTES from '../navigations/routes/routes';
import { logOut } from '../assets/images';
import { managerLogout } from '../services/auth';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { AxiosError } from 'axios';
import useAxiosPrivate from '../hooks/useManagerAxiosPrivate';

const managerSidebarRoutes = [
    {
        name: "Market",
        route: ROUTES.MANAGER_HOME
    },
    {
        name: "Crate Request",
        route: ROUTES.MANAGER_CREATE_REQUEST
    },
];

export default function Sidebar(): React.JSX.Element {

    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogOut = async () => {
        try {
            setIsLoading(true);
            await managerLogout(axiosPrivate);
            window.location.href = ROUTES.MANAGER_LOGIN;
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-[20rem] bg-white shadow-2xs h-full p-4 flex flex-col justify-between'>
            {isLoading && <Loading />}
            <div>
                <p className='text-xl font-semibold mb-6'>Country Manager</p>

                <div className='flex flex-col gap-2'>
                    {
                        managerSidebarRoutes.map((route, ind) => {
                            return <a 
                                key={ind} 
                                href={route.route}
                                className={`${window.location.href.includes(route.route)? 'text-black underline' : `text-gray-500`} hover:text-blue-700`}
                            >
                                <p>{route.name}</p>
                            </a>
                        })
                    }
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <a 
                    href={ROUTES.MANAGER_UPDATE_PROFILE}
                    className={`${window.location.href.includes(ROUTES.MANAGER_UPDATE_PROFILE)? 'text-black underline' : `text-gray-500`} hover:text-blue-700`}
                >
                    <p>Update Profile</p>
                </a>

                <a 
                    href={ROUTES.MANAGER_CHANGE_PASSWORD}
                    className={`${window.location.href.includes(ROUTES.MANAGER_CHANGE_PASSWORD)? 'text-black underline' : `text-gray-500`} hover:text-blue-700`}
                >
                    <p>Change Password</p>
                </a>

                <button
                    onClick={handleLogOut}
                    className={`text-gray-500 hover:text-blue-700 flex items-center gap-2 mt-6`}
                >
                    <img 
                        src={logOut}
                        className='h-[1rem] aspect-square'
                    />
                    <p>Log Out</p>
                </button>
            </div>
        </div>
    )
}
