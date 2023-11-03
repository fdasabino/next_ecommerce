import ProductCard from "@/components/Home/ProductCard/ProductCard";
import React from "react";
import { Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartSwiper.module.scss";
const CartSwiper = ({ similarProducts }) => {
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
            spaceBetween: 50,
        },
    };

    return (
        <Swiper
            slidesPerView={1}
            grabCursor={true}
            pagination={{ dynamicBullets: true }}
            spaceBetween={30}
            breakpoints={breakpoints}
            navigation={true}
            mousewheel={true}
            modules={[Navigation, Pagination, Mousewheel]}
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
