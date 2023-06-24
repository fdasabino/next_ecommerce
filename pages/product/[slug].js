import Path from "@/components/Layout/Path/Path";
import Category from "@/models/Category";
import Product from "@/models/Products";
import SubCategory from "@/models/SubCategory";
import styles from "@/styles/pages/SingleProductPage.module.scss";
import db from "@/utils/db";
import Head from "next/head";
const SingleProductPage = ({ product }) => {
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
          {product?.name.length > 30 ? `${product?.name.substring(0, 30)}...` : product?.name}
        </title>
      </Head>
      <div className={styles.single_product_page}>
        <Path path={path} />
        <div className={styles.single_product_page__container}></div>
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

    db.connectDB();

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
      sku: subProduct.sku,
      colors: product.subProducts.map((subProduct) => subProduct.color),
      priceRange: prices.length > 1 ? `From: ${prices[0]}$ to: ${prices[prices.length - 1]}$` : "",
      priceBeforeDiscount: subProduct.sizes[size].price.toFixed(2),
      price: calculateDiscountedPrice(subProduct.sizes[size], subProduct.discount).toFixed(2),
      quantity: subProduct.sizes[size].qty,
    };

    if (!newProduct) {
      return {
        notFound: true,
      };
    }

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
    const discountedPrice = basePrice - basePrice / discount;
    return discountedPrice;
  }
  return basePrice;
}
