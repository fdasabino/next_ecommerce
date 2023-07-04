import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import styles from "./CartItem.module.scss";

const CartItem = ({ product }) => {
  console.log(product);

  const getColorName = (color) => {
    const colorName = GetColorName(color);
    return colorName;
  };

  return (
    <div className={styles.cart_item}>
      <div className={styles.image}>
        <Image src={product.images[0].url} width={400} height={400} alt={product.name} />
      </div>

      <div className={styles.details_1}>
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
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
      <hr />
      <div className={styles.details_2}>
        <small>${product.priceBeforeDiscount.toFixed(2)}</small>
        <p>
          ${(product.price + product.shipping).toFixed(2)}
          {product.shipping > 0 && <span style={{ color: "red" }}> *</span>}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
