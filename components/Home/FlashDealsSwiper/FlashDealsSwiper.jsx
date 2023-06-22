import { flashDealsArray } from "@/data/home_data";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import styles from "./FlashDealsSwiper.module.scss";

const FlashDealsSwiper = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        480: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      className={styles.flash_deals_swiper}
    >
      {flashDealsArray.map((item, i) => (
        <SwiperSlide key={i}>
          <Card item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FlashDealsSwiper;
