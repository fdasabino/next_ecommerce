import FlashDeals from "@/components/Home/FlashDeals/FlashDeals";
import MainSection from "@/components/Home/MainSection/MainSection";
import ProductsSection from "@/components/Home/ProductsSection/ProductsSection";
import { setCountry } from "@/redux-store/countrySlice";
import styles from "@/styles/pages/Home.module.scss";
import db from "@/utils/db";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Products from "../models/Products";

const Home = ({ country, products }) => {
  const dispatch = useDispatch();
  console.log(products);

  // Set country in redux store
  const setCountryToStore = useCallback(() => {
    dispatch(setCountry(country));
  }, [country, dispatch]);

  // Set country in redux store on page load
  useEffect(() => {
    setCountryToStore();
  }, [setCountryToStore]);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <MainSection />
        <hr />
        <FlashDeals />
        <hr />
        <ProductsSection products={products} />
      </div>
    </div>
  );
};
export default Home;

export async function getServerSideProps() {
  db.connectDB();

  try {
    const products = await Products.find({}).sort({ createdAt: -1 }).lean();
    const serializedProducts = JSON.parse(JSON.stringify(products));
    const productsArray = serializedProducts;

    const { data } = await axios.get(
      `https://api.ipregistry.co/?key=${process.env.NEXT_APP_IP_REGISTRY_API}`
    );
    const country = data.location.country;

    console.log(productsArray);
    return {
      props: {
        products: productsArray,
        country,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
