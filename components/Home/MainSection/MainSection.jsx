import HomeHeader from "../HomeHeader/HomeHeader";
import MainSwiper from "../MainSwiper/MainSwiper";
import styles from "./MainSection.module.scss";

const MainSection = () => {
  return (
    <section className={styles.main_section}>
      <HomeHeader />
      <MainSwiper />
    </section>
  );
};

export default MainSection;
