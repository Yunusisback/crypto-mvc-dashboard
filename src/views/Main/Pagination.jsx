

const Pagination = ({ currentPage, totalPages, handlePrev, handleNext }) => (
  <div className="pagination-container">
    <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-btn">
      « Geri
    </button>
    <span className="page-number">
      Sayfa {currentPage} / {totalPages}
    </span>
    <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-btn">
      İleri »
    </button>
  </div>
);

export default Pagination;