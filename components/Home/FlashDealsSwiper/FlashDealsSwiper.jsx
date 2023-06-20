import Button from "@/components/Layout/Button/Button";
import { flashDealsArray } from "@/data/home_data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./FlashDealsSwiper.module.scss";

const FlashDealsSwiper = () => {
  const router = useRouter();
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
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
      className={styles.flash_deals_swiper}
    >
      {flashDealsArray.map((item, i) => (
        <SwiperSlide key={i}>
          {" "}
          <Link href={item.link}>
            <Image src={item.image} width={1000} height={1000} alt="placeholder" />
            <span>${(item.price - item.discount).toFixed(0)}</span>
          </Link>
          <Button onClick={() => router.push(item.link)} style="secondary">
            Check it out!
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FlashDealsSwiper;
