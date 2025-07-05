import { useContext } from "react";
import UserDataContext from '../contexts/OwnerUserContext';

const useUserData = () => {
    const { userData, setUserData } = useContext(UserDataContext);
    return { userData, setUserData };
}

export default useUserData;