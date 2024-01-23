import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Button from "../Button/Button";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className={styles.pagination}>
            <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                <FaArrowAltCircleLeft />
            </Button>
            <span>{currentPage}</span>
            <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <FaArrowAltCircleRight />
            </Button>
        </div>
    );
};

export default Pagination;
