import { removeFromCart } from "@/redux-store/cartSlice";
import { Tooltip } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartItem.module.scss";

const CartItem = ({ product }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 900px)" });
  console.log(product);
  const dispatch = useDispatch();

  const getColorName = (color) => {
    const colorName = GetColorName(color);
    return colorName;
  };

  const handleRemoveItem = () => {
    console.log("remove item ==> " + product._uid);
    dispatch(removeFromCart({ id: product._uid }));
  };
  return (
    <div className={styles.cart_item}>
      <div className={styles.images}>
        <Swiper
          grabCursor={true}
          navigation={isLargeScreen ? false : true}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className={styles.swiper_container}
        >
          {product.images.length > 0 &&
            product.images.map((image) => (
              <SwiperSlide key={image.public_url}>
                <Image src={image.url} width={600} height={600} alt={product.name} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className={styles.details_1}>
        <hr />
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h3>{product.name}</h3>
            <div className={styles.divider} />
            <p>{product.brand}</p>
          </div>
          <Tooltip title="Remove item" placement="bottom">
            <small onClick={handleRemoveItem}>Remove</small>
          </Tooltip>
        </div>
        <hr />
        <small>
          Qty: <span>{product.addedQuantity}x</span>
        </small>
        <small>
          Size: <span>{product.size.size}</span>
        </small>
        <small>
          Color:{" "}
          <span>
            {getColorName(product.color.color)}{" "}
            <small style={{ backgroundColor: `${product.color.color}` }} />
          </span>
        </small>
        <small>
          Item no: <span>{product.size._id.substring(12, 24)}</span>
        </small>
        <p>
          {product.shipping <= 0 ? (
            <small>
              Shipping: <span>Free</span>
            </small>
          ) : (
            <small>
              Shipping: <span>${product.shipping}</span>
            </small>
          )}
        </p>
      </div>
      <div className={styles.details_2}>
        <hr />
        <div className={styles.wrapper}>
          <small>${product.priceBeforeDiscount.toFixed(2)}</small>
          <p>
            ${(product.price + product.shipping).toFixed(2)}
            {product.shipping > 0 && <span style={{ color: "red" }}> *</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
