import { Link } from "react-router-dom"
import './productCard.css'

export const ProductCard = ({ name, price, description, id}) => {
    
    return(
        <Link to={`/detalle/${id}`} className="travel-card">
            <div className="card-content">
                <h3>{name}</h3>
                <p className="card-description">
                    {description}
                </p>
                <div className="card-footer">
                    <span className="price">
                        ${price}
                    </span>
                </div>
            </div>
        </Link>
    );
}