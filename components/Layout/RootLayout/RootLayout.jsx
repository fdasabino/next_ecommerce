import { useRouter } from "next/router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const RootLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname === "/" && <Header />}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
