import RootLayout from "@/components/Layout/RootLayout/RootLayout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
