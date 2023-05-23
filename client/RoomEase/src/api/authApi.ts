import axios from "axios";
import { BASE_URL } from "./baseURL";

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
