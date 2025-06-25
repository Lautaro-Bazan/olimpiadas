import './pagination.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Función para generar los números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Máximo número de páginas visibles

    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para páginas con puntos suspensivos
      if (currentPage <= 3) {
        // Mostrar primeras páginas
        pages.push(1, 2, 3, 4);
        if (totalPages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Mostrar últimas páginas
        pages.push(1);
        if (totalPages > 4) {
          pages.push('...');
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          if (i > 1) pages.push(i);
        }
      } else {
        // Mostrar páginas del medio
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Si no hay páginas suficientes para paginación, no mostrar nada
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      {/* Botón página anterior */}
      <button 
        className={`pagination-btn pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {/* Números de página */}
      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <span key={`dots-${index}`} className="pagination-dots">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      ))}

      {/* Botón página siguiente */}
      <button 
        className={`pagination-btn pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
};