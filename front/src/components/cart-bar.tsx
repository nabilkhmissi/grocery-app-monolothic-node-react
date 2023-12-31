import { useContext } from "react"
import CartContext from "../context/cart.context"
import CartItem from "./cart-item";

export default function CartBar({ isOpen }: { isOpen: boolean }) {

    const { cart, setCart } = useContext(CartContext);

    return (
        <div className="cart-bar" style={isOpen ? { translate: '0 0' } : { translate: '100% 0' }}>
            <ul>
                {cart.map(item => {
                    return (
                        <li key={item.product._id}>
                            <CartItem item={item} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}