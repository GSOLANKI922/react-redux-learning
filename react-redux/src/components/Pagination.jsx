import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];

    const windowSize = 2;
    let startPage = Math.max(2, currentPage - windowSize);
    let endPage = Math.min(totalPages - 1, currentPage + windowSize);

    pages.push(1);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ⬅ Prev
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`page-btn ${page === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ➡
      </button>
    </div>
  );
};

export default Pagination;
