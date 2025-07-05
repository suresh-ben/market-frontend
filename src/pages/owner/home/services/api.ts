import type { AxiosInstance } from "axios";

export async function getAllStocks(axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.get("/api/market/owner/all-stocks");
        return res.data;
    } catch (error) {
        throw error;
    }
}