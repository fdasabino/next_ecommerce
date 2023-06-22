import Button from "@/components/Layout/Button/Button";
import { flashDealsArray } from "@/data/home_data";
import Image from "next/image";
import Link from "next/link";
import { BsArrowBarRight } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./FlashDealsSwiper.module.scss";

const FlashDealsSwiper = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      navigation={true}
      breakpoints={{
        480: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination]}
      className={styles.flash_deals_swiper}
    >
      {flashDealsArray.map((item, i) => (
        <SwiperSlide key={i}>
          <div className={styles.slide_wrapper}>
            <Image src={item.image} width={1000} height={1000} alt="placeholder" />
            <div className={styles.overlay}>
              <span>
                <ImPriceTag /> ${(item.price - item.discount).toFixed(0)}
              </span>
              <Link href={item.link}>
                <Button style="secondary">
                  View <BsArrowBarRight />
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FlashDealsSwiper;
