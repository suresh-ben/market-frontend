import { createContext, useState } from 'react';
import { AUTH_STATUS } from '../config/constants';

type ManagerAuthStatus = typeof AUTH_STATUS[keyof typeof AUTH_STATUS];

type ManagerAuthData = {
    status: ManagerAuthStatus,
    accessToken: string
}

type ManagerAuthContext = {
    authData: ManagerAuthData,
    setAuthData: React.Dispatch<React.SetStateAction<ManagerAuthData>>
}

const defaultData: ManagerAuthData = {
    status: AUTH_STATUS.DEFAULT,
    accessToken: '',
}

const managerAuthContext = createContext<ManagerAuthContext>({
    authData: defaultData,
    setAuthData: () => {}
});

export const ManagerAuthContextProvider = ({ children }: { children: React.JSX.Element }) => {

    const [authData, setAuthData] = useState<ManagerAuthData>(defaultData);

    return <managerAuthContext.Provider
        value={{authData, setAuthData}}
    >
        {children}
    </managerAuthContext.Provider>
}

export default managerAuthContext;