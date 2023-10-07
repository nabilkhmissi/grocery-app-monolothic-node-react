import { useEffect, useState } from "react"
import { findProducts } from "../services/products.service";
import { Product } from "../models/models";
import ProductComponent from "../components/product";

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
        <div className="container">
            <h1>Products</h1>
            <div className="products-grid">
                {products && products.map(p => (
                    <ProductComponent product={p} key={p._id} />
                ))}
            </div>
        </div>
    )
}