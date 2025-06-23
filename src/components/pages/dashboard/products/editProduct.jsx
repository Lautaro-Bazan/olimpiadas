import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from "graphql-request";
import { useGraphQL } from "../../../../graphql/useGraphQL";
import { useMutationGraphQL } from "../../../../graphql/useMutationGraphQL";
import { Button } from "../../../../components/common/buttons/mainButton";
import './productForm.css';

const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      product_code
      name
      description
      price
      scope
      capacity
      flights {
        id
        origin
        destination
        airline
        active
      }
      cars {
        id
        brand
        model
        agency
        active
      }
      stays {
        id
        name
        type
        duration
        active
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $id: ID!
    $input: CreateProductInput!
    $flight: CreateFlightInput
    $car: CreateCarInput
    $stay: CreateStayInput
  ) {
    updateProduct(
      id: $id
      input: $input
      flight: $flight
      car: $car
      stay: $stay
    ) {
      product {
        id
        name
      }
    }
  }
`;

export const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = useMutationGraphQL();
  const { data, error } = useGraphQL(GET_PRODUCT_QUERY, { id: parseInt(id) });

  const [formData, setFormData] = useState({
    product_code: '',
    name: '',
    description: '',
    price: '',
    capacity: 1,
    scope: 'NACIONAL'
  });

  const [flightData, setFlightData] = useState({ origin: '', destination: '', airline: '' });
  const [carData, setCarData] = useState({ brand: '', model: '', agency: '' });
  const [stayData, setStayData] = useState({ name: '', duration: '', type: 'HOTEL' });

  const [includeFlight, setIncludeFlight] = useState(false);
  const [includeCar, setIncludeCar] = useState(false);
  const [includeStay, setIncludeStay] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
        if (error) {
        alert("Error al cargar el producto.");
        return;
    }

    if (!data || !data.product) return; // Esperar a que data esté disponible

    const product = data.product;
      setFormData({
        product_code: product.product_code || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        capacity: product.capacity || 1,
        scope: product.scope || 'NACIONAL'
      });
      if (product.flights?.length) {
        setFlightData(product.flights[0]);
        setIncludeFlight(true);
      }
      if (product.cars?.length) {
        setCarData(product.cars[0]);
        setIncludeCar(true);
      }
      if (product.stays?.length) {
        setStayData(product.stays[0]);
        setIncludeStay(true);
      }
    };
    loadProduct();
  }, [id]);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' || name === 'capacity' ? parseFloat(value) || 0 : value;

    const updateState = (setter) => setter(prev => ({ ...prev, [name]: parsedValue }));

    switch (section) {
      case 'product': updateState(setFormData); break;
      case 'flight': updateState(setFlightData); break;
      case 'car': updateState(setCarData); break;
      case 'stay': updateState(setStayData); break;
      default: break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const variables = {
      id,
      input: {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity)
      }
    };

    if (includeFlight) variables.flight = flightData;
    if (includeCar) variables.car = carData;
    if (includeStay) variables.stay = stayData;

    const {  error } = await mutate(UPDATE_PRODUCT_MUTATION, variables);

    if (error) {
      const validation = error?.response?.errors?.[0]?.extensions?.validation;
      if (validation && validation['input.product_code']) {
        alert('El código del producto ya está en uso. Por favor elige otro.');
      } else {
        alert('Error al actualizar el producto. Verifique los campos.');
      }
      setIsLoading(false);
      return;
    }

    setShowSuccessModal(true);
    setIsLoading(false);
  };

  const handleGoBack = () => navigate('/dashboard');

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>Editar Producto Turístico</h1>
        <p>Modifique los datos del paquete turístico</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
         {/* Información básica del producto */}
        <div className="form-section">
            <h2>Información del Producto</h2>
            <div className="form-grid">
            <div className="form-group">
                <label htmlFor="product_code">Código del Producto *</label>
                <input
                type="text"
                id="product_code"
                name="product_code"
                value={formData.product_code}
                onChange={(e) => handleInputChange(e, 'product')}
                className="input-field"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Nombre del Producto *</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'product')}
                className="input-field"
                required
                />
            </div>

            <div className="form-group full-width">
                <label htmlFor="description">Descripción *</label>
                <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e, 'product')}
                className="input-field"
                rows="4"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Precio (En dolares)*</label>
                <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={(e) => handleInputChange(e, 'product')}
                className="input-field"
                step="0.01"
                min="0"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="capacity">Capacidad *</label>
                <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange(e, 'product')}
                className="input-field"
                min="1"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="scope">Alcance *</label>
                <select
                id="scope"
                name="scope"
                value={formData.scope}
                onChange={(e) => handleInputChange(e, 'product')}
                className="filter-select"
                required
                >
                <option value="LOCAL">Local</option>
                <option value="NACIONAL">Nacional</option>
                <option value="INTERNACIONAL">Internacional</option>
                </select>
            </div>
            </div>
        </div>

        {/* Servicios incluidos */}
        <div className="form-section">
            <h2>Servicios Incluidos</h2>
            
            <div className="service-toggles">
            <label className="checkbox-label">
                <input
                type="checkbox"
                checked={includeFlight}
                onChange={(e) => setIncludeFlight(e.target.checked)}
                />
                <span>Incluir Vuelo</span>
            </label>

            <label className="checkbox-label">
                <input
                type="checkbox"
                checked={includeCar}
                onChange={(e) => setIncludeCar(e.target.checked)}
                />
                <span>Incluir Alquiler de Auto</span>
            </label>

            <label className="checkbox-label">
                <input
                type="checkbox"
                checked={includeStay}
                onChange={(e) => setIncludeStay(e.target.checked)}
                />
                <span>Incluir Estadía</span>
            </label>
            </div>

            {/* Información del vuelo */}
            {includeFlight && (
            <div className="service-section">
                <h3>Información del Vuelo</h3>
                <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="flight_origin">Origen</label>
                    <input
                    type="text"
                    id="flight_origin"
                    name="origin"
                    value={flightData.origin}
                    onChange={(e) => handleInputChange(e, 'flight')}
                    className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="flight_destination">Destino</label>
                    <input
                    type="text"
                    id="flight_destination"
                    name="destination"
                    value={flightData.destination}
                    onChange={(e) => handleInputChange(e, 'flight')}
                    className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="airline">Aerolínea</label>
                    <input
                    type="text"
                    id="airline"
                    name="airline"
                    value={flightData.airline}
                    onChange={(e) => handleInputChange(e, 'flight')}
                    className="input-field"
                    />
                </div>
                </div>
            </div>
            )}

            {/* Información del auto */}
            {includeCar && (
            <div className="service-section">
                <h3>Información del Auto</h3>
                <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="car_brand">Marca</label>
                    <input
                    type="text"
                    id="car_brand"
                    name="brand"
                    value={carData.brand}
                    onChange={(e) => handleInputChange(e, 'car')}
                    className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="car_model">Modelo</label>
                    <input
                    type="text"
                    id="car_model"
                    name="model"
                    value={carData.model}
                    onChange={(e) => handleInputChange(e, 'car')}
                    className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="agency">Agencia</label>
                    <input
                    type="text"
                    id="agency"
                    name="agency"
                    value={carData.agency}
                    onChange={(e) => handleInputChange(e, 'car')}
                    className="input-field"
                    />
                </div>
                </div>
            </div>
            )}

            {/* Información de la estadía */}
            {includeStay && (
            <div className="service-section">
                <h3>Información de la Estadía</h3>
                <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="stay_name">Nombre del Lugar</label>
                    <input
                    type="text"
                    id="stay_name"
                    name="name"
                    value={stayData.name}
                    onChange={(e) => handleInputChange(e, 'stay')}
                    className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Duración</label>
                    <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={stayData.duration}
                    onChange={(e) => handleInputChange(e, 'stay')}
                    className="input-field"
                    placeholder="ej: 3 noches"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stay_type">Tipo de Alojamiento</label>
                    <select
                    id="stay_type"
                    name="type"
                    value={stayData.type}
                    onChange={(e) => handleInputChange(e, 'stay')}
                    className="filter-select"
                    >
                    <option value="HOTEL">Hotel</option>
                    <option value="APARTMENT">Apartamento</option>
                    <option value="HOSTEL">Hostel</option>
                    <option value="RESORT">Resort</option>
                    </select>
                </div>
                </div>
            </div>
            )}
        </div>
    
        <div className="form-actions">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Actualizando Producto...' : 'Actualizar Producto'}
          </Button>     
        </div>
      </form>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>¡Producto Actualizado Exitosamente!</h2>
            </div>
            <div className="modal-body">
              <p>El producto turístico ha sido actualizado correctamente.</p>
            </div>
            <div className="modal-actions">
              <Button onClick={handleGoBack} className="primary-button">
                Volver al Panel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
