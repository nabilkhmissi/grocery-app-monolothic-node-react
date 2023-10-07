export default function ProductComponent({ product }) {
    return (
        <div className="product-card" key={product.name}>
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