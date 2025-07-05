import { createContext, useState } from 'react';

type OwnerUserData = {
    name: string,
    userId: string,
    email: string,
}

type OwneruserDataContext = {
    userData: OwnerUserData,
    setUserData: React.Dispatch<React.SetStateAction<OwnerUserData>>
}

const defaultData: OwnerUserData = {
    name: "",
    userId: "",
    email: "",
}

const ownerUserContext = createContext<OwneruserDataContext>({
    userData: defaultData,
    setUserData: () => {}
});

export const OwnerUserContextProvider = ({ children }: { children: React.JSX.Element }) => {
    
    const [userData, setUserData] = useState<OwnerUserData>(defaultData);

    return <ownerUserContext.Provider
        value={{userData, setUserData}}
    >
        {children}
    </ownerUserContext.Provider>
}

export default ownerUserContext;