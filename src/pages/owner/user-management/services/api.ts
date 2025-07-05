import { type AxiosInstance } from "axios"

export async function createManager(axiosPrivate: AxiosInstance, countryName : string, countryDescription: string, name: string, email: string, password: string, userId: string) {
    try {
        const res = await axiosPrivate.post("/api/user-management/owner/create-manager", {
            name,
            countryName,
            countryDescription,
            email,
            password,
            userId
        });

        return res.data;
    } catch (error) {
        throw error
    }
}