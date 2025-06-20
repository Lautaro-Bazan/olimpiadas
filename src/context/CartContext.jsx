import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    //funciones del carrito
    const addToCart = (product) => {
        let isInCart = cart.some((elemento) => elemento.id === product.id);
        if (isInCart){
            alert("ya esta agregado");
            //encontrar ese producto aumentarle las
            //cantodades y modificar el estado cart
        } else{
            setCart( [...cart, product] );
        }
    };
    const removeCart =() => {
        setCart([]);
    }
    const removeById = (id) => {
        let newArray = cart.filter(elemento => elemento.id !== id)
        setCart(newArray);
    }
    const getTotalAmount = () => {
        let total = cart.reduce((acc, elemento) => {
            return acc + elemento.price * elemento.quantity;
        }, 0);
        return total;
    }
    const getTotalItems = () => {
        let total = cart.reduce((acc, elemento) => {
            return acc + elemento.quantity;
        }, 0);
        return total;
    }

    let data ={ cart, addToCart, removeCart, removeById, getTotalAmount, getTotalItems };
    return <CartContext.Provider value={data}>{children}</CartContext.Provider>
};