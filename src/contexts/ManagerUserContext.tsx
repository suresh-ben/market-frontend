import { createContext, useState } from 'react';

type ManagerUserData = {
    name: string,
    userId: string,
    email: string,
}

type ManageruserDataContext = {
    userData: ManagerUserData,
    setUserData: React.Dispatch<React.SetStateAction<ManagerUserData>>
}

const defaultData: ManagerUserData = {
    name: "",
    userId: "",
    email: "",
}

const managerUserContext = createContext<ManageruserDataContext>({
    userData: defaultData,
    setUserData: () => {}
});

export const ManagerUserContextProvider = ({ children }: { children: React.JSX.Element }) => {
    
    const [userData, setUserData] = useState<ManagerUserData>(defaultData);

    return <managerUserContext.Provider
        value={{userData, setUserData}}
    >
        {children}
    </managerUserContext.Provider>
}

export default managerUserContext;