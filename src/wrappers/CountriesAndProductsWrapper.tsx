import React, { useEffect } from 'react'
import useManagerAuth from '../hooks/useManagerAuth'
import useOwnerAuth from '../hooks/useOwnerAuth'
import { AUTH_STATUS } from '../config/constants';
import { getProductsAsManager, getProductsAsOwner, getCountriesAsManager, getCountriesAsOwner } from '../services/appData';
import useOwnerAxiosPrivate from '../hooks/useOwnerAxiosPrivate';
import useManagerAxiosPrivate from '../hooks/useManagerAxiosPrivate';
import useCountriesAndProducts from '../hooks/useCountriesAndProducts';
// import { toast } from 'react-toastify';

export default function CountriesAndProductsWrapper({ children }: { children: React.JSX.Element }): React.JSX.Element {
    
    const ownerAxiosPrivate = useOwnerAxiosPrivate();
    const managerAxiosPrivate = useManagerAxiosPrivate();
    const { setCountriesAndProducts } = useCountriesAndProducts();

    const { authData: ownerAuthData } = useOwnerAuth();
    const { authData: managerAuthData } = useManagerAuth();

    useEffect(() => {
        if(ownerAuthData.status != AUTH_STATUS.SUCCESS && ownerAuthData.accessToken) return;

        setTimeout((async () => {
            try {
                const { countries } = await getCountriesAsOwner(ownerAxiosPrivate);
                const { products } = await getProductsAsOwner(ownerAxiosPrivate);

                setCountriesAndProducts({
                    countries,
                    products
                });
            } catch (error) {
                // toast.error('Failed to fetch countries and products. Please try again.');
            }
        }), 200);
    }, [ownerAuthData.status])

    useEffect(() => {
        if(managerAuthData.status != AUTH_STATUS.SUCCESS && ownerAuthData.accessToken) return;
        
        setTimeout((async () => {
            try {
                const { countries } = await getCountriesAsManager(managerAxiosPrivate);
                const { products } = await getProductsAsManager(managerAxiosPrivate);

                setCountriesAndProducts({
                    countries,
                    products
                })
            } catch (error) {
                // toast.error('Failed to fetch countries and products. Please try again.');
            }
        }), 200)
    }, [managerAuthData.status, managerAxiosPrivate])

    return (
        <>{children}</>
    )
}
