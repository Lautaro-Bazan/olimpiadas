import { Link } from "react-router-dom"
import { MdFamilyRestroom } from "react-icons/md";
import { BsPersonStanding } from "react-icons/bs";
import baner1 from '../../../assets/imagenesPrueba/GreenShop_Flyer1_SinText.jpg';
import baner2 from '../../../assets/imagenesPrueba/GreenShop_img2.jpg';
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
                <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="feature-card international-flights">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop" alt="Vuelos Internacionales" />
              </div>
              <div className="card-content">
                <h3>Vuelos<br />Internacionales</h3>
                <p>Vuela a cualquier destino del mundo con las mejores aerolíneas</p>
              </div>
            </div>

            <div className="feature-card car-rental">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop" alt="Alquiler de Autos" />
              </div>
              <div className="card-content">
                <h3>Alquiler de<br />Autos</h3>
                <p>Explora con libertad. Encuentra el auto perfecto para tu aventura</p>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="feature-card complete-stays">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" alt="Estadías Completas" />
              </div>
              <div className="card-content">
                <h3>Estadías<br />Completas</h3>
                <p>Hoteles de lujo con todas las comodidades que necesitas</p>
                <button className="cta-button">Ver Hoteles</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">✈️</div>
              <h4>Vuelos</h4>
              <p>Boletos aéreos a los mejores precios</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🏨</div>
              <h4>Hoteles</h4>
              <p>Hospedaje de calidad garantizada</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🚗</div>
              <h4>Autos</h4>
              <p>Renta de vehículos para tu comodidad</p>
            </div>
            <div className="service-item">
              <div className="service-icon">📦</div>
              <h4>Paquetes</h4>
              <p>Experiencias completas todo incluido</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para tu próxima aventura?</h2>
            <p>Descubre destinos increíbles con nuestros paquetes especiales</p>
            <button className="cta-button-large">Explorar Destinos</button>
          </div>
        </div>
      </section>
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