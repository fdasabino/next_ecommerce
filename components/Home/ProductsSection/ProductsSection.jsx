import { BsFillBagHeartFill } from "react-icons/bs";
import { Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.scss";

const ProductsSection = ({ products, category }) => {
    return (
        <section className={styles.products_section}>
            <div className={styles.products_section__header}>
                <h2>{category}</h2>
                <BsFillBagHeartFill />
            </div>
            <div className={styles.products_section__swiper_wrapper}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    grabCursor={true}
                    navigation={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    mousewheel={true}
                    breakpoints={{
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
                            spaceBetween: 20,
                        },
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Navigation, Pagination, Mousewheel]}
                    className={styles.flash_deals_swiper}>
                    {products
                        ?.sort((a, b) => a.category.name.localeCompare(b.category.name))
                        .map((product) => (
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
