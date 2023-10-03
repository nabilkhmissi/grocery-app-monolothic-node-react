import axios from "axios";
import { ApiResponse } from "../models/models";

export async function findProducts() {

    const data: ApiResponse = await axios.get("http://localhost:3000/product");
    return data.data.data;
}

export async function findProductsById(id: string) {

    const data: ApiResponse = await axios.get(`http://localhost:3000/product/${id}`);
    return data.data.data;
}
export async function deleteProducts(id: string) {
    await axios.delete(`http://localhost:3000/product/${id}`);
}