import Button from "@/components/Layout/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { BsArrowBarRight, BsLaptop, BsShopWindow, BsWallet2 } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./MainSwiper.module.scss";

const MainSwiper = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
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
          {[...Array(isMobile ? 1 : 5).keys()].map((_, i) => (
            <SwiperSlide key={i}>
              <div className={styles.left}>
                <Image
                  src={`/images/main_swiper/swiper${i + 1}.webp`}
                  width={1000}
                  height={1000}
                  alt="promotion_banner_testing_purposes_only"
                  priority
                />
              </div>
              <div className={styles.right}>
                <div className={styles.icons}>
                  <BsLaptop />
                  <BsWallet2 />
                  <BsArrowBarRight />
                  <BsShopWindow />
                </div>
                <h2>Find your style</h2>
                <small>Where do you want to start?</small>
                <div className={styles.ctas}>
                  <Link href="/">
                    <Button style="secondary">Women</Button>
                  </Link>
                  <Link href="/">
                    <Button style="secondary">Men</Button>
                  </Link>
                  <Link href="/">
                    <Button style="secondary">Kids</Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default MainSwiper;
