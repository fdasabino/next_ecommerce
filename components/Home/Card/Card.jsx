import Button from "@/components/Layout/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { BsArrowBarRight } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import styles from "./Card.module.scss";

const Card = ({ item }) => {
  return (
    <div className={styles.card}>
      <Image src={item.image} width={1000} height={1000} alt="placeholder" />
      <div className={styles.overlay}>
        <span>
          <ImPriceTag /> ${(item.price - item.discount).toFixed(0)}
        </span>
        <Link href={item.link}>
          <Button style="secondary">
            View <BsArrowBarRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
