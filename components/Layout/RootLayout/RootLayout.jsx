import { useRouter } from "next/router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const RootLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <header>
        {router.pathname === "/" && <Header />}
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
