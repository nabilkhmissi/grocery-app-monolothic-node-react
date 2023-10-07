import axios from "axios";

export async function login(email: string, password: string) {
    const response = await axios.post(`http://localhost:3000/auth/login`, { email, password })
    return response;
}

export async function signup(name: string, email: string, password: string) {
    const response = await axios.post(`http://localhost:3000/auth/signup`, { name, email, password })
    return response;
}