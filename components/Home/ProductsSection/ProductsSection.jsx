import { BsFillBagHeartFill } from "react-icons/bs";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.scss";

const ProductsSection = ({ products }) => {
  return (
    <section className={styles.products_section}>
      <div className={styles.products_section__header}>
        <h2>Featured Products</h2>
        <BsFillBagHeartFill />
      </div>
      <div className={styles.products_section__swiper_wrapper}>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          grabCursor={true}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className={styles.flash_deals_swiper}
        >
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductsSection;
