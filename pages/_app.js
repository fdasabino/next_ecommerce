import Loader from "@/components/Layout/Loader/Loader";
import RootLayout from "@/components/Layout/RootLayout/RootLayout";
import store from "@/redux-store/index";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "@/styles/globals.scss";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

const persistor = persistStore(store);

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);
        return () => {
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", end);
            router.events.off("routeChangeError", end);
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>ShoppyFlow</title>
                <meta
                    name="description"
                    content="ShoppyFlow - The best online store..."
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <SessionProvider session={session}>
                <PersistGate
                    persistor={persistor}
                    loading={null}>
                    <Provider store={store}>
                        <RootLayout>
                            <PayPalScriptProvider>
                                {loading ? <Loader /> : <Component {...pageProps} />}
                                <ToastContainer
                                    position="top-left"
                                    autoClose={2000}
                                    newestOnTop={true}
                                    hideProgressBar={true}
                                    closeOnClick
                                    draggable
                                    theme="colored"
                                />
                            </PayPalScriptProvider>
                        </RootLayout>
                    </Provider>
                </PersistGate>
            </SessionProvider>
        </>
    );
};

export default App;
