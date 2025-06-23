import { ShoppingCart, Package, Clock, Building2, Menu, X } from 'lucide-react';
import { gql } from 'graphql-request';
import  { useGraphQL } from '../../../graphql/useGraphQL';

// Componente para Órdenes
export const OrdersComponent = () => {
  const GET_ORDERS = gql`
    query {
      orders {
        id
        status
        created_at
        orderDetails {
          subtotal_price
        }
        user {
          firstname
          lastname
        }
      }
    }
  `;

  const { data, loading, error } = useGraphQL(GET_ORDERS);

  if (loading) return <p className="component-container">Cargando...</p>;
  if (error) return <p className="component-container">Error al cargar órdenes</p>;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);

  const orders = data.orders.map(order => ({
    id: order.id,
    customer: `${order.user.firstname} ${order.user.lastname}`,
    total: order.orderDetails.reduce((sum, item) => sum + parseFloat(item.subtotal_price), 0),
    status: formateaEstado(order.status),
    date: new Date(order.created_at).toLocaleDateString('es-AR'),
  }));

  function formateaEstado(status) {
    switch (status) {
      case 'PROCESSING': return 'En proceso';
      case 'COMPLETED': return 'Completado';
      case 'PENDING': return 'Pendiente';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
    }
  }

  return (
    <div className="component-container">
      <h1 className="page-title">Órdenes</h1>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{Math.floor(order.total)}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="btn-action">Ver</button>
                  <button className="btn-action">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};