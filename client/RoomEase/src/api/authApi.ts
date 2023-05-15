import axios from "axios";
import { BASE_URL } from "./baseURL";

export const authApi = axios.create({
    baseURL: BASE_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
