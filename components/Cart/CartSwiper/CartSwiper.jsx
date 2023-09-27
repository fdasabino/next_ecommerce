import ProductCard from "@/components/Home/ProductCard/ProductCard";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartSwiper.module.scss";

const CartSwiper = ({ similarProducts }) => {
  return (
    <Swiper
      slidesPerView={1}
      grabCursor={true}
      spaceBetween={30}
      breakpoints={{
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
      }}
      navigation={true}
      modules={[Navigation]}
      className={styles.cart__swiper}
    >
      {similarProducts.map((item, i) => (
        <SwiperSlide key={i}>
          <ProductCard product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CartSwiper;
