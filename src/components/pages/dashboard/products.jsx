import { gql } from 'graphql-request';
import  { useGraphQL } from '../../../graphql/useGraphQL';
import { Button } from '../../../components/common/buttons/mainButton';
import { useNavigate } from "react-router-dom";

export const ProductsComponent = () => {
  const navigation = useNavigate();

  const GET_PRODUCTS = gql`
    query {
      products {
        product_code
        name
        price
        scope
        capacity
      }
    }
  `;

  const { data, loading, error } = useGraphQL(GET_PRODUCTS);

  if (loading) return <p className="component-container">Cargando productos...</p>;
  if (error) return <p className="component-container">Error al cargar productos.</p>;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);

  const mapCapacity = (cap) => {
    if (cap === 1) return 'INDIVIDUAL';
    if (cap >= 2 && cap <= 5) return 'FAMILIAR';
    return 'GRUPAL';
  };

  const handleAddProduct = () => {
    navigation('/dashboard/agregar-producto');
  }

  return (
    <div className="component-container">
      <h1 className="page-title">Productos</h1>
      <div className="actions-bar">
        <Button onClick={handleAddProduct}>Agregar Producto</Button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Alcance</th>
              <th>Capacidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product.product_code}>
                <td>#{product.product_code}</td>
                <td>{product.name}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.scope}</td>
                <td>{mapCapacity(product.capacity)}</td>
                <td>
                  <button className="btn-action">Editar</button>
                  <button className="btn-action danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
