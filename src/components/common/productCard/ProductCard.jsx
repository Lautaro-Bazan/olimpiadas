import { Link } from "react-router-dom"
export const ProductCard = ({ title, price, description, id}) => {
    
    return(
        <Link to={`/detalle/${id}`}>
        <div>
            <h3>{title}</h3>
            <h3>{price}</h3>
            <h3>{description}</h3>
        </div>
        </Link>
    );
}