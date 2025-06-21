import { Link } from "react-router-dom"
import { MdFamilyRestroom } from "react-icons/md";
import { BsPersonStanding } from "react-icons/bs";
import baner1 from '../../../assets/imagenesPrueba/GreenShop_Flyer1_SinText';
import baner2 from '../../../assets/imagenesPrueba/GreenShop_img2';
import './home.css';
export const Home = () => {
    return(
        <main>
            <div className="centrar_carrusel">
                <div className="tamano">
                    <div id="carouselExampleIndicators" className="carousel slide carrusel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active cont-carrusel">
                                <img src={baner1} className="d-block w-100 zoom" alt="banner1" />
                            </div>
                            <div className="carousel-item cont-carrusel">
                                <img src={baner2} className="d-block w-100" alt="reciclaje2" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <section className="category-conteiner">
                <h3 className="">Buscar por categoria</h3>
                <div className="category">
                    <Link to="/tienda/familiar">
                        <MdFamilyRestroom />
                        <h3>familiar</h3>
                    </Link>
                    <Link to="/tienda/individual">
                        <BsPersonStanding />
                        <h3>individual</h3>
                    </Link>
                </div>                
            </section>            
        </main>        
    )
}