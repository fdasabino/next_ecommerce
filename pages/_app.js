import RootLayout from "@/components/Layout/RootLayout/RootLayout";
import store from "@/redux-store/index";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

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
            </RootLayout>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default App;
