import type { AxiosInstance } from "axios";

export async function createProduct(name: string, description: string, axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.post("/api/market/owner/create-product", {
            name,
            description
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}