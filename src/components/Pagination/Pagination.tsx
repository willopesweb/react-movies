import { Link } from 'react-router-dom';
import './Pagination.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl?: string;
  hideNumbers?: boolean;
  query?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  baseUrl = '',
  hideNumbers = false,
  query = ''
}: PaginationProps) => {

  const createPageLink = (page: number) => {
    let url = `${baseUrl}?page=${page}`;

    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }
    return url;
  };

  return (
    <nav className="c-pagination">
      {currentPage > 1 && (
        <Link className="c-pagination__link" to={createPageLink(currentPage - 1)}>&laquo; Anterior</Link>
      )}

      {!hideNumbers && [...Array(totalPages)].map((_, index) => (
        <Link
          key={index + 1}
          to={createPageLink(index + 1)}
          className={`c-pagination__link ${currentPage === index + 1 ? 'is-active' : ''}`}
        >
          {index + 1}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link className="c-pagination__link" to={createPageLink(currentPage + 1)}>Próxima &raquo;</Link>
      )}
    </nav>
  );
}

export default Pagination;
