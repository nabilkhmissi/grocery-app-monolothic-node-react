import axios from "axios";
import { ApiResponse, Product } from "../models/models";


export async function addToCart(cartItem: { customerId: string, product: Product, qty: number, isRemove: boolean }) {
    const token = getToken().token;
    const response: ApiResponse = await axios.post("http://localhost:3000/customer/cart", cartItem, { headers: { 'authorization': 'Bearer ' + token } });
    return response.data.cart;
}

export async function loadCart() {
    const token = getToken().token;
    const id = getToken().customer._id;
    const response: ApiResponse = await axios.get(`http://localhost:3000/customer/${id}/cart`, { headers: { 'authorization': 'Bearer ' + token } });
    return response;
}
export async function deleteProducts(id: string) {
    await axios.delete(`http://localhost:3000/products/${id}`);
}

function getToken() {
    const auth = localStorage.getItem("grocery_app_user");
    if (auth) {
        const parsed = JSON.parse(auth);
        return parsed
    }
}