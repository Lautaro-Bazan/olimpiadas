import { useContext } from "react"
import { CartContext } from "../../../context/CartContext"
import { Link } from "react-router-dom";

//de aca se tiene que ir al checkout 
export const Cart = () => {
    const { cart, removeCart, removeById, getTotalAmount } = useContext(CartContext);
    let total = getTotalAmount();
    return (
        <main>
            {cart.map((product) => {
                return (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <h3>{product.price}</h3>
                        <h3>{product.quantity}</h3>
                        <button onClick={() => removeById(product.id)}>Eliminar</button>
                    </div>
                );
            })}
            <button onClick={removeCart}>Vaciar carrito</button>
            <h2>El total a pagar es: {total}</h2>
            <Link to="/pagos">Finalizar compra</Link>
        </main>
    );
}