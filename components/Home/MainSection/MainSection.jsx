import HomeHeader from "../HomeHeader/HomeHeader";
import HomeMenu from "../HomeMenu/HomeMenu";
import MainSwiper from "../MainSwiper/MainSwiper";
import Offers from "../Offers/Offers";
import UserPanel from "../UserPanel/UserPanel";
import styles from "./MainSection.module.scss";

const MainSection = () => {
  return (
    <section className={styles.main_section}>
      <HomeHeader />
      <MainSwiper />
      <Offers />
      <HomeMenu />
      <UserPanel />
    </section>
  );
};

export default MainSection;
