import Image from "next/image";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ProductSwiper.module.scss";

const ProductSwiper = ({ images }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);

  const handleMouseEnter = () => {
    swiperRef.current.swiper.autoplay.start();
  };

  const handleMouseLeave = () => {
    swiperRef.current.swiper.autoplay.stop();
    swiperRef.current.swiper.slideTo(0);
  };

  return (
    <div
      className={styles.product_swiper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{
          delay: 500,
          stopOnLastSlide: false,
          speed: 500,
        }}
        modules={[Autoplay]}
        className={styles.product_swiper__wrapper}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.url}
              width={1000}
              height={1000}
              alt="product_image"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
