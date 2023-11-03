import FlashDeals from "@/components/Home/FlashDeals/FlashDeals";
import MainSection from "@/components/Home/MainSection/MainSection";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import { setCategories } from "@/redux-store/categoriesSlice";
import { setCountry } from "@/redux-store/countrySlice";
import styles from "@/styles/pages/Home.module.scss";
import db from "@/utils/db";
import axios from "axios";
import Head from "next/head";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Product from "../models/Product";

const HomePage = ({ country, products, categories }) => {
    const dispatch = useDispatch();

    // Set categories in redux store
    const setCategoriesToStore = useCallback(() => {
        dispatch(setCategories(categories));
    }, [dispatch, categories]);

    // Set country in redux store
    const setCountryToStore = useCallback(() => {
        dispatch(setCountry(country));
    }, [country, dispatch]);

    // Set country in redux store on page load
    useEffect(() => {
        setCountryToStore();
        setCategoriesToStore();
    }, [setCountryToStore, setCategoriesToStore]);

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
        const products = await Product.find({})
            .sort({ createdAt: -1 })
            .populate({ path: "category", model: Category })
            .populate({ path: "subCategories", model: SubCategory })
            .lean()
            .exec();
        const serializedProducts = JSON.parse(JSON.stringify(products));
        const productsArray = serializedProducts;

        const categories = await Category.find({}).lean().exec();
        const serializedCategories = JSON.parse(JSON.stringify(categories));
        const categoriesArray = Object.values(serializedCategories);

        const { data } = await axios.get(
            `https://api.ipregistry.co/?key=${process.env.NEXT_APP_IP_REGISTRY_API}`
        );
        const country = data.location.country;

        return {
            props: {
                products: productsArray,
                categories: categoriesArray,
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
