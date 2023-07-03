import Button from "@/components/Layout/Button/Button";
import Path from "@/components/Layout/Path/Path";
import CreateReview from "@/components/ProductPage/CreateReview/CreateReview";
import ProductInfo from "@/components/ProductPage/ProductInfo/ProductInfo";
import ProductPageMainSwiper from "@/components/ProductPage/ProductPageMainSwiper/ProductPageMainSwiper";
import ReviewTable from "@/components/ProductPage/ReviewTable/ReviewTable";
import Reviews from "@/components/ProductPage/Reviews/Reviews";
import SimilarProductsSwiper from "@/components/ProductPage/SimilarProductsSwiper/SimilarProductsSwiper";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import styles from "@/styles/pages/SingleProductPage.module.scss";
import db from "@/utils/db";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsChatLeftQuote } from "react-icons/bs";

const SingleProductPage = ({ product }) => {
  const { data: session } = useSession();

  const signinRedirect = () => {
    signIn();
  };

  const [activeImage, setActiveImage] = useState("");
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
            <div className={styles.vertical_line} />
            <ProductInfo product={product} setActiveImage={setActiveImage} />
          </div>

          <SimilarProductsSwiper />
          <Reviews reviews={product.reviews} numReviews={product.numReviews} />

          <div className={styles.single_product_page__create_review}>
            {session ? (
              <CreateReview product={product} />
            ) : (
              <div className={styles.not_signed_in}>
                {product.reviews.length === 0 && (
                  <h2>
                    Be the first to review this product <BsChatLeftQuote />
                  </h2>
                )}
                <Button onClick={signinRedirect} style="primary">
                  Sign in to write a review <AiOutlineArrowRight />
                </Button>
              </div>
            )}
          </div>
          {product.reviews.length > 0 && (
            <div className={styles.single_product_page__review_table}>
              <ReviewTable reviews={product.reviews} />
            </div>
          )}
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
      .populate({ path: "reviews.reviewBy", model: User })

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
      allSizes: product.subProducts
        .map((product) => {
          return product.sizes;
        })
        .flat()
        .sort((a, b) => a.size - b.size)
        .filter(
          (element, index, array) => array.findIndex((ele2) => ele2.size === element.size) === index
        ),
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
