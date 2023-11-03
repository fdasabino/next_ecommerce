import ProductCard from "@/components/Home/ProductCard/ProductCard";
import Path from "@/components/Layout/Path/Path";
import Category from "@/models/Category";
import Product from "@/models/Product";
import styles from "@/styles/pages/CategoryPage.module.scss";
import db from "@/utils/db";
import Head from "next/head";
import Image from "next/image";
import React from "react";
const CategoryPage = ({ productsWithSameCategory, slug }) => {
    const path = [
        { id: 1, name: "Home" },
        { id: 2, name: slug, slug },
    ];
    return (
        <>
            <Head>
                <title>
                    ShoppyFlow | {slug?.length > 15 ? `${slug?.substring(0, 15)}...` : slug}
                </title>
            </Head>
            <div className={styles.category_page}>
                <div className={styles.category_page__container__header}>
                    <Path path={path} />
                </div>
                <div className={styles.category_page__container}>
                    <div className={styles.category_page__container__title}>
                        <h1>
                            {slug}
                            {productsWithSameCategory?.length > 0 &&
                                ` (${productsWithSameCategory?.length})`}
                        </h1>
                    </div>
                    {productsWithSameCategory.length ? (
                        <div className={styles.category_page__container__products}>
                            {productsWithSameCategory.map((product) => {
                                return <ProductCard key={product._id} product={product} />;
                            })}
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <Image
                                src="/images/empty_page.png"
                                width={300}
                                height={300}
                                alt="Empty"
                            />
                            <h2>
                                No products available... We are working on our inventory to fill
                                this page for you!
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoryPage;

export async function getServerSideProps(context) {
    try {
        await db.connectDB();

        // get slug from context
        const { slug } = context.query;
        const products = await Product.find()
            .populate({ path: "category", Model: Category })
            .lean()
            .exec();

        const productsWithSameCategory = products.filter(
            (product) => product.category.slug === slug
        );

        return {
            props: {
                productsWithSameCategory: JSON.parse(JSON.stringify(productsWithSameCategory)),
                slug,
            },
        };
    } catch (error) {
        return {
            props: { error: error.message },
        };
    } finally {
        await db.disconnectDB();
    }
}
