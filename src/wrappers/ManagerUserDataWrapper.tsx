import React, { useState, useEffect } from 'react'

import useAuth from '../hooks/useManagerAuth';
import useUserData from '../hooks/useManagerUserData';
import useAxiosPrivate from '../hooks/useManagerAxiosPrivate';

import { getManagerInfo } from '../services/auth';
import { AUTH_STATUS } from '../config/constants';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

export default function ManagerUserDataWrapper({ children }: { children: React.JSX.Element }) {

    const { authData } = useAuth();

    const { setUserData } = useUserData();
    const axiosPrivate = useAxiosPrivate();

    const [isFetchingUserData, setIsFetchingUserData] = useState(false);

    useEffect(() => {
        if(authData.status != AUTH_STATUS.SUCCESS) return;

        (async () => {
            try {
                setIsFetchingUserData(true);
                const { manager } = await getManagerInfo(axiosPrivate);

                setUserData({
                    name: manager.name,
                    userId: manager.userId,
                    email: manager.email
                })
            } catch (error) {
                toast.error('Failed to fetch user data');
            } finally {
                setIsFetchingUserData(false);
            }
        })();
    }, [authData.status, axiosPrivate]);

    if(isFetchingUserData) {
        return <Loading />;
    }

    return (
        <>
            {children}
        </>
    )
}
