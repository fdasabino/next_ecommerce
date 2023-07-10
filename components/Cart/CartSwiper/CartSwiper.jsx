import { women_swiper } from "@/data/home_data";
import Image from "next/image";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartSwiper.module.scss";

const CartSwiper = () => {
  return (
    <Swiper
      slidesPerView={2}
      grabCursor={true}
      spaceBetween={30}
      breakpoints={{
        380: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        900: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className={styles.cart__swiper}
    >
      {women_swiper.map((item, i) => (
        <SwiperSlide key={i}>
          <Image src={item.image} width={600} height={600} alt={item.name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CartSwiper;
