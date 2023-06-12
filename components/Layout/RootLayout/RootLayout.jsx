import { useRouter } from "next/router";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const RootLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <header>
        {router.pathname === "/" && <Banner />}
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
