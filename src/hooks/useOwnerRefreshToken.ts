import useAuth from './useOwnerAuth';

import { getOwnerAccessToken } from '../services/auth';
import { AUTH_STATUS } from '../config/constants';

const useRefreshToken = () => {
    const { setAuthData } = useAuth();

    const refresh = async () => {
        let accessToken;

        try {
            const res = await getOwnerAccessToken();

            accessToken = res?.ownerAccessToken;
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
