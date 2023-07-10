import { removeFromCart, updateCart } from "@/redux-store/cartSlice";
import { Tooltip } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbMinus, TbPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartItem.module.scss";

const CartItem = ({ product }) => {
  const [cartQuantity, setCartQuantity] = useState(product.addedQuantity);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 900px)" });
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const getColorName = (color) => {
    const colorName = GetColorName(color);
    return colorName;
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id: product._uid }));
    toast.info(`"${product.name}" has been removed from the cart.`);
  };

  const increaseCartQuantity = () => {
    if (cartQuantity >= product.availableQuantity) {
      toast.error(
        `The maximum quantity available for "${product.name}" is ${product.availableQuantity} items.`
      );
      return;
    }

    const newQuantity = cartQuantity + 1;
    setCartQuantity(newQuantity);
    dispatch(updateCart({ ...product, id: product._uid, addedQuantity: newQuantity }));
    toast.success(`Quantity updated for "${product.name}". New quantity: ${newQuantity}.`);
  };

  const decreaseCartQuantity = () => {
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      setCartQuantity(newQuantity);
      dispatch(updateCart({ ...product, id: product._uid, addedQuantity: newQuantity }));
      toast.success(`Quantity updated for "${product.name}". New quantity: ${newQuantity}.`);
    }
  };

  const disableIncreaseButton = () => {
    const cartItem = cart.cartItems.find((item) => item._uid === product._uid);
    return cartItem && cartItem.addedQuantity >= cart.availableQuantity;
  };

  const disableDecreaseButton = () => {
    const cartItem = cart.cartItems.find((item) => item._uid === product._uid);
    return cartItem && cartItem.addedQuantity <= 1;
  };

  return (
    <div className={styles.cart_item}>
      <div className={styles.details_1}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h3>{product.name}</h3>
            <div className={styles.divider} />
            <p>{product.brand}</p>
          </div>
        </div>
        <hr />
        <small>
          Qty:{" "}
          <span>
            <button disabled={disableDecreaseButton()} onClick={decreaseCartQuantity}>
              <TbMinus />
            </button>
            <span>{cartQuantity}x</span>
            <button disabled={disableIncreaseButton()} onClick={increaseCartQuantity}>
              <TbPlus />
            </button>
          </span>
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
      <hr />
      <div className={styles.images}>
        <Swiper
          grabCursor={true}
          navigation={isLargeScreen ? false : true}
          breakpoints={{
            380: {
              slidesPerView: product.images.length > 2 ? 3 : 2,
              spaceBetween: 0,
            },
            480: {
              slidesPerView: product.images.length > 3 ? 4 : 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: product.images.length > 3 ? 4 : 3,
              spaceBetween: 0,
            },
            900: {
              slidesPerView: product.images.length > 4 ? 5 : 3,
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
      <div className={styles.details_2}>
        <hr />
        <div className={styles.wrapper}>
          <div className={styles.remove}>
            <Tooltip title="Remove from cart" placement="bottom">
              <small onClick={handleRemoveItem}>Remove</small>
            </Tooltip>
          </div>
          <div className={styles.totals}>
            <small>${product.priceBeforeDiscount.toFixed(2)}</small>
            <p>
              ${product.price.toFixed(2)}
              {product.shipping > 0 && <span style={{ color: "red" }}> *</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
