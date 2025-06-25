import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
    const { cart, removeCart, removeById, getTotalAmount } = useContext(CartContext);
    const [promoCode, setPromoCode] = useState("");
    
    let subtotal = getTotalAmount();
    let estimatedTax = Math.round(subtotal * 0.08); // 8% tax example
    let shipping = 29;
    let total = subtotal + estimatedTax + shipping;

    const handleQuantityChange = (productId, newQuantity) => {
        // Esta función debería actualizarse en tu contexto
        // updateQuantity(productId, newQuantity);
    };

    const handlePromoCodeSubmit = (e) => {
        e.preventDefault();
        // Lógica para aplicar código promocional
        console.log("Código promocional:", promoCode);
    };

    return (
        <div className="cart-container">
            <div className="cart-content">
                <div className="cart-items">
                    <h1 className="cart-title">Carrito de Compras</h1>
                    
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cart.map((product) => (
                            <div key={product.id} className="cart-item">
                                <div className="product-placeholder">
                                    <div className="placeholder-icon">📱</div>
                                </div>
                                
                                <div className="product-details">
                                    <h3 className="product-name">{product.title}</h3>
                                    <p className="product-code">#{product.id}</p>
                                </div>
                                
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                        disabled={product.quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className="quantity">{product.quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <div className="product-price">
                                    ${product.price}
                                </div>
                                
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeById(product.id)}
                                    title="Eliminar producto"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                    
                    {cart.length > 0 && (
                        <button className="clear-cart-btn" onClick={removeCart}>
                            Vaciar carrito
                        </button>
                    )}
                </div>
                
                <div className="order-summary">
                    <h2 className="summary-title">Resumen de orden</h2>
                    
                    
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="summary-row">
                            <span>Impuestos Estimados</span>
                            <span>${estimatedTax}</span>
                        </div>
                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    </div>
                    
                    <Link to="/pagos" className="checkout-btn">
                        Ordenar
                    </Link>
                </div>
            </div>
            
            
        </div>
    );
};