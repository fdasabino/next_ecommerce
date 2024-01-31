import Button from "@/components/Layout/Button/Button";
import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsEye, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
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

    const router = useRouter();
    const editProduct = () => {
        router.push(`/admin/dashboard/product/${product._id}`);
    };
    const viewProduct = (i) => {
        router.push(`/product/${product.slug}?color=${i}`);
    };

    return (
        <div className={styles.product_details}>
            <div className={styles.sub_products}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    className={styles.swiper_container}>
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
                                                alt={`${getColorName(sub.color.color)}, ${
                                                    product.name
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <div className={styles.sub_info}>
                                        <small>
                                            Stock:
                                            <span>{sizes[i].qty}</span>
                                        </small>
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
                                        <small>Available sizes:</small>
                                        <div className={styles.sizes_wrapper}>
                                            {sizes.map((size, k) => (
                                                <span key={k}>{size.size}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <Button onClick={editProduct}>
                                            <FiEdit />
                                        </Button>
                                        <Button
                                            style="tertiary"
                                            onClick={() => viewProduct(i)}>
                                            <BsEye />
                                        </Button>
                                        <Button style="danger">
                                            <BsTrash />
                                        </Button>
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
