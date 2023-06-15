import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <div className={styles.loading_wrapper}>
        <h2>Loading</h2>
        <div className={styles.dots} />
      </div>
    </div>
  );
};

export default Loader;
