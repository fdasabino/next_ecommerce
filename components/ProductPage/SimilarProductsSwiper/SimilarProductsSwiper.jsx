import { similar_products } from "@/data/home_data";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SimilarProductsSwiper.module.scss";

const SimilarProductsSwiper = () => {
  return (
    <div className={styles.similar_product_swiper}>
      <div className={styles.similar_product_swiper__title}>
        <h2>Similar Products</h2>
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        grabCursor={true}
        navigation={true}
        breakpoints={{
          480: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className={styles.similar_product_swiper__container}
      >
        {similar_products.map((product, i) => (
          <SwiperSlide key={i}>
            <Link href="/">
              <Image src={product} width={600} height={600} alt="placeholder" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProductsSwiper;
