import Main from "./Main/Main";
import styles from "./Navbar.module.scss";
import Top from "./Top/Top";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Top />
      <Main />
    </div>
  );
};

export default Navbar;
