import Button from "@/components/Layout/Button/Button";
import Loader from "@/components/Layout/Loader/Loader";
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
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsChatLeftQuote } from "react-icons/bs";

const SingleProductPage = ({ product, productsWithSameCategory, productInWishlist }) => {
  const router = useRouter();
  const color = router.query.color;
  const slug = router.query.slug;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(product.reviews);
  const [activeImage, setActiveImage] = useState("");
  const [inWishlist, setInWishlist] = useState(
    productInWishlist !== false && productInWishlist.color === color ? true : false
  );

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

  useEffect(() => {
    if (product.slug === slug && reviews) {
      setReviews(product.reviews);
    }

    if (productInWishlist !== false && productInWishlist.color === color) {
      setInWishlist(true);
    } else {
      setInWishlist(false);
    }
  }, [reviews, product.reviews, product.slug, slug, color, productInWishlist]);

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
            <ProductInfo
              product={product}
              setActiveImage={setActiveImage}
              productInWishlist={productInWishlist}
              setInWishlist={setInWishlist}
              inWishlist={inWishlist}
            />
          </div>

          <SimilarProductsSwiper
            products={productsWithSameCategory}
            category={product?.category.name}
          />
          {loading ? (
            <Loader />
          ) : (
            <>
              <Reviews reviews={reviews} numReviews={product.numReviews} />
              <div className={styles.single_product_page__create_review}>
                {session ? (
                  <CreateReview product={product} setReviews={setReviews} setLoading={setLoading} />
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
                  <ReviewTable reviews={reviews} productName={product.name} />
                </div>
              )}
            </>
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
    await db.connectDB();
    const { query } = context;
    const { slug, color, size = 0 } = query;
    const session = await getSession(context);

    const user =
      session && session.user
        ? await User.findOne({ email: session.user.email }).lean().exec()
        : null;

    const products = await Product.find({}).lean().exec();
    const product = await Product.findOne({ slug })
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories", model: SubCategory })
      .populate({ path: "reviews.reviewBy", model: User })
      .lean()
      .exec();

    const productInWishlist =
      user && user.wishlist
        ? user.wishlist.find(
            (p) =>
              p.product.toString() === product._id.toString() &&
              p.color.toString() === color.toString()
          ) || false
        : false;

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

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const formattedPrices =
      prices.length === 1
        ? formatter.format(prices[0])
        : prices[0] === prices[prices.length - 1]
        ? formatter.format(prices[0])
        : `${formatter.format(prices[0])} to ${formatter.format(prices[prices.length - 1])}`;

    const newProduct = {
      ...product,
      images,
      sizes,
      discount,
      sku,
      colors,
      priceRange: formattedPrices,
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
        productInWishlist: productInWishlist
          ? JSON.parse(JSON.stringify(productInWishlist))
          : false,
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
