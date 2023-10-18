import { removeFromCart, updateCart } from "@/redux-store/cartSlice";
import { calculateDiscountedPrice } from "@/utils/calculateDiscount";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CartItem.module.scss";

const CartItem = ({ cartProducts }) => {
  const [cartQuantity, setCartQuantity] = useState(cartProducts.addedQuantity);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 900px)" });
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id: cartProducts._uid }));
    toast.info(`"${cartProducts.name}" has been removed from the cart.`);
  };

  const increaseCartQuantity = () => {
    if (cartQuantity >= cartProducts.availableQuantity) {
      toast.warning(
        `The maximum quantity available for "${cartProducts.name}" is ${cartProducts.availableQuantity} items.`
      );
      return;
    }

    const newQuantity = cartQuantity + 1;
    setCartQuantity(newQuantity);
    dispatch(updateCart({ ...cartProducts, id: cartProducts._uid, addedQuantity: newQuantity }));
    toast.info(`Quantity updated for "${cartProducts.name}". New quantity: ${newQuantity}.`);
  };

  const decreaseCartQuantity = () => {
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      setCartQuantity(newQuantity);
      dispatch(updateCart({ ...cartProducts, id: cartProducts._uid, addedQuantity: newQuantity }));
      toast.info(`Quantity updated for "${cartProducts.name}". New quantity: ${newQuantity}.`);
    }
  };

  const disableIncreaseButton = () => {
    const cartItem = cart.cartItems.find((item) => item._uid === cartProducts._uid);
    return cartItem && cartItem.addedQuantity >= cart.availableQuantity;
  };

  const disableDecreaseButton = () => {
    const cartItem = cart.cartItems.find((item) => item._uid === cartProducts._uid);
    return cartItem && cartItem.addedQuantity <= 1;
  };

  const itemWithDiscount = cart.cartItems.filter(
    (item) => item.discount > 0 && item._uid === cartProducts._uid
  );

  return (
    <div className={styles.cart_item}>
      <div className={styles.details_1}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h3>{cartProducts.name}</h3>
            <div className={styles.divider} />
            <p>{cartProducts.brand}</p>
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
          Size: <span>{cartProducts.size.size}</span>
        </small>
        <small>
          Color:{" "}
          <span>
            <small style={{ backgroundColor: `${cartProducts.color.color}` }} />
          </span>
        </small>
        <small>
          Item no: <span>{cartProducts.size._id.substring(12, 24)}</span>
        </small>
        <p>
          {cartProducts.shipping <= 0 ? (
            <small>
              Shipping: <span>Free</span>
            </small>
          ) : (
            <small>
              Shipping: <span>${cartProducts.shipping}</span>
            </small>
          )}
        </p>
      </div>
      <hr />
      <div className={styles.images}>
        <Swiper
          grabCursor={true}
          mousewheel={true}
          pagination={{ dynamicBullets: true }}
          navigation={isLargeScreen ? false : true}
          breakpoints={{
            380: {
              slidesPerView: cartProducts.images.length > 2 ? 3 : 2,
              spaceBetween: 0,
            },
            480: {
              slidesPerView: cartProducts.images.length > 3 ? 4 : 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: cartProducts.images.length > 3 ? 4 : 3,
              spaceBetween: 0,
            },
            900: {
              slidesPerView: cartProducts.images.length > 4 ? 5 : 3,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation, Pagination, Mousewheel]}
          className={styles.swiper_container}
        >
          {cartProducts.images.length > 0 &&
            cartProducts.images.map((image, i) => (
              <SwiperSlide key={i}>
                <Image src={image.url} width={600} height={600} alt={cartProducts.name} />
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
            <small>
              {itemWithDiscount.find(
                (item) => item._uid === cartProducts._uid && item.discount > 0
              ) && `$${(cartProducts.priceBeforeDiscount * cartProducts.addedQuantity).toFixed(2)}`}
            </small>
            <p>
              $
              {cartProducts.discount > 0
                ? (
                    calculateDiscountedPrice(cartProducts.size, cartProducts.discount) *
                    cartProducts.addedQuantity
                  ).toFixed(2)
                : (cartProducts.priceBeforeDiscount * cartProducts.addedQuantity).toFixed(2)}
              {cartProducts.shipping > 0 && <span style={{ color: "red" }}> *</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
