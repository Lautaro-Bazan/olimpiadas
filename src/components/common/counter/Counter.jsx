import { useContext, useState } from "react"
import { CartContext } from "../../../context/CartContext";
import './counter.css';

export const Counter = ({item}) => {
    const [contador, setContador] = useState(1);
    const { addToCart} = useContext(CartContext);

    const sumar = () => {
        if (contador < 10){
            setContador(contador + 1);
        }
    };
    
    const restar = () => {
        if (contador > 1){
            setContador(contador - 1);
        }     
    };
    
    //agregar al carrito
    const onAdd = () => {
        let newCart = {...item, quantity: contador}
        addToCart(newCart);
    }
    
    return (
        <div className="counter-container">
            {/* Selector de cantidad */}
            <div className="quantity-selector">
                <button 
                    onClick={restar} 
                    className="quantity-btn quantity-btn-minus"
                    disabled={contador <= 1}
                >
                    −
                </button>
                <span className="quantity-display">{contador}</span>
                <button 
                    onClick={sumar} 
                    className="quantity-btn quantity-btn-plus"
                    disabled={contador >= 10}
                >
                    +
                </button>
            </div>
            
            {/* Botón agregar al carrito */}
            <button onClick={onAdd} className="add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    );
};