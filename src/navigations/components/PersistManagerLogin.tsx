import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useManagerAuth';
import useRefreshToken from '../../hooks/useManagerRefreshToken';

import authRoutes from '../routes/managerAuthRoutes';
import { AUTH_STATUS } from '../../config/constants';
import ROUTES from '../routes/routes';
import Loading from '../../components/Loading';

const PersistLogin = () => {

    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const { authData, setAuthData } = useAuth();

    useEffect(() => {
        const verifyrefreshtoken = async () => {

            setAuthData(prev => {
                return {
                    ...prev,
                    status: AUTH_STATUS.LOADING
                }
            });

            try {
                await refresh();
            } catch (error) {
                if(!authRoutes.flatMap(obj => obj.path).includes(window.location.pathname)) 
                    navigate(ROUTES.MANAGER_LOGIN);
            }
        }

        !authData.accessToken && verifyrefreshtoken();
    }, []);

    if(authData.status === AUTH_STATUS.DEFAULT || authData.status === AUTH_STATUS.LOADING) 
        return <Loading />;
    else 
        return <Outlet />
}

export default PersistLogin;
