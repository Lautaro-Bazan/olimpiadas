import { useEffect, useState } from "react";
import { gql } from 'graphql-request';
import  { useGraphQL } from '../../../graphql/useGraphQL';
import { useNavigate } from "react-router-dom";

const GET_HISTORICAL_ORDERS = gql`
  query {
    historicalOrders {
      id
      status
      created_at
      user {
        firstname
        lastname
      }
      historicalOrderDetails {
        subtotal_price
      }
    }
  }
`;

export const OrderHistoryComponent = () => {
  const { data, loading, error } = useGraphQL(GET_HISTORICAL_ORDERS);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [dateFilter, setDateFilter] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    if (data?.historicalOrders) {
      const filtered = data.historicalOrders.filter((order) => {
        const matchStatus =
          statusFilter === "Todos" || order.status === statusFilter;
        const matchDate =
          !dateFilter ||
          order.created_at.startsWith(dateFilter); // formato YYYY-MM-DD
        return matchStatus && matchDate;
      });
      setFilteredOrders(filtered);
    }
  }, [data, statusFilter, dateFilter]);

   const handleViewDetails = (id) => {
    navigation('/dashboard/historial-orden/' + id);
  }

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>Error cargando historial.</p>;

  return (
    <div className="component-container">
      <h1 className="page-title">Historial de Órdenes</h1>

      <div className="filters-bar">
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Todos">Todos los estados</option>
          <option value="Completado">Completado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <input
          type="date"
          className="filter-date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

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
            {filteredOrders.map((order) => {
              const total = order.historicalOrderDetails.reduce(
                (acc, d) => acc + parseFloat(d.subtotal_price),
                0
              );

              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{`${order.user.firstname} ${order.user.lastname}`}</td>
                  <td>${Math.floor(total)}</td>
                  <td>
                    <span className={`status completado`}>{order.status}</span>
                  </td>
                  <td>{order.created_at.split(" ")[0]}</td>
                  <td>
                    <button className="btn-action" onClick={() => handleViewDetails(order.id)}>Ver Detalles</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
