import { createContext, useState } from 'react';
import { AUTH_STATUS } from '../config/constants';

type OwnerAuthStatus = typeof AUTH_STATUS[keyof typeof AUTH_STATUS];

type OwnerAuthData = {
    status: OwnerAuthStatus,
    accessToken: string
}

type OwnerAuthContext = {
    authData: OwnerAuthData,
    setAuthData: React.Dispatch<React.SetStateAction<OwnerAuthData>>
}

const defaultData: OwnerAuthData = {
    status: AUTH_STATUS.DEFAULT,
    accessToken: '',
}

const ownerAuthContext = createContext<OwnerAuthContext>({
    authData: defaultData,
    setAuthData: () => {}
});

export const OwnerAuthContextProvider = ({ children }: { children: React.JSX.Element }) => {

    const [authData, setAuthData] = useState<OwnerAuthData>(defaultData);

    return <ownerAuthContext.Provider
        value={{authData, setAuthData}}
    >
        {children}
    </ownerAuthContext.Provider>
}

export default ownerAuthContext;