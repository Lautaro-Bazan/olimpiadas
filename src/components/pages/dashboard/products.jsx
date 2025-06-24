import { gql } from 'graphql-request';
import { useGraphQL } from '../../../graphql/useGraphQL';
import { useMutationGraphQL } from "../../../graphql/useMutationGraphQL";
import { Button } from '../../../components/common/buttons/mainButton';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ProductsComponent = () => {
  const navigation = useNavigate();
  const [toggleLoadingId, setToggleLoadingId] = useState(null); // Para manejar loading por producto

  const GET_PRODUCTS = gql`
    query {
      products {
        id
        product_code
        name
        price
        scope
        capacity
        active
      }
    }
  `;

  const TOGGLE_PRODUCT_ENABLED = gql`
    mutation toggleProductEnabled($id: ID!) {
      toggleProductEnabled(id: $id)
    }
  `;

  const { data, loading, error, refetch } = useGraphQL(GET_PRODUCTS);
  const { mutate: toggleEnabled } = useMutationGraphQL();

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
  };

  const handleEditProduct = (id) => {
    navigation('/dashboard/editar-producto/' + id);
  };

  const handleToggleEnabled = async (productId) => {
    try {
      setToggleLoadingId(productId);
      const { error: mutationError } = await toggleEnabled(TOGGLE_PRODUCT_ENABLED, { id: productId });
      if (mutationError) throw mutationError;
      await refetch();
    } catch (error) {
      console.error('Error al cambiar estado del producto:', error);
      alert('Error al cambiar el estado del producto');
    } finally {
      setToggleLoadingId(null);
    }
  };

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
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product.product_code} className={!product.active ? 'disabled-row' : ''}>
                <td>#{product.product_code}</td>
                <td>{product.name}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.scope}</td>
                <td>{mapCapacity(product.capacity)}</td>
                <td>
                  <span className={`status ${product.active ? 'enabled' : 'disabled'}`}>
                    {product.active ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-action" 
                    onClick={() => handleEditProduct(product.id)}
                    disabled={!product.active}
                  >
                    Editar
                  </button>
                  <button 
                    className={`btn-action ${product.active ? 'danger' : 'success'}`}
                    onClick={() => handleToggleEnabled(product.id)}
                    disabled={toggleLoadingId === product.id}
                  >
                    {toggleLoadingId === product.id
                      ? 'Procesando...'
                      : (product.active ? 'Deshabilitar' : 'Habilitar')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
