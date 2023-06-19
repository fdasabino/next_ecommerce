import Image from "next/image";
import Link from "next/link";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import Logo from "../../../../public/images/logo.png";
import styles from "./Main.module.scss";
const Main = () => {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <div className={styles.main__logo}>
          <Link href="/">
            <Image src={Logo} width={1000} height={1000} alt="logo" priority />
          </Link>
        </div>
        <div className={styles.search_bar}>
          <input type="text" placeholder="Search..." />
          <button>
            <BsSearch />
          </button>
        </div>
        <div className={styles.cart}>
          <Link href="/cart">
            <BsCart3 />
            <span>{cart && cart.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
