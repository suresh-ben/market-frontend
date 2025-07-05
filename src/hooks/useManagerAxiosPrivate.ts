import { useEffect } from 'react';

import axiosPrivate from '../services/axios';
import useRefreshToken from './useManagerRefreshToken';
import useAuth from './useManagerAuth';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { authData } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization'])   //first time
                    config.headers['Authorization'] = `Bearer ${authData?.accessToken}`;
                return config;
            }, 
            error => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config;

                if((error?.response?.status === 401) && !prevRequest?.sent) {
                    //failed due to expired access token

                    prevRequest.sent = true;    //No endless loop
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [authData, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;
