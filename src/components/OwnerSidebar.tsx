import React from 'react'
import ROUTES from '../navigations/routes/routes';
import { logOut } from '../assets/images';
import { ownerLogout } from '../services/auth';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { AxiosError } from 'axios';
import useAxiosPrivate from '../hooks/useOwnerAxiosPrivate';

const ownerSidebarRoutes = [
    {
        name: "Market",
        route: ROUTES.OWNER_HOME
    },
    {
        name: "View Requests",
        route: ROUTES.OWNER_VIEW_REQUESTS
    },
    {
        name: "User Management",
        route: ROUTES.OWNER_USER_MANAGEMENT
    },
    {
        name: "Product Management",
        route: ROUTES.OWNER_CREATE_PRODUCT
    },
    {
        name: "Logs",
        route: ROUTES.OWNER_LOGS
    },
];

export default function Sidebar(): React.JSX.Element {

    const [isLoading, setIsLoading] = React.useState(false);
    const axiosPrivate = useAxiosPrivate();

    const handleLogOut = async () => {
        try {
            setIsLoading(true);
            await ownerLogout(axiosPrivate);
            window.location.href = ROUTES.OWNER_LOGIN;
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
                <p className='text-xl font-semibold mb-6'>Owner</p>

                <div className='flex flex-col gap-2'>
                    {
                        ownerSidebarRoutes.map((route, ind) => {
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
                    href={ROUTES.OWNER_UPDATE_PROFILE}
                    className={`${window.location.href.includes(ROUTES.OWNER_UPDATE_PROFILE)? 'text-black underline' : `text-gray-500`} hover:text-blue-700`}
                >
                    <p>Update Profile</p>
                </a>

                <a 
                    href={ROUTES.OWNER_CHANGE_PASSWORD}
                    className={`${window.location.href.includes(ROUTES.OWNER_CHANGE_PASSWORD)? 'text-black underline' : `text-gray-500`} hover:text-blue-700`}
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
