import RootLayout from "@/components/Layout/RootLayout/RootLayout";
import store from "@/redux-store/index";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

const persistor = persistStore(store);

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <title>ShoppyFlow</title>
        <meta name="description" content="ShoppyFlow - The best online store..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <RootLayout>
              <Component {...pageProps} />
              <ToastContainer
                position="bottom-right"
                autoClose={10000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                draggable
                theme="light"
              />
            </RootLayout>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default App;
