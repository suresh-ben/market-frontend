import {useContext} from 'react';
import authContext from '../contexts/ManagerAuthContext';

const useAuth = () => {
    const { authData, setAuthData } = useContext(authContext);
    return { authData, setAuthData }
}

export default useAuth;
