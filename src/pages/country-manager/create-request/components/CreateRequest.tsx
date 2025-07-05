import React, { useEffect, useRef } from 'react'
import Input from '../../../../components/Input'
import PrimaryButton from '../../../../components/PrimaryButton'
import useAxiosPrivate from '../../../../hooks/useOwnerAxiosPrivate'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import Loading from '../../../../components/Loading'
import useCountriesAndProducts from '../../../../hooks/useCountriesAndProducts'
import Select from '../../../../components/Select'
import { createRequest, getStockByCountryAndProduct } from '../services/api'

export default function CreateRequest(): React.JSX.Element {

    const axiosPrivate = useAxiosPrivate();
    const { countriesAndProducts: { countries, products } } = useCountriesAndProducts();

    const [country, setCountry] = React.useState<string>('');
    const [product, setProduct] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<number>(0);
    const [price, setPrice] = React.useState<number>(0);

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [countryError, setCountryError] = React.useState<string>('');
    const [productError, setProductError] = React.useState<string>('');
    const [quantityError, setQuantityError] = React.useState<string>('');
    const [priceError, setPriceError] = React.useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setCountryError('');
    }, [country]);

    useEffect(() => {
        setProductError('');
    }, [product]);

    useEffect(() => {
        setQuantityError('');
    }, [quantity]);

    useEffect(() => {
        setPriceError('');
    }, [price]);

    const handleGetStock = async () => {
        try {
            setIsLoading(true);
            const { stock } = await getStockByCountryAndProduct(country, product, axiosPrivate);

            setQuantity(stock.quantity || 0);
            setPrice(stock.price || 0);
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to login. Please try again.");

            setQuantity(0);
            setPrice(0);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCreateRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!country) {
            setCountryError('Please select a country');
            return;
        }

        if(!product) {
            setProductError('Please select a product');
            return;
        }

        if(quantity < 0) {
            setQuantityError('Please enter a valid quantity');
            return;
        }

        if(price < 0) {
            setPriceError('Please enter a valid price');
            return;
        }

        try {
            setIsLoading(true);

            await createRequest(country, product, quantity.toString(), price.toString(), axiosPrivate);

            setCountry('');
            setProduct('');
            setQuantity(0);
            setPrice(0);

            setCountryError('');
            setProductError('');
            setQuantityError('');
            setPriceError('');
            formRef.current?.reset();

            toast.info('Request created successfully');
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(!country ||!product) return;
        (async () => {
            await handleGetStock();
        })()
    }, [country, product]);

    return (
        <form 
            className='bg-white p-6 w-full rounded-sm shadow-lg'
            onSubmit={handleCreateRequest}
            ref={formRef}
        >
            {isLoading && <Loading />}
            {
                !isLoading && <>
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <Select 
                                label='Country'
                                name='country'
                                defaultValue={country}
                                onChange={setCountry}
                                isErrRequired
                                errorMessage={countryError}
                                options={countries.map(country => ({ key: country.name, value: country._id || ""}))}
                            />
                        </div>

                        <div className='flex-1'>
                            <Select 
                                label='Product'
                                name='product'
                                defaultValue={product}
                                onChange={setProduct}
                                isErrRequired
                                errorMessage={productError}
                                options={products.map(country => ({ key: country.name, value: country._id || ""}))}
                            />
                        </div>
                    </div>

                    <Input
                        disabled={!product || !country}
                        name='quantity'
                        label='Quantity'
                        type='number'
                        defaultValue={quantity}
                        errorMessage={quantityError}
                        isErrRequired
                        inputFormatter={val => `${Number.isNaN(Number(val))? 0 : Number(val)}` || ''}
                        onChange={val => setQuantity(Number(val))}
                    />

                    <Input
                        disabled={!product || !country}
                        name='price'
                        label='Price'
                        type='number'
                        defaultValue={price}
                        errorMessage={priceError}
                        isErrRequired
                        inputFormatter={val => `${Number(val)}`}
                        onChange={val => setPrice(Number(val))}
                    />

                    <div className='flex justify-end items-end'>
                        <div className='w-[15rem]'>
                            <PrimaryButton 
                                label='Create Request'
                                type="submit"
                            />
                        </div>
                    </div>
                </>
            }
        </form>
    )
}
