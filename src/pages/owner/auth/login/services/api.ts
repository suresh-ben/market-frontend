import axios from "../../../../../services/axios";

export async function adminLogIn(userId: string, password: string) {
    try {
        const res = await axios.post("/api/auth/owner/login", {
            userId, password
        }, { withCredentials: true });

        return res.data;
    } catch (error) {
        throw error;
    }
}
