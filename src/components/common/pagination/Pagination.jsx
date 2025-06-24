import './pagination.css';

export const Pagination = ({ currentPage, totalPages }) => (
  <div className="pagination">
    <button className="pagination-btn pagination-arrow">‹</button>
    {[1, 2, 3].map((page) => (
      <button
        key={page}
        className={`pagination-btn ${page === 1 ? 'active' : ''}`}
      >
        {page}
      </button>
    ))}
    <span className="pagination-dots">...</span>
    <button className="pagination-btn">12</button>
    <button className="pagination-btn pagination-arrow">›</button>
  </div>
);