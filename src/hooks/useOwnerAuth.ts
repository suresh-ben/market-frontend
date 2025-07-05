import {useContext} from 'react';
import authContext from '../contexts/OwnerAuthContext';

const useAuth = () => {
    const { authData, setAuthData } = useContext(authContext);
    return { authData, setAuthData }
}

export default useAuth;
