import type { AxiosInstance } from "axios";

export async function getAllStockUpdateRequests(axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.get("/api/market/owner/get-all-stock-update-requests");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function acceptStockUpdateRequest(axiosPrivate: AxiosInstance, request_id: string) {
    try {
        const res = await axiosPrivate.post("/api/market/owner/accept-stock-update", { request_id });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function rejectStockUpdateRequest(axiosPrivate: AxiosInstance, request_id: string) {
    try {
        const res = await axiosPrivate.post("/api/market/owner/reject-stock-update", { request_id });
        return res.data;
    } catch (error) {
        throw error;
    }
}