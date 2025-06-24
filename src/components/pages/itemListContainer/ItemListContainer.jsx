import { ProductCard } from "../../common/productCard/ProductCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../../common/pagination/Pagination";
import { useGraphQL } from "../../../graphql/useGraphQL";
import './itemListContainer.css'

// Query GraphQL
const GET_PRODUCTS = `
  query {
    products {
      id 
      name
      description
      price
    }
  }
`;

export const ItemListContainer = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('all');
    const { name } = useParams();
    
    // Hook de GraphQL para obtener productos
    const { data, loading, error, refetch } = useGraphQL(GET_PRODUCTS);
    
    // Extraer productos de la respuesta
    const products = data?.products || [];
    
    useEffect(() => {
        let productsFiltered = [...products];
        
        // Filtrar por categoría si existe el parámetro
        if (name && products.length > 0) {
            productsFiltered = products.filter(
                (elemento) => elemento.category === name
            );
        }
        
        // Aplicar ordenamiento por precio
        if (sortOrder === 'asc') {
            productsFiltered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            productsFiltered.sort((a, b) => b.price - a.price);
        }
        
        setFilteredItems(productsFiltered);
    }, [products, name, sortOrder]);
    
    const handlePriceFilterChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
    };
    
    // Manejar estados de carga y error
    if (loading) {
        return (
            <main>
                <div className="travel-grid-container">
                    <div className="loading-state">
                        <p>Cargando productos...</p>
                    </div>
                </div>
            </main>
        );
    }
    
    if (error) {
        return (
            <main>
                <div className="travel-grid-container">
                    <div className="error-state">
                        <p>Error al cargar productos: {error.message}</p>
                        <button onClick={refetch} className="retry-button">
                            Reintentar
                        </button>
                    </div>
                </div>
            </main>
        );
    }
    
    return(
        <main>
            <div className="travel-grid-container">
                <div className="header">
                    <div className="packages-count">
                        Paquetes: <span className="count-number">{filteredItems.length}</span>
                    </div>
                    <div className="price-filter">
                        <span className="filter-label">Precio</span>
                        <select 
                            className="filter-select"
                            value={sortOrder}
                            onChange={handlePriceFilterChange}
                        >
                            <option value="all">Todos</option>
                            <option value="asc">Menor precio</option>
                            <option value="desc">Mayor precio</option>
                        </select>
                    </div>
                </div>      
                <div className="travel-grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((elemento) => (
                            <ProductCard key={elemento.id} {...elemento}/>
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No se encontraron productos</p>
                        </div>
                    )}
                </div>      
                <Pagination currentPage={1} totalPages={12} />
            </div>
        </main>
    )
}