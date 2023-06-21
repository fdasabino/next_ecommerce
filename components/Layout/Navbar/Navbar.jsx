import Main from "./Main/Main";
import Menu from "./Menu/Menu";
import styles from "./Navbar.module.scss";
import Top from "./Top/Top";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Top />
      <Menu />
      <Main />
    </div>
  );
};

export default Navbar;
