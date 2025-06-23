import { NavLink } from "react-router-dom"
import { CartWidget } from "../../common/cartWidget/CartWidget"
import { FaUser } from "react-icons/fa"
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext"
import "./navbar.css" 

export const Navbar = () => {
    const { isAdmin } = useAuth();
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
                { isAdmin ? (<NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} ><MdDashboard className="icon user-icon" /></NavLink>): null }
            </div>
        </nav>
    );
};
