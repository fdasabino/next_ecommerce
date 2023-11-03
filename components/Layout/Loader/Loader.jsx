import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <h2 className={styles.heading}>Loading...</h2>
            <div className={styles.loading}>
                <div className={styles.load} />
                <div className={styles.load} />
                <div className={styles.load} />
                <div className={styles.load} />
            </div>
        </div>
    );
};

export default Loader;
