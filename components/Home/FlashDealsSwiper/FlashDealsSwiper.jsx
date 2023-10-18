import { flashDealsArray } from "@/data/home_data";
import { Autoplay, Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import styles from "./FlashDealsSwiper.module.scss";

const FlashDealsSwiper = () => {
  const renderFlashDealsSwiper = () => {
    return (
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        grabCursor={true}
        navigation={true}
        mousewheel={true}
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
        modules={[Navigation, Autoplay, Mousewheel]}
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
  return renderFlashDealsSwiper();
};

export default FlashDealsSwiper;
