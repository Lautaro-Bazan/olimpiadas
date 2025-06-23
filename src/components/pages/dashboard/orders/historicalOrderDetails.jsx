import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql } from "graphql-request";
import { useGraphQL } from "../../../../graphql/useGraphQL";
import { Button } from "../../../../components/common/buttons/mainButton";
import './historicalOrderDetail.css'; // Assuming you have a CSS file for styles

const HISTORICAL_ORDER_QUERY = gql`
  query HistoricalOrder($id: ID!) {
    historicalOrder(id: $id) {
      id
      status
      created_at
      user {
        firstname
        lastname
        email
      }
      historicalOrderDetails {
        id
        subtotal_price
        quantity
        product {
          name
        }
      }
    }
  }
`;

export const HistoricalOrderDetails = () => {
  const { id } = useParams();
  console.log("Order ID from params:", id);



  const [showDetails, setShowDetails] = useState(true);
  
  const { data, loading, error } = useGraphQL(HISTORICAL_ORDER_QUERY, { id: id});
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-title">Error al cargar la orden</div>
          <p className="error-message">{error.message}</p>
          <Button onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
      </div>
    );
  }
  
  if (!data?.historicalOrder) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-title">Orden no encontrada</div>
          <Button onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
      </div>
    );
  }
  
  const order = data.historicalOrder;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusClass = (status) => {
    const statusMap = {
      'completed': 'status-completed',
      'cancelled': 'status-cancelled',
      'pending': 'status-pending',
      'processing': 'status-processing'
    };
    return statusMap[status?.toLowerCase()] || 'status-default';
  };
  
  const calculateTotal = () => {
    return order.historicalOrderDetails.reduce((total, detail) => {
      return total + (detail.subtotal_price || 0);
    }, 0);
  };
  
  return (
    <div className="historical-order-container">
      <div className="order-content">
        {/* Header */}
        <div className="header-section">
          <Button 
            onClick={() => window.history.back()}
            className="back-button"
          >
            ← Volver
          </Button>
          
          <div className="order-header-card">
            <div className="order-header-top">
              <div className="order-info">
                <h1 className="order-title">
                  Orden #{id}
                </h1>
                <p className="order-date">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <span className={`status-badge ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            {/* Customer Information */}
            <div className="customer-section">
              <h3 className="customer-title">
                Información del Cliente
              </h3>
              <div className="customer-info">
                <p className="customer-name">
                  {order.user.firstname} {order.user.lastname}
                </p>
                <p className="customer-email">{order.user.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="details-card">
          <div className="details-header">
            <h2 className="details-title">
              Detalles de la Orden
            </h2>
          </div>
          
          <div className="table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.historicalOrderDetails.map((detail) => (
                  <tr key={detail.id}>
                    <td>
                      <div className="product-name">
                        {detail.product.name}
                      </div>
                    </td>
                    <td className="quantity-cell">
                      {detail.quantity}
                    </td>
                    <td className="price-cell">
                      ${detail.subtotal_price?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Total */}
          <div className="total-section">
            <div className="total-content">
              <div className="total-text">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

