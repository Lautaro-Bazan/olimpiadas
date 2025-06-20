import { Link } from "react-router-dom"
import { CartWidget } from "../../common/cartWidget/CartWidget"
export const Navbar = () => {
    return (
        <nav>
            <h3>Todo Incluido</h3>
            <ul>
                <Link to="/tienda">tienda</Link>
            </ul>
            <CartWidget />
        </nav>
    )
}