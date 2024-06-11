import CountDown from "@/components/Layout/CountDown/CountDown";
import { MdFlashOn } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import FlashDealsSwiper from "../FlashDealsSwiper/FlashDealsSwiper";
import styles from "./FlashDeals.module.scss";

const FlashDeals = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const renderFlashDeals = () => {
    return (
      <section className={styles.flash_deals}>
        <div className={styles.flash_deals__header}>
          <h2>
            Flash Deals
            <MdFlashOn />
          </h2>
        </div>
        {!isMobile && (
          <div className={styles.flash_deals__countdown}>
            <CountDown date={new Date(2024, 11, 25)} />
          </div>
        )}
        <div className={styles.flash_deals__container}>
          <FlashDealsSwiper />
        </div>
      </section>
    );
  };

  return renderFlashDeals();
};

export default FlashDeals;
