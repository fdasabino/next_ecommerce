import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.cell} ${styles.d_0}`} />
      <div className={`${styles.cell} ${styles.d_1}`} />
      <div className={`${styles.cell} ${styles.d_2}`} />
      <div className={`${styles.cell} ${styles.d_1}`} />
      <div className={`${styles.cell} ${styles.d_2}`} />
      <div className={`${styles.cell} ${styles.d_2}`} />
      <div className={`${styles.cell} ${styles.d_3}`} />
      <div className={`${styles.cell} ${styles.d_3}`} />
      <div className={`${styles.cell} ${styles.d_4}`} />
    </div>
  );
};

export default Loader;
