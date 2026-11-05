


export default function Pagination({ currentPage, totalPages, onPageChange }) {

    return (
        <div className="pagination">
            <button className="pagination-button" aria-label="Previous"
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(currentPage - 1);
                    } else {
                        onPageChange(totalPages); // Wrap around to the last page if on the first page
                    }
                }}
            >
                <img src="/images/icons/arrow-left.svg" alt="Previous" />
            </button>
            <div className="pages">
                {
                    Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                            aria-label={`Page ${page}`}
                            value={page}
                            onClick={() => onPageChange(page)}
                        >
                        </button>
                    ))
                }
            </div>
            <button className="pagination-button" aria-label="Next"
                onClick={() => {
                    if (currentPage < totalPages) {
                        onPageChange(currentPage + 1);
                    } else {
                        onPageChange(1); // Wrap around to the first page if on the last page
                    }
                }}
            >
                <img src="/images/icons/arrow-right.svg" alt="Next" />
            </button>
        </div>
    )
}