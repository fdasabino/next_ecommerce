import RootLayout from "@/components/Layout/RootLayout/RootLayout";
import store from "@/redux-store/index";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </PersistGate>
    </Provider>
  );
};

export default App;
