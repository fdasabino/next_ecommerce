import Image from "next/image";
import { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import styles from "./ProductPageMainSwiper.module.scss";

const ProductPageMainSwiper = ({ images, activeImage }) => {
    const [active, setActive] = useState(0);

    return (
        <div className={styles.main_swiper}>
            <div className={styles.main_swiper__active}>
                <InnerImageZoom
                    fullscreenOnMobile
                    hasSpacer
                    hideHint
                    zoomPreload
                    zoomType="hover"
                    zoomScale={1.5}
                    key={active}
                    src={activeImage || images[active].url}
                    zoomSrc={activeImage || images[active].url}
                    className={styles.active_image}
                />
            </div>
            <div className={`${styles.main_swiper__list} ${activeImage && styles.hidden}`}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.main_swiper_list__item} ${
                            index === active && styles.active
                        }`}
                        onMouseOver={() => setActive(index)}>
                        <Image
                            src={image.url}
                            width={1000}
                            height={1000}
                            alt="product"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPageMainSwiper;
