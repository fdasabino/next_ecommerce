import ProductCard from "@/components/Home/ProductCard/ProductCard";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SimilarProductsSwiper.module.scss";

const SimilarProductsSwiper = ({ products, category }) => {
  const breakpoints = {
    480: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };

  return (
    <div className={styles.similar_product_swiper}>
      <div className={styles.similar_product_swiper__title}>
        <h2>
          <AiOutlinePlus /> {category}
        </h2>
      </div>

      <Swiper
        slidesPerView={1}
        grabCursor
        breakpoints={breakpoints}
        navigation
        modules={[Navigation]}
        className={styles.similar_product_swiper__container}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProductsSwiper;
