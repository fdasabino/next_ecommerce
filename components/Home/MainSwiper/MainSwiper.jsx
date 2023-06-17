import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./MainSwiper.module.scss";

const MainSwiper = () => {
  return (
    <div className={styles.main_swiper}>
      <>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          grabCursor={true}
          modules={[Pagination]}
          className={styles.main_swiper__container}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default MainSwiper;
