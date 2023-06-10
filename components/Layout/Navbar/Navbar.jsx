import styles from "./Navbar.module.scss";
import Top from "./Top/Top";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Top />
    </div>
  );
};

export default Navbar;
