import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/buttons/mainButton";
import { useGraphQL } from "../../../graphql/useGraphQL";
import "./authstyles.css";

const GET_USER_ORDERS = `
  query {
    me {
      orders {
        id
        status
        created_at
        orderDetails {
          subtotal_price
          quantity
          product {
            name
          }
        }
      }
    }
  }
`;

export const User = () => {
    const { user, logout } = useAuth();
    const { data, loading, error } = useGraphQL(GET_USER_ORDERS);
    
    const handleLogout = () => {
        logout();
    };

    // Process orders data from GraphQL response
    const processOrders = (ordersData) => {
        if (!ordersData?.me?.orders) return [];
        
        return ordersData.me.orders.map(order => {
            // Calculate total from order details
            const total = order.orderDetails.reduce((sum, detail) => {
                return sum + (parseFloat(detail.subtotal_price) || 0);
            }, 0);

            // Get total items
            const totalItems = order.orderDetails.reduce((sum, detail) => {
                return sum + (parseInt(detail.quantity) || 0);
            }, 0);

            // Get product names
            const products = order.orderDetails.map(detail => detail.product.name);

            // Format date
            const formattedDate = new Date(order.created_at).toLocaleDateString('es-ES');

            // Translate status to Spanish
            const statusTranslations = {
                'PENDING': 'Procesando',
                'PROCESSING': 'Procesando', 
                'SHIPPED': 'En camino',
                'DELIVERED': 'Entregado',
                'CANCELLED': 'Cancelado'
            };

            return {
                id: order.id,
                date: formattedDate,
                status: statusTranslations[order.status] || order.status,
                total: total,
                items: totalItems,
                products: products,
                rawStatus: order.status
            };
        });
    };

    const orders = processOrders(data);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'entregado':
                return 'status-delivered';
            case 'en camino':
                return 'status-shipping';
            case 'procesando':
                return 'status-processing';
            case 'cancelado':
                return 'status-cancelled';
            default:
                return 'status-default';
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="user-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando información del usuario...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="user-container">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2>Error al cargar los datos</h2>
                    <p>No se pudieron cargar tus órdenes. Por favor, intenta de nuevo.</p>
                    <Button onClick={() => window.location.reload()}>
                        Reintentar
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-container">
            <div className="user-header">
                <div className="user-info">
                    <div className="user-avatar">
                        <span className="avatar-initials">
                            {user.firstname?.charAt(0)}{user.lastname?.charAt(0)}
                        </span>
                    </div>
                    <div className="user-details">
                        <h1 className="user-name">{user.firstname + ' ' + user.lastname}</h1>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>
                <div className="user-actions">
                    <Button onClick={handleLogout} variant="secondary">
                        Cerrar Sesión
                    </Button>
                </div>
            </div>

            <div className="user-content">

                <div className="orders-section">
                    <div className="section-header">
                        <h2>Mis Órdenes</h2>
                        <p className="section-subtitle">Historial completo de tus compras</p>
                    </div>

                    <div className="orders-list">
                        {orders.length === 0 ? (
                            <div className="no-orders">
                                <div className="no-orders-icon">📋</div>
                                <h3>No tienes órdenes aún</h3>
                                <p>Cuando realices tu primera compra, aparecerá aquí.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <div className="order-id">
                                            <span className="order-number">#{order.id}</span>
                                            <span className="order-date">{order.date}</span>
                                        </div>
                                        <div className={`order-status ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="order-details">
                                        <div className="order-products">
                                            <h4>Productos ({order.items} items)</h4>
                                            <ul className="products-list">
                                                {order.products.map((product, index) => (
                                                    <li key={index}>{product}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="order-total">
                                            <span className="total-label">Total:</span>
                                            <span className="total-amount">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="order-actions">
                                        <Button variant="outline" size="small">
                                            Ver Detalles
                                        </Button>
                                        {order.status === "En camino" && (
                                            <Button variant="outline" size="small">
                                                Rastrear Pedido
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};