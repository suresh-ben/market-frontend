import type { AxiosInstance } from "axios"
import axios from "./axios";


export async function getManagerAccessToken() {
    try{
        const response = await axios.get(`/api/auth/manager/generate-access-token`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function getOwnerAccessToken() {
    try{
        const response = await axios.get(`/api/auth/owner/generate-access-token`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function managerLogout(axiosPrivate: AxiosInstance) {
    try{
        const response = await axiosPrivate.post(`/api/auth/manager/logout`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return response.data;
    } catch(error) {
        throw error;
    }
}


export async function ownerLogout(axiosPrivate: AxiosInstance) {
    try{
        const response = await axiosPrivate.post(`/api/auth/owner/logout`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function getOwnerInfo(axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.get("/api/auth/owner/info");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getManagerInfo(axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.get("/api/auth/manager/info");
        return res.data;
    } catch (error) {
        throw error;
    }
}