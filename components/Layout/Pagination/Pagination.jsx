import { GrNext, GrPrevious } from "react-icons/gr";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className={styles.pagination}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <GrPrevious />
            </button>
            <span>{currentPage}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <GrNext />
            </button>
        </div>
    );
};

export default Pagination;
