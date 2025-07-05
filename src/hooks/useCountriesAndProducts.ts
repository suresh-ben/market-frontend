import { useContext } from 'react';
import countriesAndProductsContext from '../contexts/CountriesAndProductsContext';

const useCountriesAndProducts = () => {
    const { countriesAndProducts, setCountriesAndProducts } = useContext(countriesAndProductsContext);
    return { countriesAndProducts, setCountriesAndProducts }
}

export default useCountriesAndProducts;
