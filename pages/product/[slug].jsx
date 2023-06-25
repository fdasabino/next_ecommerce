import Path from "@/components/Layout/Path/Path";
import ProductInfo from "@/components/ProductPage/ProductInfo/ProductInfo";
import ProductPageMainSwiper from "@/components/ProductPage/ProductPageMainSwiper/ProductPageMainSwiper";
import Category from "@/models/Category";
import Product from "@/models/Products";
import SubCategory from "@/models/SubCategory";
import styles from "@/styles/pages/SingleProductPage.module.scss";
import db from "@/utils/db";
import Head from "next/head";
import { useState } from "react";

const SingleProductPage = ({ product }) => {
  const [activeImage, setActiveImage] = useState("");
  console.log(product);

  const path = [
    { id: 1, name: "Home" },
    { id: 2, name: product?.category.name },
    { id: 3, name: "Subcategory 1" },
    {
      id: 4,
      name: product?.name.length > 30 ? `${product.name.substring(0, 30)}...` : product?.name,
    },
  ];

  return (
    <>
      <Head>
        <title>
          ShoppyFlow |{" "}
          {product?.name.length > 15 ? `${product?.name.substring(0, 15)}...` : product?.name}
        </title>
      </Head>
      <div className={styles.single_product_page}>
        <Path path={path} />
        <div className={styles.single_product_page__container}>
          <div className={styles.single_product_page__main}>
            <ProductPageMainSwiper images={product?.images} activeImage={activeImage} />
            <ProductInfo product={product} setActiveImage={setActiveImage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;

// server side
export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const { slug, color, size = 0 } = query;

    await db.connectDB();

    const product = await Product.findOne({ slug })
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories._id", model: SubCategory })
      .lean();
    const subProduct = product.subProducts[color];
    const prices = subProduct.sizes.map((size) => size.price).sort((a, b) => a - b);

    const newProduct = {
      ...product,
      images: subProduct.images,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct._id,
      colors: product.subProducts.map((subProduct) => subProduct.color),
      priceRange: prices.length > 1 ? `From: ${prices[0]}$ to: ${prices[prices.length - 1]}$` : "",
      priceBeforeDiscount: subProduct.sizes[size].price.toFixed(2),
      price: calculateDiscountedPrice(subProduct.sizes[size], subProduct.discount).toFixed(2),
      quantity: subProduct.sizes[size].qty,
    };

    return {
      props: { product: JSON.parse(JSON.stringify(newProduct)) }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: { product: null },
    };
  } finally {
    db.disconnectDB();
  }
}
function calculateDiscountedPrice(size, discount) {
  const basePrice = size.price;
  if (discount > 0) {
    const discountedPrice = Math.floor(basePrice * (1 - discount / 100));
    return discountedPrice;
  }
  return basePrice;
}
