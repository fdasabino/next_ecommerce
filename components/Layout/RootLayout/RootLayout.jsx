import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
