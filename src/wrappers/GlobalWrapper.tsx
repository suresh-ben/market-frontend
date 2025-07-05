import React from "react";
import { OwnerAuthContextProvider } from "../contexts/OwnerAuthContext";
import { OwnerUserContextProvider } from "../contexts/OwnerUserContext";
import { ManagerAuthContextProvider } from "../contexts/ManagerAuthContext";
import { ManagerUserContextProvider } from "../contexts/ManagerUserContext";
import OwnerUserDataWrapper from "./OwnerUserDataWrapper";
import ManagerUserDataWrapper from "./ManagerUserDataWrapper";
import { CountriesAndProductsContextProvider } from "../contexts/CountriesAndProductsContext";
import CountriesAndProductsWrapper from "./CountriesAndProductsWrapper";

export default function GlobalWrapper({ children }: { children: React.JSX.Element }) {
    return (
        <OwnerAuthContextProvider>
            <OwnerUserContextProvider>

                <ManagerAuthContextProvider>
                    <ManagerUserContextProvider>
                        
                        <OwnerUserDataWrapper>
                            <ManagerUserDataWrapper>

                                <CountriesAndProductsContextProvider>
                                    <CountriesAndProductsWrapper>
                                        {children}
                                    </CountriesAndProductsWrapper>
                                </CountriesAndProductsContextProvider>
                                
                            </ManagerUserDataWrapper>
                        </OwnerUserDataWrapper>

                    </ManagerUserContextProvider>
                </ManagerAuthContextProvider>

            </OwnerUserContextProvider>
        </OwnerAuthContextProvider>
    )
}
