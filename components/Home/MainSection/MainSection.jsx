import HomeMenu from "../HomeMenu/HomeMenu";
import MainSwiper from "../MainSwiper/MainSwiper";
import Offers from "../Offers/Offers";
import styles from "./MainSection.module.scss";

const MainSection = () => {
  return (
    <section className={styles.main_section}>
      <header className={styles.header}>header</header>
      <MainSwiper />
      <Offers />
      <HomeMenu />
      <div className={styles.user}>user</div>
    </section>
  );
};

export default MainSection;
