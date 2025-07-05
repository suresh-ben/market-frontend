import { createContext, useState } from 'react';
import { type Country } from '../@types/Country';
import { type Product } from '../@types/Product';

type CountriesAndProductsData = {
    countries: Country[],
    products: Product[]
}

type CountriesAndProductsContext = {
    countriesAndProducts: CountriesAndProductsData,
    setCountriesAndProducts: React.Dispatch<React.SetStateAction<CountriesAndProductsData>>
}

const defaultData: CountriesAndProductsData = {
    countries: [],
    products: []
}

const countriesAndProductsContext = createContext<CountriesAndProductsContext>({
    countriesAndProducts: defaultData,
    setCountriesAndProducts: () => {}
});

export const CountriesAndProductsContextProvider = ({ children }: { children: React.JSX.Element }) => {

    const [countriesAndProducts, setCountriesAndProducts] = useState<CountriesAndProductsData>(defaultData);

    return <countriesAndProductsContext.Provider
        value={{countriesAndProducts, setCountriesAndProducts}}
    >
        {children}
    </countriesAndProductsContext.Provider>
}

export default countriesAndProductsContext;