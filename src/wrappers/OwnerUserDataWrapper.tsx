import React, { useState, useEffect } from 'react'

import useAuth from '../hooks/useOwnerAuth';
import useUserData from '../hooks/useOwnerUserData';
import useAxiosPrivate from '../hooks/useOwnerAxiosPrivate';

import { getOwnerInfo } from '../services/auth';
import { AUTH_STATUS } from '../config/constants';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

export default function OwnerUserDataWrapper({ children }: { children: React.JSX.Element }) {

    const { authData } = useAuth();

    const { setUserData } = useUserData();
    const axiosPrivate = useAxiosPrivate();

    const [isFetchingUserData, setIsFetchingUserData] = useState(false);

    useEffect(() => {
        if(authData.status != AUTH_STATUS.SUCCESS) return;

        (async () => {
            try {
                setIsFetchingUserData(true);
                const { owner } = await getOwnerInfo(axiosPrivate);

                setUserData({
                    name: owner.name,
                    userId: owner.userId,
                    email: owner.email
                })
            } catch (error) {
                toast.error('Failed to fetch user data');
            } finally {
                setIsFetchingUserData(false);
            }
        })();
    }, [authData.status, axiosPrivate]);

    if(isFetchingUserData) {
        return <Loading />
    }

    return (
        <>
            {children}
        </>
    )
}
