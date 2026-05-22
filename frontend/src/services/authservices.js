import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// ✅ CORRECT — sends JSON, matches the Pydantic LoginUser schema
export const loginUser = async (formData) => {
    const response = await API.post("/login", {
        email: formData.email,
        password: formData.password
    });
    return response.data;
};

export const registerUser = async (data) => {
    const response = await API.post(
        "/register",
        data
    );

    return response.data;
};