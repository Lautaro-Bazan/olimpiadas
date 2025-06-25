import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGraphQL } from "../../../graphql/useGraphQL";
import { Counter } from "../../common/counter/Counter";
import './itemDetail.css'

// Query GraphQL con variable para el ID
const GET_PRODUCT_BY_ID = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id 
      name
      description
      price
      capacity
      scope
      is_package
      flights {
        origin
        destination
        airline
      }
      stays {
        name 
        duration
        type
      }
      cars {
        model
        brand
        agency
      }
    }
  }
`;

export const ItemDetail = () => {
    const { id } = useParams();
    
    // Hook de GraphQL para obtener producto por ID
    const { data, loading, error, refetch } = useGraphQL(
        GET_PRODUCT_BY_ID, 
        { id: id }, // Variables para la query
        { skip: !id } // Skip si no hay ID
    );
    
    // Extraer producto de la respuesta
    const item = data?.product || {};
    
    // Manejar estado de carga
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <h3>Cargando producto...</h3>
            </div>
        );
    }
    
    // Manejar errores
    if (error) {
        return (
            <div className="error-container">
                <h3>Error al cargar el producto</h3>
                <p>{error.message}</p>
                <button onClick={refetch} className="retry-button">
                    Reintentar
                </button>
            </div>
        );
    }
    
    // Si no se encontró el producto
    if (!item.id) {
        return (
            <div className="not-found-container">
                <h3>Producto no encontrado</h3>
                <p>El producto con ID {id} no existe.</p>
            </div>
        );
    }
    
    return (
        <div className="item-detail-wrapper">
            <div className="item-detail-container">
                {/* Imagen del producto */}
                <div className="product-image-section">
                    <div className="product-image">
                        {/* Placeholder para imagen - puedes agregar src cuando tengas imágenes */}
                        <div className="image-placeholder">
                            <span>📸</span>
                        </div>
                    </div>
                </div>

                {/* Información del producto */}
                <div className="product-info-section">
                    <div className="product-header">
                        <h1 className="product-title">{item.name}</h1>
                        
                        <div className="price-section">
                            <div className="current-price">${item.price}</div>
                            <div className="price-per-person">por persona</div>
                        </div>

                        {/* Tags/Badges */}
                        <div className="product-badges">
                            <span className="badge badge-international">
                                🌍 Internacional
                            </span>
                            {item.capacity && (
                                <span className="badge badge-capacity">
                                    👥 Hasta {item.capacity} personas
                                </span>
                            )}
                            {item.is_package && (
                                <span className="badge badge-package">
                                    📦 Paquete No
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="product-description">
                        <p>{item.description}</p>
                    </div>

                    {/* Detalles en cards */}
                    <div className="details-grid">
                        {/* Vuelos */}
                        {item.flights && item.flights.length > 0 && (
                            <div className="detail-card">
                                <div className="card-header">
                                    <span className="card-icon">✈️</span>
                                    <h3>Vuelos incluidos</h3>
                                </div>
                                <div className="card-content">
                                    {item.flights.map((flight, index) => (
                                        <div key={index} className="detail-item">
                                            <div className="flight-route">
                                                <span className="origin">{flight.origin}</span>
                                                <span className="arrow">→</span>
                                                <span className="destination">{flight.destination}</span>
                                            </div>
                                            <div className="airline">{flight.airline}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Estadías */}
                        {item.stays && item.stays.length > 0 && (
                            <div className="detail-card">
                                <div className="card-header">
                                    <span className="card-icon">🏨</span>
                                    <h3>Estadías incluidas</h3>
                                </div>
                                <div className="card-content">
                                    {item.stays.map((stay, index) => (
                                        <div key={index} className="detail-item">
                                            <div className="stay-name">{stay.name}</div>
                                            <div className="stay-details">
                                                <span>{stay.duration}</span>
                                                <span className="separator">•</span>
                                                <span>{stay.type}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Autos */}
                        {item.cars && item.cars.length > 0 && (
                            <div className="detail-card">
                                <div className="card-header">
                                    <span className="card-icon">🚗</span>
                                    <h3>Autos incluidos</h3>
                                </div>
                                <div className="card-content">
                                    {item.cars.map((car, index) => (
                                        <div key={index} className="detail-item">
                                            <div className="car-model">{car.brand} {car.model}</div>
                                            <div className="car-agency">{car.agency}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Counter section */}
                    <div className="counter-section">
                        <Counter item={item} />
                    </div>
                </div>
            </div>
        </div>
    );
};