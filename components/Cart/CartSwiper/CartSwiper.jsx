import ProductCard from "@/components/Home/ProductCard/ProductCard";
import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartSwiper.module.scss";

const CartSwiper = ({ similarProducts }) => {
  const breakpoints = {
    480: {
      slidesPerView: 2,
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
  };

  return (
    <Swiper
      slidesPerView={1}
      grabCursor
      spaceBetween={30}
      breakpoints={breakpoints}
      navigation
      modules={[Navigation]}
      className={styles.cart__swiper}
    >
      {similarProducts.map((item) => (
        <SwiperSlide key={item._id}>
          <ProductCard product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CartSwiper;
