import { NavLink } from "react-router-dom"
import { CartWidget } from "../../common/cartWidget/CartWidget"
import { FaUser } from "react-icons/fa"
import "./navbar.css" 

export const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <a href="/" className="logo-link"> <div className="logo">TodoIncluido</div></a>

            {/* Search 
            <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                />
            </div>*/}

            {/* Navigation links and icons */}
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inicio</NavLink>
                <NavLink to="/tienda" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Tienda</NavLink>
                <CartWidget />
                <NavLink to="/usuario" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} ><FaUser className="icon user-icon" /></NavLink>
            </div>
        </nav>
    );
};
