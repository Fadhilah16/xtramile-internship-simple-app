import axios from "axios";


const APP_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: APP_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;