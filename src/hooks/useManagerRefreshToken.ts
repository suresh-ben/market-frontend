import useAuth from './useManagerAuth';

import { getManagerAccessToken } from '../services/auth';
import { AUTH_STATUS } from '../config/constants';

const useRefreshToken = () => {
    const { setAuthData } = useAuth();

    const refresh = async () => {
        let accessToken;

        try {
            const res = await getManagerAccessToken();
            console.log(res, 'Manager Auth data')

            accessToken = res?.managerAccessToken;
            if(!accessToken) throw new Error('Unable to verify. Please try after a moment!');

            setAuthData({
                accessToken: accessToken,
                status: AUTH_STATUS.SUCCESS
            });
        } catch (error) {
            //@ts-ignore
            setAuthData(prev => {
                return {
                    ...prev,
                    status: AUTH_STATUS.FAILED
                }
            });

            throw error;
        }
        
        return accessToken;
    }

    return refresh;
}

export default useRefreshToken;
