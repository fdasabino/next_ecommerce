import { useRouter } from "next/router";
import Button from "../Button/Button";
import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div className={styles.overlay} />
      <div className={styles.left}>
        <p>Super Sale!!! Up to 50% off on selected products</p>
      </div>
      <div className={styles.right}>
        <Button onClick={() => router.push("/browse")} type="primary">
          Shop now!
        </Button>
      </div>
    </div>
  );
};

export default Header;
