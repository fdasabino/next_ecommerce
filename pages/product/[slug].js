import Product from "@/models/Products";
import styles from "@/styles/pages/SingleProductPage.module.scss";
import db from "@/utils/db";

const SingleProductPage = ({ product }) => {
  console.log(product);
  return <div className={styles.single_product_page}>SingleProductPage</div>;
};

export default SingleProductPage;

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const { slug, color, size = 0 } = query;

    db.connectDB();

    const product = await Product.findOne({ slug }).lean().exec();
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
