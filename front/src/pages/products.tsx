import { useEffect, useState } from "react"
import { findProducts } from "../services/products.service";
import { Product } from "../models/models";

export default function Products() {
    const [products, setProducts] = useState<Product[]>();
    useEffect(() => {
        async function getProducts() {
            const data = await findProducts();
            setProducts(data)
        }
        getProducts()
    }, [])
    return (
        <div>
            <h1>Products</h1>
            <div className="products-grid">
                {products && products.map(p => (
                    <div className="product-card" key={p.name}>
                        <h3>{p.name}</h3>
                        <p>{p.desc}</p>
                        <h2>$ {p.price}</h2>
                        <h3>{p.available ? 'en stock' : 'out of stock'}</h3>
                        <p>{p.suplier}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}