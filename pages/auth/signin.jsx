import styles from "@/styles/SignIn.module.scss";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";

const SignIn = () => {
  return (
    <div className={styles.signin}>
      <div className={styles.signin__container}>
        <div className={styles.signin__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            Find the best prices and the best brands! <Link href="/">Explore our store</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
