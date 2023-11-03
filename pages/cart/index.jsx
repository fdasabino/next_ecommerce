import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartItem from "@/components/Cart/CartItem/CartItem";
import CartSwiper from "@/components/Cart/CartSwiper/CartSwiper";
import EmptyCart from "@/components/Cart/EmptyCart/EmptyCart";
import Panel from "@/components/Cart/Panel/Panel";
import Path from "@/components/Layout/Path/Path";
import Product from "@/models/Product";
import styles from "@/styles/pages/CartPage.module.scss";
import { addCartToDb } from "@/utils/addCartTodb";
import db from "@/utils/db";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { BsFillBagHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartPage = ({ groupedProducts }) => {
    const cart = useSelector((state) => state.cart);
    const { data: session } = useSession();
    const router = useRouter();

    // Create a set to store unique similar products
    const similarProductsSet = new Set();

    // compare the groupedProducts with the cartItems by category
    // if the category is the same, then add the product to the similarProductsSet
    for (const category in groupedProducts) {
        if (similarProductsSet.size > 20) break;
        cart.cartItems.forEach((item) => {
            if (item.category === category) {
                groupedProducts[category].forEach((product) => {
                    // Check if the product is not already in the cart
                    if (!cart.cartItems.some((cartItem) => cartItem._id === product._id)) {
                        similarProductsSet.add(product);
                    }
                });
            }
        });
    }

    // Convert the set back to an array if needed
    const similarProducts = [...similarProductsSet];

    const saveCartToDbHandler = async () => {
        if (session) {
            const response = await addCartToDb(cart.cartItems, session?.user._id);
            if (response.ok === true) {
                router.push("/checkout");
            }
        } else {
            signIn();
        }
    };

    const path = [
        { id: 1, name: "Home" },
        { id: 2, name: "Cart" },
    ];

    return (
        <>
            <Head>
                <title> ShoppyFlow | Cart</title>
            </Head>
            <div className={styles.cart}>
                {cart.cartItems.length === 0 ? (
                    <div className={styles.cart__empty}>
                        <EmptyCart />
                    </div>
                ) : (
                    <div className={styles.cart__container}>
                        <Path path={path} />
                        <CartHeader />
                        <hr />
                        {cart.cartItems.length > 0 && (
                            <div className={styles.mx_4}>
                                <div className={styles.cart__wrapper}>
                                    <div className={styles.left}>
                                        {cart &&
                                            cart.cartItems.length > 0 &&
                                            cart.cartItems.map((item) => (
                                                <CartItem key={item._uid} cartProducts={item} />
                                            ))}
                                    </div>
                                    <div className={styles.right}>
                                        <Panel saveCartToDbHandler={saveCartToDbHandler} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {similarProducts.length > 0 && (
                            <div className={styles.cart__swiper_container}>
                                <h3>
                                    You might also like <BsFillBagHeartFill />
                                </h3>
                                <CartSwiper similarProducts={similarProducts} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;

// server side code
export async function getServerSideProps(context) {
    await db.connectDB();
    try {
        // Retrieve all products from the database
        const products = await Product.find({}).lean().exec();

        // Create an empty object to store products grouped by category
        const groupedProducts = {};

        // Loop through each product and group them by category
        products.forEach((product) => {
            const { category } = product; // Assuming your product has a 'category' field
            if (!groupedProducts[category]) {
                groupedProducts[category] = [];
            }
            groupedProducts[category].push(product);
        });

        // Pass the grouped products to your front end
        return {
            props: {
                groupedProducts: JSON.parse(JSON.stringify(groupedProducts)),
            },
        };
    } catch (error) {
        console.log(error);
    } finally {
        await db.disconnectDB();
    }
}
