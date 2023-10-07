import { useContext, useState } from "react"
import CartContext from "../context/cart.context"
import { addToCart } from "../services/customer.service";
import AuthContext from "../context/auth.context";

export default function ProductComponent({ product }) {

    const { cart, setCart } = useContext(CartContext);
    const { authUser, setAuthUser } = useContext(AuthContext);
    const [inCart, setInCart] = useState(false)

    async function handleCartAdd() {
        try {
            const cartItem = { customerId: authUser.customer._id, product: product, qty: 1, isRemove: false }
            const response = await addToCart(cartItem);
            setCart([...cart, cartItem])
            setInCart(true)
        } catch (error) {
            const c = cart.filter(e => e.product._id !== product._id)
            setCart(c)
            setInCart(false)
        }
    }

    return (
        <div className="product-card" key={product.name}>
            <div className="product-overlay">
                <button disabled={inCart} onClick={handleCartAdd}>Add to cart</button>
            </div>
            <div className="product-image">
                <img src={product.image} />
            </div>
            <div className="details">
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <h2>$ {product.price}</h2>
                <h3 style={product.available ? { color: "green" } : { color: "red" }}>{product.available ? 'en stock' : 'out of stock'}</h3>
                <p>{product.suplier}</p>
            </div>
        </div >
    )
}