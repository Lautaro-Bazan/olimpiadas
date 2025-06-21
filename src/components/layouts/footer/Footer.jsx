import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Sección izquierda - Información de la empresa */}
                <div className="footer-left">
                    <h2 className="footer-logo">TodoIncluido</h2>
                    <p className="footer-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, illum id neque eveniet ex recusandae, laudantium repudiandae voluptatum nobis odit dicta quia laboriosam saepe obcaecati sit pariatur rem unde alias.
                    </p>
                    
                    {/* Enlaces de redes sociales */}
                    <div className="social-links">
                        <FaInstagram className="social-icon" />
                        <FaYoutube className="social-icon" />
                        <FaFacebook  className="social-icon" />
                    </div>
                </div>

                {/* Sección del medio - Servicios */}
                <div className="footer-middle">
                    <h3 className="footer-section-title">Servicios</h3>
                    <ul className="footer-link-list">
                        <li><a href="#" className="footer-link">Paquetes</a></li>
                        <li><a href="#" className="footer-link">Vuelos Aereos</a></li>
                        <li><a href="#" className="footer-link">Alquiler de Autos</a></li>
                        <li><a href="#" className="footer-link">Hoteles</a></li>
                    </ul>
                </div>

                {/* Sección derecha - Contacto */}
                <div className="footer-right">
                    <h3 className="footer-section-title">Contactate con Nosotros</h3>
                    <div className="contact-info">
                        <p className="contact-item">TodoIncluido@gmail.com</p>
                        <p className="contact-item">Términos de Entrega</p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-copyright">
                <p>Copyright © 2025 Todos los derechos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;