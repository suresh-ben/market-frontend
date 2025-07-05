import type { AxiosInstance } from "axios";

export async function createRequest(country_id: string, product_id: string, updatedQuantity: string, updatedPrice: string, axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.post("/api/market/manager/request-stock-update", {
            country_id,
            product_id,
            updatedQuantity,
            updatedPrice
        });

        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getStockByCountryAndProduct(country_id: string, product_id: string, axiosPrivate: AxiosInstance) {
    try {   
        const res = await axiosPrivate.get(`/api/market/manager/stock-by-country-and-product/${country_id}/${product_id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}