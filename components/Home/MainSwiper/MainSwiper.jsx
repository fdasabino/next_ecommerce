import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./MainSwiper.module.scss";

const MainSwiper = () => {
  return (
    <div className={styles.main_swiper}>
      <>
        <Swiper
          navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className={styles.main_swiper__container}
        >
          {[...Array(10).keys()].map((_, i) => (
            <SwiperSlide key={i}>
              <Image
                src={`/images/main_swiper/${i + 1}.jpg`}
                width={1000}
                height={1000}
                alt="promotion_banner_testing_purposes_only"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default MainSwiper;
