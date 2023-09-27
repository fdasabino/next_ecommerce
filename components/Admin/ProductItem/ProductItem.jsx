import Button from "@/components/Layout/Button/Button";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { BsChevronCompactDown } from "react-icons/bs";
import ProductDetails from "../ProductDetails/ProductDetails";
import styles from "./ProductItem.module.scss";

const ProductItem = ({ product, openId, toggleDetailsById }) => {
  const isActive = openId === product._id;
  const { details } = product;

  return (
    <div className={styles.product}>
      <div className={styles.title}>
        <h3>{product.name.length > 25 ? `${product.name.substring(0, 25)}...` : product.name}</h3>
        <Button
          style={!isActive ? "primary" : "danger"}
          onClick={() => toggleDetailsById(product._id)}
        >
          {!isActive ? <BsChevronCompactDown /> : <AiOutlineClose />}
        </Button>
      </div>
      <div className={styles.info}>
        <small>
          Category:
          <span>#{product.category.name}</span>
        </small>
        <small>
          Sub-Categories:
          {product.subCategories.map((sub) => (
            <span key={sub._id}>{sub.name}</span>
          ))}
        </small>
        <small>
          Brand:
          <span>{product.brand}</span>
        </small>
        <small>
          Created On:{" "}
          <span>
            {new Date(product.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </small>
        {product.updatedAt && (
          <small>
            Updated On:
            <span>
              {new Date(product.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </small>
        )}
        <small>
          Number of Reviews:
          <span>
            {product.numReviews === 0
              ? "No Reviews yet"
              : product.numReviews === 1
              ? `${product.numReviews} Review`
              : product.numReviews > 1
              ? `${product.numReviews} Reviews`
              : ""}
          </span>
        </small>
        <small>
          Rating:
          <span>
            {product.rating} <AiFillStar />
          </span>
        </small>
        {isActive && (
          <>
            {details.map((detail, i) => {
              if (detail.name === "Color") return;
              return (
                <small key={i}>
                  {detail.name}:<span>{detail.value}</span>
                </small>
              );
            })}
          </>
        )}
      </div>
      {isActive && (
        <div className={styles.summary}>
          <summary>{`"${product.description}"`}</summary>
        </div>
      )}
      {isActive && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductItem;
