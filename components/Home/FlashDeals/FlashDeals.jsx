import CountDown from "@/components/Layout/CountDown/CountDown";
import { MdFlashOn } from "react-icons/md";
import FlashDealsSwiper from "../FlashDealsSwiper/FlashDealsSwiper";
import styles from "./FlashDeals.module.scss";

const FlashDeals = () => {
  return (
    <section className={styles.flash_deals}>
      <div className={styles.flash_deals__header}>
        <h2>
          Flash Deals
          <MdFlashOn />
        </h2>
        <div className={styles.flash_deals__countdown}>
          <CountDown date={new Date(2023, 6, 23)} />
        </div>
      </div>
      <div className={styles.flash_deals__container}>
        <FlashDealsSwiper />
      </div>
    </section>
  );
};

export default FlashDeals;
