import axios from "axios";
import { ApiResponse } from "../models/models";

export async function findProducts() {

    const response: ApiResponse = await axios.get("http://localhost:3000/products");
    return response.data.data;
}

export async function findProductsById(id: string) {

    const data: ApiResponse = await axios.get(`http://localhost:3000/products/${id}`);
    return data.data.data;
}
export async function deleteProducts(id: string) {
    await axios.delete(`http://localhost:3000/products/${id}`);
}