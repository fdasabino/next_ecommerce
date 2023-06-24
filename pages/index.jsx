import FlashDeals from "@/components/Home/FlashDeals/FlashDeals";
import MainSection from "@/components/Home/MainSection/MainSection";
import { setCountry } from "@/redux-store/countrySlice";
import { setProducts } from "@/redux-store/productsSlice";
import styles from "@/styles/pages/Home.module.scss";
import db from "@/utils/db";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Products from "../models/Products";

const Home = ({ country, products }) => {
  const dispatch = useDispatch();

  // Set country in redux store
  const setCountryToStore = useCallback(() => {
    dispatch(setCountry(country));
  }, [country, dispatch]);

  // Set products in redux store
  const setProductsToStore = useCallback(() => {
    dispatch(setProducts(products));
  }, [products, dispatch]);

  // Set country in redux store on page load
  useEffect(() => {
    setCountryToStore();
    setProductsToStore();
  }, [setCountryToStore, setProductsToStore]);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <MainSection products={products} />
        <FlashDeals />
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
  } finally {
    db.disconnectDB();
  }
}
