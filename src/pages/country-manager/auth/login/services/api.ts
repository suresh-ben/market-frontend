import axios from "../../../../../services/axios";

export async function managerLogIn(userId: string, password: string) {
    try {
        const res = await axios.post("/api/auth/manager/login", {
            userId, password
        }, { withCredentials: true });

        return res.data;
    } catch (error) {
        throw error;
    }
}
