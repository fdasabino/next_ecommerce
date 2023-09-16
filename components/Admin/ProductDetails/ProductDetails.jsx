import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import styles from "./ProductDetails.module.scss";

const ProductDetails = ({ product }) => {
  const getColorName = (color) => {
    const colorName = GetColorName(color);
    return colorName;
  };

  return (
    <div className={styles.product_details}>
      <div className={styles.sub_products}>
        {product.subProducts.map((sub, i) => {
          const { images, sizes } = sub;

          return (
            <div key={i} className={styles.sub_product}>
              <div className={styles.sub_images}>
                {images.map((image, i) => (
                  <Image
                    key={i}
                    src={image.url}
                    width={150}
                    height={150}
                    alt={`${getColorName(sub.color.color)}, ${product.name}`}
                  />
                ))}
              </div>
              <div className={styles.sub_info}>
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
                <small>
                  Sizes:
                  <div className={styles.sizes_wrapper}>
                    {sizes.map((size, i) => (
                      <span key={i}>{size.size}</span>
                    ))}
                  </div>
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
