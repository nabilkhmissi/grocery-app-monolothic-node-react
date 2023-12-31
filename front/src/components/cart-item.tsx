import { useContext, useState } from "react";
import { addToCart } from "../services/customer.service";
import AuthContext from "../context/auth.context";
import CartContext from "../context/cart.context";

export default function CartItem({ item }) {

    const [qty, setQty] = useState(1);
    const { cart, setCart } = useContext(CartContext);
    const { authUser, setAuthUser } = useContext(AuthContext);

    async function handleCartAdd(isRemove: boolean) {
        const cartItem = {
            customerId: authUser.customer._id,
            product: item.product,
            qty: qty,
            isRemove: isRemove || false
        }
        try {
            const c = cart.filter(e => e.product._id !== item.product._id)
            setCart(c)
            const response = await addToCart(cartItem);
        } catch (error) {
            const c = cart.filter(e => e.product._id !== cartItem.product._id);
            setCart(c)
        }
    }

    return (
        <>
            <div>{item.product.name}</div>
            <div>
                <button style={{ borderRadius: '0px', padding: '5px', border: '1px solid black' }}
                    onClick={() => setQty(qty - 1)}>-</button>

                <span style={{ padding: '0 5px' }}>{item.product.price} x {qty}</span>

                <button style={{ borderRadius: '0px', padding: '5px', border: '1px solid black' }}
                    onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button onClick={() => handleCartAdd(true)}>X</button>
        </>
    )
}