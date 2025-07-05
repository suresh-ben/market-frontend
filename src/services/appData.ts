import type { AxiosInstance } from "axios"

export async function getCountriesAsManager(axiosPrivate: AxiosInstance) {
    try{
        const response = await axiosPrivate.get(`/api/market/manager/all-countries`);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function getProductsAsManager(axiosPrivate: AxiosInstance) {
    try{
        const response = await axiosPrivate.get(`/api/market/manager/all-products`);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function getCountriesAsOwner(axiosPrivate: AxiosInstance) {
    try{
        const response = await axiosPrivate.get(`/api/market/owner/all-countries`);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function getProductsAsOwner(axiosPrivate: AxiosInstance) {
    try{
        const response = await axiosPrivate.get(`/api/market/owner/all-products`);
        return response.data;
    } catch(error) {
        throw error;
    }
}