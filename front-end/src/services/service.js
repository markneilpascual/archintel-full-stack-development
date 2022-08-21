import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/",
});

export default service;
