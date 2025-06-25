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
    const [currentPage, setCurrentPage] = useState(1);
    const { name } = useParams();
   
    // Configuración de paginación
    const ITEMS_PER_PAGE = 10;
   
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
        // Resetear a la primera página cuando cambian los filtros
        setCurrentPage(1);
    }, [products, name, sortOrder]);
   
    // Calcular productos para la página actual
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(startIndex, endIndex);
   
    const handlePriceFilterChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
    };
   
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll hacia arriba al cambiar de página (opcional)
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        {filteredItems.length > ITEMS_PER_PAGE && (
                            <span className="page-info">
                                (Mostrando {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} de {filteredItems.length})
                            </span>
                        )}
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
                    {currentItems.length > 0 ? (
                        currentItems.map((elemento) => (
                            <ProductCard key={elemento.id} {...elemento}/>
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No se encontraron productos</p>
                        </div>
                    )}
                </div>      
                {totalPages > 1 && (
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </main>
    )
}