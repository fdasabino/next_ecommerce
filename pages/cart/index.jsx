import Path from "@/components/Layout/Path/Path";
import styles from "@/styles/pages/CartPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();

  console.log(router);

  const path = [
    { id: 1, name: "Home" },
    { id: 2, name: "Cart" },
  ];
  return (
    <div className={styles.cart}>
      <Path path={path} />
    </div>
  );
};

export default CartPage;
