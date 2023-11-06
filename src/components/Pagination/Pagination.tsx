import { useLocation } from 'react-router-dom';
import { PaginationProps } from '../types';
import styles from '../Pagination/Pagination.module.css';
const Pagination = ({ pagesQuantity, currentPage, setCurrentPage }: PaginationProps) => {
  const location = useLocation();
  const handlePrev = () => {
    console.log('handlePrev');
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    console.log('handleNext');
    if (currentPage !== pagesQuantity) setCurrentPage(currentPage + 1);
  };

  console.log(currentPage);
  return (
    <div className={styles.pagination}>
      <button
        className={styles.prev}
        type="button"
        disabled={currentPage === 1 || location.pathname !== '/'}
        onClick={handlePrev}
      >
        Prev
      </button>
      <span className={styles.current}>{currentPage}</span>
      <button
        className={styles.next}
        type="button"
        disabled={pagesQuantity === currentPage || location.pathname !== '/'}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
