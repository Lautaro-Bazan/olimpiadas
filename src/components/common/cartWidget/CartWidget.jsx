import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

export const CartWidget = () => {
    const { getTotalItems } = useContext(CartContext);
    let total = getTotalItems();
    return (
        <div>
            <Link to="/carrito">
                <IoCartOutline />
                <div>
                    <h4>{total}</h4>
                </div>
            </Link>            
        </div>
    )
}