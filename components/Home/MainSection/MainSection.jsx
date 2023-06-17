import styles from "./MainSection.module.scss";

const MainSection = () => {
  return (
    <section className={styles.main_section}>
      <header className={styles.header}>header</header>
      <div className={styles.menu}>menu</div>
      <div className={styles.swiper}>swiper</div>
      <div className={styles.offers}>offers</div>
      <div className={styles.user}>user</div>
    </section>
  );
};

export default MainSection;
