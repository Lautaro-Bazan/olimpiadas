import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import "./cartWidget.css";

export const CartWidget = () => {
    const { getTotalItems } = useContext(CartContext);
    let total = getTotalItems();
    return (
        <div>
            <NavLink  to="/carrito"   className={({ isActive }) => isActive ? "cartlink nav-link active" : "cartlink nav-link"}>
                <IoCartOutline />
                <div>
                    <h4>{total}</h4>
                </div>
            </NavLink>            
        </div>
    )
}