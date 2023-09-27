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
import { calculateDiscountedPrice } from "@/utils/calculateDiscount";
import db from "@/utils/db";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsChatLeftQuote } from "react-icons/bs";

const SingleProductPage = ({ product, productsWithSameCategory }) => {
  const [activeImage, setActiveImage] = useState("");
  const { data: session } = useSession();

  const signInRedirect = () => {
    signIn();
  };

  const path = [
    { id: 1, name: "Home" },
    { id: 2, name: product?.category.name },
    { id: 3, name: product?.subCategories[0].name },
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

          <SimilarProductsSwiper products={productsWithSameCategory} />
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
                <Button onClick={signInRedirect} style="primary">
                  Sign in to write a review <AiOutlineArrowRight />
                </Button>
              </div>
            )}
          </div>
          {product.reviews.length > 0 && (
            <div className={styles.single_product_page__review_table}>
              <ReviewTable reviews={product.reviews} productName={product.name} />
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

    const [products, product] = await Promise.all([
      Product.find({}).lean().exec(),
      Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories", model: SubCategory })
        .populate({ path: "reviews.reviewBy", model: User })
        .lean()
        .exec(),
    ]);

    const subProduct = product.subProducts[color];
    const { sizes, discount, _id: sku, images } = subProduct;

    const prices = sizes.map((size) => size.price).sort((a, b) => a - b);
    const colors = product.subProducts.map((subProduct) => subProduct.color);
    const allSizes = product.subProducts
      .map((product) => product.sizes)
      .flat()
      .sort((a, b) => a.size - b.size)
      .filter(
        (element, index, array) => array.findIndex((ele2) => ele2.size === element.size) === index
      );

    const newProduct = {
      ...product,
      images,
      sizes,
      discount,
      sku,
      colors,
      priceRange: prices.length > 1 ? `From: ${prices[0]}$ to: ${prices[prices.length - 1]}$` : "",
      priceBeforeDiscount: sizes[size].price.toFixed(2),
      price: calculateDiscountedPrice(sizes[size], discount),
      quantity: sizes[size].qty,
      allSizes,
    };

    const productsWithSameCategory = products.filter(
      (p) =>
        p.category._id.toString() === newProduct.category._id.toString() &&
        p._id.toString() !== product._id.toString()
    );

    return {
      props: {
        productsWithSameCategory: JSON.parse(JSON.stringify(productsWithSameCategory)),
        product: JSON.parse(JSON.stringify(newProduct)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { product: null },
    };
  } finally {
    await db.disconnectDB();
  }
}
