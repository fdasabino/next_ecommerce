import { useRouter } from "next/router";
import Main from "./Main/Main";
import Menu from "./Menu/Menu";
import styles from "./Navbar.module.scss";
import Top from "./Top/Top";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className={styles.navbar}>
      <Top />
      <Menu />
      {!router.pathname.startsWith("/admin") && <Main />}
    </header>
  );
};

export default Navbar;
