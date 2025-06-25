import { useContext, useState } from "react"
import { CartContext } from "../../../context/CartContext";

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
        <div>
            <button onClick={restar}>Restar</button>
            <h3>Contador: {contador}</h3>
            <button onClick={sumar}>Sumar</button>
            <button onClick={onAdd}>Agregar al carrito</button>
        </div>
    );
};