import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import { Navigation } from "swiper";
import SwiperCore, { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import styles from "./ProductDetails.module.scss";

// Initialize SwiperCore with required modules
SwiperCore.use([Pagination, Navigation]);

const ProductDetails = ({ product }) => {
  const getColorName = (color) => {
    const colorName = GetColorName(color);
    return colorName;
  };

  return (
    <div className={styles.product_details}>
      <div className={styles.sub_products}>
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {product.subProducts.map((sub, i) => {
            const { images, sizes } = sub;

            return (
              <SwiperSlide key={i}>
                <div className={styles.sub_product}>
                  <div className={styles.sub_images}>
                    {images.map((image, j) => (
                      <Image
                        key={j}
                        src={image.url}
                        width={150}
                        height={150}
                        alt={`${getColorName(sub.color.color)}, ${product.name}`}
                      />
                    ))}
                  </div>
                  <div className={styles.sub_info}>
                    <small>
                      Color:
                      <span>{getColorName(sub.color.color)}</span>
                    </small>
                    <small>
                      Discount:
                      <span>{sub.discount}%</span>
                    </small>
                  </div>
                  <div className={styles.sub_sizes}>
                    <small>
                      Sizes:
                      <div className={styles.sizes_wrapper}>
                        {sizes.map((size, k) => (
                          <span key={k}>{size.size}</span>
                        ))}
                      </div>
                    </small>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetails;
