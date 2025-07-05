import type { AxiosInstance } from "axios";

export async function getAllStocks(axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.get("/api/market/manager/all-stocks");
        return res.data;
    } catch (error) {
        throw error;
    }
}