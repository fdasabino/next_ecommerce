import FlashDeals from "@/components/Home/FlashDeals/FlashDeals";
import MainSection from "@/components/Home/MainSection/MainSection";
import { setCountry } from "@/redux-store/countrySlice";
import { setProducts } from "@/redux-store/productsSlice";
import styles from "@/styles/pages/Home.module.scss";
import db from "@/utils/db";
import axios from "axios";
import Head from "next/head";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Product from "../models/Products";

const HomePage = ({ country, products }) => {
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
    <>
      <Head>
        <title> ShoppyFlow | Home</title>
      </Head>
      <div className={styles.home}>
        <div className={styles.container}>
          <MainSection products={products} />
          <FlashDeals />
        </div>
      </div>
    </>
  );
};

export default HomePage;

export async function getServerSideProps() {
  await db.connectDB();

  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).lean().exec();
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
