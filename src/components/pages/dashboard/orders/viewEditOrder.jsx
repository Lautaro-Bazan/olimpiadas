import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from "graphql-request";
import { useGraphQL } from "../../../../graphql/useGraphQL";
import { useMutationGraphQL } from "../../../../graphql/useMutationGraphQL";
import { Button } from "../../../../components/common/buttons/mainButton";
import './OrderDetailsStyles.css'; 

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

const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      status
    }
  }
`;

const ARCHIVE_ORDER_MUTATION = gql`
  mutation ArchiveOrder($order_id: ID!, $new_status: OrderStatus!) {
    archiveOrder(order_id: $order_id, new_status: $new_status) {
      id
      status
    }
  }
`;


export const OrderDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { data, loading, error, refetch } = useGraphQL(HISTORICAL_ORDER_QUERY, { id: id });
  const { mutate } = useMutationGraphQL();
  
  const statusOptions = [
    { label: 'Pendiente', value: 'PENDING' },
    { label: 'Procesando', value: 'PROCESSING' },
    { label: 'Enviado', value: 'SHIPPED' },
    { label: 'Entregado', value: 'DELIVERED' },
    { label: 'Cancelado', value: 'CANCELLED' },
  ];
  
  useEffect(() => {
    if (data?.historicalOrder) {
      setSelectedStatus(data.historicalOrder.status);
    }
  }, [data]);
  
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
      'PENDING': 'status-pending',
      'PROCESSING': 'status-processing',
      'SHIPPED': 'status-shipped',
      'DELIVERED': 'status-delivered',
      'CANCELLED': 'status-cancelled',
      'pending': 'status-pending',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-default';
  };
  
  const getStatusLabel = (status) => {
    const statusLabels = {
      'PENDING': 'Pendiente',
      'PROCESSING': 'Procesando',
      'SHIPPED': 'Enviado',
      'DELIVERED': 'Entregado',
      'CANCELLED': 'Cancelado',
      'pending': 'Pendiente',
      'processing': 'Procesando',
      'shipped': 'Enviado',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return statusLabels[status] || status;
  };
  
  const calculateTotal = () => {
    return data.historicalOrder.historicalOrderDetails.reduce((total, detail) => {
      return total + (detail.subtotal_price || 0);
    }, 0);
  };
  
  const handleStatusUpdate = async () => {
    if (selectedStatus === data.historicalOrder.status) {
      setShowStatusModal(false);
      return;
    }
    
    setIsUpdating(true);
    try {
      // Si el estado seleccionado es DELIVERED o CANCELLED, archivamos la orden
      if (selectedStatus === 'DELIVERED' || selectedStatus === 'CANCELLED') {
        const archiveResult = await mutate(ARCHIVE_ORDER_MUTATION, { 
          order_id: id,
          new_status: selectedStatus
        });
        
        if (archiveResult.error) {
          throw new Error(archiveResult.error.message || 'Error al archivar la orden');
        }
        
        const statusText = selectedStatus === 'DELIVERED' ? 'entregada' : 'cancelada';
        alert(`La orden ha sido ${statusText} y archivada correctamente`);
        setShowStatusModal(false);
        // Redirigir al dashboard
        navigate('/dashboard');
        return;
      }
      
      // Para cualquier otro estado, actualizamos normalmente
      const updateResult = await mutate(UPDATE_ORDER_MUTATION, {
        id: id,
        input: {
          status: selectedStatus
        }
      });
      
      if (updateResult.error) {
        throw new Error(updateResult.error.message || 'Error al actualizar el estado');
      }
      
      alert('El estado de la orden ha sido actualizado correctamente');
      setShowStatusModal(false);
      refetch(); // Refrescar los datos
      
    } catch (error) {
      console.error('Error updating order status:', error);
      alert(`No se pudo actualizar el estado de la orden: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando orden...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-title">Error al cargar la orden</div>
          <p className="error-message">{error.message}</p>
          <Button onClick={handleBackClick}>
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
          <Button onClick={handleBackClick}>
            Volver
          </Button>
        </div>
      </div>
    );
  }
  
  const order = data.historicalOrder;
  
  return (
    <div className="order-details-container">
      <div className="order-content">
        {/* Header */}
        <div className="header-section">
          <Button 
            onClick={handleBackClick}
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
              <div className="status-container">
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                <button 
                  className="edit-status-btn"
                  onClick={() => setShowStatusModal(true)}
                  title="Editar estado"
                >
                  ✎
                </button>
              </div>
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
      
      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Cambiar Estado de la Orden</h3>
              <button 
                className="modal-close"
                onClick={() => setShowStatusModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <label className="select-label">Nuevo estado:</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="status-select"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {selectedStatus === 'DELIVERED' && (
                <div className="delivery-warning">
                  <p><strong>Nota:</strong> Al marcar como "Entregado", la orden será archivada automáticamente.</p>
                </div>
              )}
              {selectedStatus === 'CANCELLED' && (
                <div className="delivery-warning">
                  <p><strong>Nota:</strong> Al marcar como "Cancelado", la orden será archivada automáticamente.</p>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowStatusModal(false)}
              >
                Cancelar
              </button>
              
              <button 
                className="update-btn"
                onClick={handleStatusUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <div className="spinner-small"></div>
                    {selectedStatus === 'DELIVERED' ? 'Archivando...' : 'Actualizando...'}
                  </>
                ) : (
                  selectedStatus === 'DELIVERED' ? 'Entregar y Archivar' : 'Actualizar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};