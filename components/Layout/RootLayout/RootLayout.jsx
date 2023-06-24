import { useRouter } from "next/router";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const RootLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname === "/" && <Banner />}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
